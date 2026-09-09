const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('framer.html', 'utf-8');
const appear = JSON.parse(fs.readFileSync(process.argv[3] || 'appear.json', 'utf-8'));

const sectionName = process.argv[2];
if (!sectionName) {
  console.error('usage: node extract-section.cjs "Section | X" [appear.json]');
  process.exit(1);
}

// blank out script/style interiors so div-counting isn't confused by JS/CSS text,
// while preserving string length/offsets so indices still map to `html`.
function blank(str, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, 'g');
  return str.replace(re, (whole, inner) => whole.replace(inner, ' '.repeat(inner.length)));
}
let cleaned = html;
cleaned = blank(cleaned, 'script');
cleaned = blank(cleaned, 'style');
cleaned = blank(cleaned, 'svg');

const marker = `data-framer-name="${sectionName}"`;
const markerIdx = cleaned.indexOf(marker);
if (markerIdx === -1) {
  console.error('marker not found:', sectionName);
  process.exit(1);
}

let tagStart = cleaned.lastIndexOf('<', markerIdx);
const tagNameMatch = cleaned.slice(tagStart + 1).match(/^[a-zA-Z0-9]+/);
const tagName = tagNameMatch[0];
const openTok = '<' + tagName;
const closeTok = '</' + tagName;
let pos = cleaned.indexOf('>', tagStart) + 1;
let depth = 1;
let cursor = pos;
let iterations = 0;
while (depth > 0) {
  iterations++;
  if (iterations > 2_000_000) { console.error('runaway loop'); break; }
  const nextOpen = cleaned.indexOf(openTok, cursor);
  const nextClose = cleaned.indexOf(closeTok, cursor);
  if (nextClose === -1) { console.error('no more closes, depth=', depth); break; }
  if (nextOpen !== -1 && nextOpen < nextClose) {
    depth++;
    cursor = nextOpen + openTok.length;
  } else {
    depth--;
    cursor = nextClose + closeTok.length;
  }
}
const sectionEnd = cursor;
const section = html.slice(tagStart, sectionEnd);

fs.mkdirSync('out', { recursive: true });
function sanitize(s) { return s.replace(/[^a-z0-9]+/gi, '_'); }
fs.writeFileSync(path.join('out', sanitize(sectionName) + '.html'), section);

const results = [];
const re = /data-framer-appear-id="([^"]+)"/g;
let m;
while ((m = re.exec(section))) {
  const id = m[1];
  const idx = m.index;
  const windowStr = section.slice(idx, idx + 600);
  const nameMatch = windowStr.match(/data-framer-name="([^"]+)"/);
  const classMatch = section.slice(Math.max(0, idx - 200), idx).match(/class="([^"]*)"[^<]*$/);
  const textRaw = windowStr.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
  const animData = appear[id];
  results.push({
    id,
    containerClass: classMatch ? classMatch[1] : null,
    nearbyName: nameMatch ? nameMatch[1] : null,
    textPreview: textRaw,
    anim: animData ? (animData.default || Object.values(animData).find(Boolean)) : null,
  });
}

fs.writeFileSync(
  path.join('out', sanitize(sectionName) + '.json'),
  JSON.stringify(results, null, 2)
);
console.log('section length:', section.length, 'appear-ids found:', results.length);
