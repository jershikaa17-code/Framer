Recreate the **Whispers page** of the reference website:

https://createstudio.framer.media/whispers

I am recreating the website locally in my existing React project. **Do not redesign it and do not create your own interpretation. Match the reference as closely as possible.**

## IMPORTANT

Before changing anything:

1. Inspect the entire existing project structure.
2. Inspect the current Whispers page implementation.
3. Reuse the existing project architecture, components, assets, fonts, routing and dependencies wherever possible.
4. Do NOT break the existing Home, Work, Studio or Contact pages.
5. Only modify files that are necessary for the Whispers page and shared components.
6. If an animation/library is already installed, use it instead of adding another dependency.
7. Use **Motion / Framer Motion-style scroll animations** where appropriate.
8. Do not replace real content with random placeholder content.
9. Do not add extra sections that are not present in the reference.

---

# 1. GLOBAL DESIGN SYSTEM

Viewport reference:

* Desktop viewport: approximately 1150px
* Usable width: approximately 1135px
* Main content width: 1095px
* Left/right gutter: 20px
* Grid gap: 20px

Colors:

* Body background: #F2F2F2
* Footer band: #FAFAFA
* Stats band: #FFFFFF
* Orange accent: #FF6041
* Grey: #5C6063
* Secondary grey: #797D82
* Near black: #141414
* White/off-white: #FAFAFA / #F2F2F2

Typography:

Use only these two font families:

1. Figtree

   * Editorial/display text
   * Tight negative letter spacing
2. Fragment Mono

   * Navigation
   * Buttons
   * Footer links
   * Micro labels
   * Uppercase UI text

Geometry:

* Main gutter: 20px
* Grid gap: 20px
* Card padding: 24px
* Card radius: 12px
* Portrait radius: 8px

Do NOT introduce rounded cards, gradients, excessive shadows, glassmorphism or unrelated colors.

---

# 2. FIXED NAVIGATION

Create a full-width fixed navigation bar.

Dimensions:

* Height: 60px
* Position: fixed
* top: 0
* width: 100%
* z-index: 100
* background: rgba(0,0,0,0.9)

The content should have approximately 20px horizontal gutters.

Navigation:

* Create® logo on the left
* WORK
* STUDIO
* WHISPERS
* CONTACT on the right

Typography:

* Fragment Mono
* 16px / 24px
* uppercase
* letter spacing approximately -0.8px

WHISPERS is the active page.

WORK has badge "5".
WHISPERS has badge "7".

Navigation links have the reference's **two-layer roll-up hover animation**:

* white text visible initially
* orange text positioned underneath
* on hover, animate the text vertically so the orange version rolls into view
* keep the animation quick and smooth
* do not use a generic opacity-only hover

Make sure the navigation remains fixed while scrolling.

---

# 3. WHISPERS HERO

The page begins below the fixed navigation.

Add a small orange horizontal dash at the left gutter.

Main heading:

"whispers"

Requirements:

* lowercase
* Figtree
* approximately 317.6px
* font-weight: 600
* line-height approximately 349px
* letter-spacing approximately -19px
* color: #797D82
* left aligned
* width approximately 1095px

The heading must visually stretch across almost the entire content width.

Do NOT make this responsive heading tiny on desktop.

Below the heading create an asymmetric two-column layout.

### Left text

Approximately 430px wide.

Text:

"Articles, notes on creativity, strategy and making things work."

Typography:

* Figtree
* 25.6px
* line-height: 30.7px
* letter-spacing: approximately -1.54px
* color: #797D82

### Right feature list

Position close to the right edge.

Approximately 242px wide.

Three rows:

* Studio projects and case studies
* Notes on design and process
* Ideas, insights, and inspiration

Use:

* orange "+" icon
* 16px text
* line-height: 22.4px
* color: #5C6063
* approximately 33px vertical pitch

Keep the large empty space between the left and right content. This asymmetry is important.

---

# 4. RULER DIVIDER

Below the hero create the horizontal ruler/tick divider.

It should contain many thin vertical hairlines across the width, resembling a measuring tape.

Do not simply use one normal border.

The ticks should be subtle and thin.

---

# 5. FEATURED ARTICLE

Create the featured article card.

Dimensions:

* approximately 1095px × 600px
* border-radius: 12px
* overflow: hidden
* position: sticky
* z-index: 1

Image:

Use the correct featured article image from the existing project assets.

Image behavior:

* width: 100%
* height: 100%
* object-fit: cover
* object-position: 50% 50%

Add a dark overlay/scrim over the image.

Article information:

Author:

Lucas Marino

Role:

Technical Director

Date:

Jul 30, 2025

Title:

"Rethinking Product Design with Intelligence"

Excerpt should sit near the bottom of the card.

Layout:

* author/role top-left
* date top-right
* title around the upper/middle-left
* excerpt anchored toward the bottom-left

Author block:

Use a thin vertical hairline rule approximately 24px from the left.

Text begins approximately 16px after that rule.

Title:

* Figtree
* 32px
* line-height: 38.4px
* letter-spacing: -1.6px
* white
* width approximately 350px

Excerpt:

* 19.2px
* line-height: 23px
* font-weight: 500
* white
* width approximately 400px

Date:

* approximately 14px
* right aligned

---

# 6. FEATURED CARD CURSOR INTERACTION

This interaction is VERY IMPORTANT.

On desktop, when the cursor moves inside the featured article card:

Create an approximately 196px orange circular disc that follows the cursor.

Inside the circle:

"READ ARTICLE"

and a white arrow →

Requirements:

* circle follows mouse position
* smooth interpolation
* do not instantly teleport
* constrain movement to the card
* orange #FF6041
* text in Fragment Mono
* uppercase
* white
* arrow visible

The circle should appear/activate when hovering the card and disappear when leaving it.

Do NOT use a simple CSS :hover circle fixed in the center.

---

# 7. SEARCH / INTRO ROW

After the featured card, create the row containing:

Left:

"From small sparks to big ideas."

Add a small orange tag icon after the text.

Typography:

* Figtree
* 32px
* line-height: 38.4px
* letter-spacing: -1.6px
* #797D82

Right:

Search field.

Use:

Orange magnifier icon

Placeholder:

"Search articles"

Typography:

* 25.6px
* font-weight: 500
* #5C6063

The search input should have only a thin bottom border.

No boxed input.

The search area should extend toward the right gutter.

---

# 8. ARTICLE GRID

Create a 2-column grid.

Desktop:

* left card starts around x=20
* right card starts around x=578
* card width approximately 538px
* card height approximately 500px
* gap: 20px
* row gap: 20px

There are exactly 6 article cards.

Article order:

1.

Author: Mark Miller
Role: Creative Lead
Date: Jul 20, 2025
Title: Architecture in the Digital Age

2.

Author: Jordan Ellis
Role: UX Strategist
Date: Oct 8, 2025
Title: Designing Trust: Why Digital Brands Win with Simplicity

3.

Author: Edward Bright
Role: Marketing Lead
Date: Jul 25, 2025
Title: Digital Identities Across Cultures

4.

Author: Jordan Ellis
Role: UX Strategist
Date: Dec 7, 2025
Title: How Automotive Brands Win Online

5.

Author: Matthew Parker
Role: Head of Product
Date: Jul 15, 2025
Title: The Future of E-Mobility Marketing from Lindholm

6.

Author: Samuel Laronde
Role: Marketing Lead
Date: Oct 7, 2025
Title: Why Hospitality Brands Need Digital Experiences That Feel Like Destinations

IMPORTANT:

Do NOT sort the articles by date.

Preserve this exact order.

---

# 9. ARTICLE CARD DESIGN

Every article card:

* width: 538px
* height: 500px
* border-radius: 12px
* overflow: hidden
* background image
* dark overlay
* padding: 24px

Image:

* object-fit: cover
* object-position: center center

Do not manually reposition the images unless necessary to match the reference.

Card content:

Top-left:

vertical hairline rule at approximately 24px.

Author/role approximately 40px to the right of the rule.

Top-right:

Date.

Title:

* Figtree
* 32px
* line-height: 38.4px
* letter-spacing: -1.6px
* white
* positioned approximately 100px from the top

Excerpt:

* 16px
* white
* near the bottom
* approximately 490px maximum width

For the long titles, preserve the natural wrapping shown in the reference.

---

# 10. STICKY STACKING EFFECT

This is one of the most important animations on the page.

The featured card should behave like a sticky card.

As the user scrolls:

* featured card pins
* article cards move upward
* article cards visually stack over the featured card
* grid cards have a higher z-index than the featured card
* the stacking should feel like the original Framer page

Use:

* position: sticky
* appropriate top offset
* z-index layering
* correct spacing

Do NOT replace this with a generic fade-in scroll animation.

The physical overlap/stacking effect must be visible.

---

# 11. STATS + CTA BAND

Create the white section after the article grid.

Background:

#FFFFFF

Add a very-low-contrast white 3D dandelion/sphere-cluster visual across the section if the required asset exists.

Left side:

Heading:

"9 years"

Typography:

* 43.2px
* weight 500
* grey

Description:

"Building lasting partnerships, scaling brands, and shipping work that stands out."

Three stats:

* 120+ projects delivered
* 99% on-time launches
* 84% average boost in engagement

Use orange + chips.

Each row approximately 41px apart.

Then add the ghost watermark:

"2016 — 2025"

* approximately 61px
* bold
* white on white

It should barely be visible.

Right side:

Heading:

"Let us inspire your next project"

Use:

* 48px
* line-height 52.8px
* weight 600
* letter-spacing -2.4px
* grey

Make "inspire" orange.

Below it create the testimonial layout.

Portrait:

* approximately 107 × 139px
* border-radius: 8px
* object-fit: cover

Text beside portrait:

Italic quote.

Then:

Tobias Neumann

CEO of Create®

Button:

"BOOK AN INTRO CALL →"

Button:

* orange
* pill
* approximately 220 × 46px
* Fragment Mono
* 16px
* uppercase
* white

---

# 12. NEWSLETTER FOOTER

Create the newsletter/footer section.

Background:

#FAFAFA

Use a 7-column-style layout.

Left block:

Heading:

"Keep you in the loop."

48px / 52.8px
Figtree
weight 600
grey

Description:

"Get the latest news, insights directly to your inbox. *"

Email input:

* approximately 469px × 52px
* underline only
* no surrounding box
* placeholder: "Enter Your Email"
* approximately 18px
* weight 500

Small floating label:

"ENTER YOUR EMAIL"

Place it above the input.

Submit button:

"JOIN OUR NEWSLETTER →"

* approximately 469px × 56px
* pale salmon/disabled appearance
* Fragment Mono
* 16px
* uppercase
* white

Implement the reference's character-scramble text animation on hover/loading if practical.

Below:

"By submitting, you agree to our Terms & Service."

Then:

"* No spam, just awesome updates."

---

# 13. FOOTER NAVIGATION

Create two columns.

### NAVIGATE

HOME
WORK
STUDIO
WHISPERS
CONTACT

### LINKS

TERMS OF SERVICE
PRIVACY POLICY
DISCLAIMER
404
MORE TEMPLATES

Labels:

* Fragment Mono
* uppercase
* approximately 13px

Links:

* Fragment Mono
* 16px
* #141414

Add the short horizontal rule below each section heading.

Social row:

"Follow us on socials"

Then:

X · Li · IG · FB · WA

Orange.

Align the social row toward the right side as in the reference.

---

# 14. FOOTER BOTTOM

Create the final footer area.

Left:

Hairline rule.

Text:

"Digital experiences that connect, scale and perform."

Then large:

"Create\Studio"

Requirements:

* approximately 65px
* weight 700
* "Create" orange
* "\Studio" grey

Then small avatar.

Next to it:

"A creative agency for design, strategy, marketing, and scalable premium websites."

Then:

"© 2026 Create Studio — All work, all rights."

Badges:

"⚑ Framer template"

"designed by tamas"

Right:

OFFLINE

Create Studio LLC.
8 Sunset Blvd, Office 5
Los Angeles, CA 90026

ONLINE

[hello@create.com](mailto:hello@create.com)

PHONE

(310) 555-0165

Phone should be visually large:

* 48px
* weight 600

Bottom-right:

Large orange ↑ back-to-top arrow.

Clicking it should smoothly scroll to the top.

---

# 15. RESPONSIVE BEHAVIOR

Desktop is the primary target.

Also implement responsive behavior for:

* tablet
* mobile

On mobile:

* navigation should adapt without overflowing
* hero typography should scale appropriately
* article grid becomes one column
* cards become full width
* footer columns stack
* search becomes full width
* cursor-follow interaction should be disabled on touch devices
* sticky stacking should remain visually sensible

Do not destroy the desktop proportions just to make mobile work.

---

# 16. ANIMATION RULES

Animations should feel like the original Framer site.

Use Motion where appropriate.

Implement:

1. Navigation text roll-up hover
2. Featured card cursor-follow orange disc
3. Smooth sticky stacking
4. Back-to-top smooth scrolling
5. Newsletter character scramble
6. Subtle section entrance animations only where they naturally exist

Avoid:

* random floating animations
* excessive parallax
* random image zoom
* excessive rotation
* bouncing UI
* generic fade-everything animations
* animations not present in the reference

The page should feel premium, editorial and intentional.

---

# 17. VERY IMPORTANT VISUAL ACCURACY

After implementation:

1. Run the development server.
2. Open the Whispers page.
3. Compare the page visually against:

https://createstudio.framer.media/whispers

Check specifically:

* navigation height
* hero heading size
* hero spacing
* asymmetric layout
* ruler divider
* featured card height
* featured image crop
* card stacking
* article card dimensions
* 20px gaps
* typography
* letter spacing
* footer positioning
* orange accent usage
* cursor-follow circle
* scroll behavior

Do not stop after making the page functional.

Fix visual mismatches iteratively.

---

# 18. DO NOT CHANGE THESE THINGS

Do NOT:

* redesign the page
* change the color palette
* use green/purple/blue accents
* add unnecessary cards
* add unnecessary shadows
* add gradients
* change article order
* change article titles
* change the footer structure
* remove the sticky stacking effect
* replace the cursor-follow interaction with a simple hover
* create unrelated animations
* break other existing pages
* install unnecessary packages

The goal is:

**PIXEL-ACCURATE RECREATION OF THE CREATE® WHISPERS PAGE.**

Start by inspecting the existing code and assets, then implement the page, run it, compare it against the reference, and correct the mismatches.
