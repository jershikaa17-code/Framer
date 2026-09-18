HERO SECTION — EXACT ANIMATION RECREATION

IMPORTANT

Do NOT redesign the hero section.
Do NOT change the existing text, wording, typography, layout, colors, images, buttons, spacing, or content.

The hero section already exists and all text/content is already implemented.

Your task is ONLY to recreate the animation behavior visible in the reference video.

---

HERO INTRO ANIMATION

The hero should initially enter as a cinematic, layered reveal.

1. Initial State

Before the hero animation begins:

- Hero content is visually hidden.
- The main hero image is hidden/dark.
- Text elements should have opacity: 0.
- Hero UI elements should not suddenly pop into their final positions.
- Everything should feel like one coordinated entrance sequence.

Use animation states rather than immediately rendering everything at full opacity.

---

2. HERO IMAGE REVEAL

The large hero image is the primary visual element.

Animate it first/alongside the hero entrance.

Behavior:

- Start slightly zoomed in.
- Start with low opacity.
- Start slightly blurred/darkened.
- Gradually become sharp and fully visible.
- Scale down smoothly into its final scale.
- Do NOT use a simple instant fade.

Recommended animation:

opacity: 0 → 1
scale: approximately 1.08 → 1
blur: approximately 12px → 0px

Duration:

1200ms – 1600ms

Easing:

cubic-bezier(0.16, 1, 0.3, 1)

The image should feel like it is emerging from darkness and settling into position.

---

3. HERO TEXT REVEAL

The existing hero text must animate independently from the image.

Do NOT replace the existing text.

Each text block should enter with a combination of:

opacity
translateY
slight blur

Initial:

opacity: 0
transform: translateY(30px)
filter: blur(8px)

Final:

opacity: 1
transform: translateY(0)
filter: blur(0)

Use a smooth cinematic easing curve.

Recommended:

cubic-bezier(0.16, 1, 0.3, 1)

Duration:

800ms – 1100ms

---

4. STAGGER THE HERO ELEMENTS

Do NOT animate every hero element simultaneously.

Create a subtle stagger.

Suggested order:

1. Hero image/background
2. Small eyebrow/metadata text
3. Main heading
4. Supporting paragraph
5. CTA buttons
6. Small decorative/statistical elements

Suggested stagger:

80ms – 150ms between elements

The stagger should be subtle.

It should NOT look like each element is appearing independently.

The entire hero should feel like one coordinated animation.

---

5. MAIN HEADING

The main heading is the most important text.

Animate it slightly more dramatically than the supporting text.

Use:

opacity: 0
transform: translateY(45px)
filter: blur(10px)

to:

opacity: 1
transform: translateY(0)
filter: blur(0)

Duration:

1000ms – 1200ms

Use a slight stagger if the heading consists of multiple words/spans.

IMPORTANT:

Do not change the actual words.

Do not change the font.

Do not change font size.

Do not change font weight.

Only animate the existing heading.

---

6. CTA BUTTONS

The existing CTA buttons should enter after the main heading.

Animation:

opacity: 0
transform: translateY(20px) scale(0.96)

to:

opacity: 1
transform: translateY(0) scale(1)

Duration:

700ms – 900ms

Use the same smooth easing.

Do NOT redesign the buttons.

Do NOT change their labels.

---

7. HERO RE-ENTRY / TRANSITION

The reference contains a moment where the hero disappears into a dark transition and then the hero visual returns.

Recreate this as a cinematic transition rather than abruptly unmounting the hero.

Sequence:

CURRENT HERO
      ↓
fade/darken
      ↓
brief near-black state
      ↓
hero image begins appearing
      ↓
image sharpens + scales into place
      ↓
text elements progressively return
      ↓
hero reaches final state

The dark transition should be brief.

Do not leave the page completely black for a noticeable amount of time.

---

8. SCATTERED / DISPERSED TEXT EFFECT

If the existing hero implementation already supports individual characters/spans, use a subtle scattered-character entrance for the main heading.

Characters can begin slightly displaced:

random/small X offset
random/small Y offset
slight rotation
opacity: 0
blur

Then converge into their normal positions:

x → 0
y → 0
rotation → 0
opacity → 1
blur → 0

IMPORTANT:

The displacement must be subtle and controlled.

Do NOT make the letters fly wildly around the screen.

The final result should look premium and editorial, not like a generic "text explosion" animation.

Use staggered character timing around:

20ms – 45ms per character

with a small random variation.

---

9. NO GENERIC ANIMATIONS

Do NOT use:

- generic fade-in only
- bounce
- excessive spring animation
- spinning text
- random large movements
- exaggerated zoom
- typewriter effect
- flashy particle effects
- unnecessary 3D effects

The reference animation is minimal, smooth, cinematic and premium.

---

10. PERFORMANCE

Use GPU-friendly properties wherever possible:

transform
opacity
filter

Avoid animating:

width
height
top
left
margin
padding

unless absolutely necessary.

Use "will-change" only where appropriate.

The animation must remain smooth at 60fps.

---

11. RESPONSIVE BEHAVIOR

The animation must work on:

- desktop
- tablet
- mobile

Do NOT use desktop-only pixel positions for the animation.

The final positions must always come from the existing responsive layout.

Animation transforms should be relative to each element's existing position.

---

12. MOST IMPORTANT REQUIREMENT

Compare the implementation against the reference video.

The final result should feel like:

dark → image emerges → image sharpens/settles → text progressively appears → CTA appears → complete hero

NOT:

everything instantly fades in.

Keep the existing hero design exactly as it is.

Only improve/recreate the animation.

After implementing it, inspect the actual rendered page and adjust:

- timing
- stagger
- easing
- opacity
- blur
- scale
- translate distance

until the animation visually matches the reference as closely as possible.
