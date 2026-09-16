I need you to FIX my existing `/whispers` page so it visually matches the whispers3.png screenshot/reference I

DO NOT redesign the page.
DO NOT create a new page.
DO NOT rewrite the project.
DO NOT change other routes/pages.

Work ONLY on the existing `/whispers` page and its related CSS/components.

## REFERENCE VS CURRENT

 whispers3.png SCREENSHOT = TARGET\

You must use the FIRST screenshot as the visual source of truth.

The goal is NOT "similar".
The goal is to match the reference's:

* layout
* spacing
* typography
* positioning
* sizing
* background visibility
* image size
* navbar positioning
* button positioning
* viewport composition

---

# 1. NAVBAR

The reference navbar is a black horizontal bar approximately 64px high.

Target:

* logo starts very close to the left edge, approximately 22px
* logo is orange
* WORK is positioned around the left/center area, approximately x=345px
* STUDIO follows it
* WHISPERS follows it
* CONTACT is close to the right edge, approximately 1575px
* navbar has no excessive horizontal container padding

My current implementation has the navbar content too centered/inset.

Fix ONLY the navbar positioning on `/whispers`.

Use responsive spacing rather than hardcoding the entire page to one viewport.

Target desktop structure:

```text
┌──────────────────────────────────────────────────────┐
│ create®        WORK    STUDIO    WHISPERS       CONTACT │
└──────────────────────────────────────────────────────┘
```

Keep the existing logo and text.

Do not change the navbar typography unnecessarily.

---

# 2. MAIN WHISPERS HERO/SECTION HEIGHT

The reference fills the viewport naturally.

Do NOT make the content unnecessarily tall.

The current implementation is producing an extra BOOK AN INTRO CALL button at the bottom of the screenshot.

Find why that duplicate/extra button is appearing.

There should NOT be an additional duplicated CTA at the bottom of this section.

If the CTA exists in the correct right-side testimonial area, keep that one.

Remove/fix only the duplicate caused by the current layout/component structure.

Do not delete the legitimate CTA.

---

# 3. BACKGROUND

The reference has the large light abstract 3D/background visual clearly visible behind the content.

My current implementation is too faint.

Increase the visibility of the EXISTING background visual to visually match the reference.

Do NOT replace it with another random image.

Do NOT create a new background.

Do NOT change the actual asset if the correct asset already exists.

Adjust only:

* opacity
* positioning
* sizing
* blending
* background layer placement

as necessary.

The reference background has:

* very light grey/white base
* visible soft white/grey organic 3D forms
* large curved lines/shapes
* subtle but clearly visible depth

The background must remain behind all content.

---

# 4. LEFT COLUMN POSITION

Reference:

The left column starts much closer to the left edge.

Approximately:

```text
left: 44px
```

rather than the current approximately 78px.

The large:

```text
9 years
```

should be positioned near the upper-left area.

Reference screenshot:

```text
9 years
Building lasting partnerships, scaling
brands, and shipping work that stands out.
```

The `9 years` heading is approximately 70px+ visually.

Keep the existing font family if it already matches.

Do NOT replace the text.

---

# 5. RIGHT HEADING

This is one of the biggest differences.

REFERENCE:

```text
Let us Inspire
your next
project
```

with:

* very large typography
* approximately 60–70px+ depending on the actual viewport/font
* heavy/bold weight
* tight line height
* tight letter spacing
* grey text
* `Inspire` in the existing orange accent color

The reference uses approximately THREE lines:

```text
Let us Inspire
your next
project
```

My current version is:

```text
Let us inspire your
next project
```

which is WRONG.

Make the right heading container wider/narrower as required so it wraps exactly like the reference.

Do NOT simply insert `<br>` tags unless necessary.

Prefer matching the reference through the actual container width and typography.

However, if responsive consistency requires explicit line breaks, desktop-only controlled line breaks are acceptable.

The heading should start approximately around:

```text
x = 850px
y = 150px
```

for the reference desktop viewport.

It should be substantially larger than my current heading.

---

# 6. RIGHT COLUMN WIDTH

The right column in my implementation is too compressed.

The reference right content occupies approximately the right half of the screen.

Use a two-column layout similar to:

```text
LEFT                    RIGHT
40%                      60%
```

but adjust it based on the actual screenshot.

The right heading, testimonial and CTA must align to the same right-side content column.

---

# 7. TESTIMONIAL IMAGE

The reference testimonial portrait is approximately:

```text
210px × 270px
```

visually.

My current image is too small.

Increase it to match the reference.

Keep:

* existing image
* rounded corners
* existing crop
* existing person

Do NOT replace the image.

The image should sit immediately to the left of the testimonial quote.

Target arrangement:

```text
┌───────────────┐   "We listen first, stay transparent,
│               │    and deliver what we promise.
│    portrait   │    Every project matters to us."
│               │
│               │    Tobias Neumann
└───────────────┘    CEO of Create®
```

---

# 8. TESTIMONIAL POSITION

Reference:

The testimonial block starts below the large heading.

The image and quote should be horizontally aligned.

Do not stack them vertically on desktop.

Current implementation is too high and too small.

Move the testimonial block down so it visually matches the first screenshot.

---

# 9. CTA

The reference has ONE orange:

```text
BOOK AN INTRO CALL ↗
```

button below the testimonial.

It is approximately:

```text
width: 245px
height: 56px
border-radius: 30px
```

Use the existing button component/styles if available.

Do NOT create another button.

Do NOT duplicate it at the bottom of the page.

The button should be positioned directly below the testimonial content in the right column.

---

# 10. LEFT STATISTICS

Reference:

The statistics are lower in the left column.

They look approximately like:

```text
+ 120+   projects delivered

+ 99%    on-time launches

+ 84%    average boost in engagement
```

The orange `+ 120+`, `+ 99%`, `+ 84%` should remain orange.

The descriptions should remain dark grey/black.

Reference left alignment is approximately:

```text
x = 44px
```

There is a thin horizontal divider above the statistics.

Keep the divider.

The current statistics are too far inward and positioned too high.

Move them to match the reference.

---

# 11. YEAR TEXT

Reference has the large outlined year text near the bottom-left:

```text
2016 — 2025
```

It is extremely large and very light/outlined.

Keep the existing year element if already present.

Position it near the bottom-left like the reference.

Do not make it solid dark text.

---

# 12. IMPORTANT VIEWPORT COMPOSITION

At desktop viewport size, the page should look approximately like this:

```text
┌─────────────────────────────────────────────────────────────┐
│ create®       WORK   STUDIO   WHISPERS              CONTACT │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  9 years                         Let us Inspire              │
│                                  your next                  │
│  Building lasting                project                    │
│  partnerships, scaling                                      │
│  brands, and shipping                                      │
│  work that stands out.          ┌──────┐  "We listen..."   │
│                                 │PHOTO │                    │
│                                 │      │  Tobias Neumann    │
│                                 └──────┘                    │
│                                                             │
│  ─────────────────────             BOOK AN INTRO CALL ↗     │
│                                                             │
│  + 120+ projects delivered                                  │
│  + 99%  on-time launches                                    │
│  + 84%  average boost in engagement                         │
│                                                             │
│  2016 — 2025                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The background visual should be visible behind this entire composition.

---

# 13. DO NOT COPY THE SCREENSHOT AS ONE IMAGE

This must remain a real React implementation.

Do NOT use the screenshot as a background.

Do NOT create a screenshot overlay.

Do NOT hardcode everything into one absolute-positioned canvas.

Use the existing components and responsive CSS.

---

# 14. RESPONSIVE BEHAVIOR

Desktop is the priority because the provided reference comparison is desktop.

After matching desktop, make sure tablet/mobile still work.

Do not break mobile just to match desktop.

Use media queries where necessary.

---

# 15. IMPORTANT — INSPECT BEFORE EDITING

Before making changes:

1. Find the component responsible for `/whispers`.
2. Find its CSS.
3. Find the existing background asset.
4. Find the existing testimonial image.
5. Find the existing CTA.
6. Find why the CTA appears twice.
7. Find the current desktop container/grid dimensions.

Then make the minimum changes necessary.

Do NOT create duplicate components.

Do NOT duplicate the background.

Do NOT duplicate the testimonial.

Do NOT duplicate the CTA.

---

# 16. VISUAL VERIFICATION

After changing the code:

Run the dev server.

Open:

`/whispers`

Take a screenshot at the same desktop viewport as my reference.

Compare your result against the FIRST screenshot.

Specifically verify:

* navbar positions
* 9 years position
* left margin
* right heading size
* heading line wrapping
* right column position
* testimonial image size
* testimonial position
* CTA position
* statistics position
* year position
* background visibility
* absence of duplicate CTA
* overall vertical composition

If it does not visually match, adjust the CSS and check again.

Do NOT stop after making one CSS change.

---

# 17. DO NOT TOUCH OTHER PAGES

Only modify files required for `/whispers`.

Do not change:

* homepage
* work
* studio
* contact
* global animations
* navbar globally unless the navbar CSS is specifically shared and the change is required to reproduce the reference

If navbar CSS is global, scope any positioning changes carefully so other pages do not break.

---

FINAL GOAL:

The SECOND screenshot must become visually like the FIRST screenshot.

The most important differences to correct are:

1. ONE correct background.
2. Correct viewport composition.
3. Much larger right heading.
4. Right heading wraps:
   `Let us Inspire`
   `your next`
   `project`
5. Larger testimonial image.
6. Correct left/right column positions.
7. Left content closer to screen edge.
8. Correct statistics position.
9. Correct year position.
10. Only ONE CTA.
11. Background visual more visible.
12. No unnecessary extra vertical scrolling/content in the hero viewport.

Make the implementation clean and responsive, but prioritize pixel-level visual matching to the FIRST screenshot.

