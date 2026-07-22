**Design QA status**

- Source visual truth: `C:\Users\felix\AppData\Local\Temp\codex-clipboard-6df765fa-0484-460a-b1f8-1f38f9af5276.png`.
- Implementation screenshot (hero, desktop): `C:\Users\felix\.codex\visualizations\2026\07\21\019f82fc-7c90-7c10-8862-d62969ea8d16\brick-hero-desktop.png`.
- Implementation screenshot (dialog, desktop): `C:\Users\felix\.codex\visualizations\2026\07\21\019f82fc-7c90-7c10-8862-d62969ea8d16\brick-demo-dialog-desktop.png`.
- Implementation screenshot (dialog, 320 px): `C:\Users\felix\.codex\visualizations\2026\07\21\019f82fc-7c90-7c10-8862-d62969ea8d16\brick-demo-dialog-mobile-320.png`.
- Viewports: 1440 × 900 and 320 × 700.
- State: hero at rest after entrance animation; demo dialog open with its email field focused.

**Full-view comparison evidence**

The annotated source and the desktop implementation were opened together in the same comparison input. The hero now follows the requested medium-weight Dazzed treatment, -68 display tracking, -50 support-copy tracking, and the supplied lime/navy/gray palette. The dialog matches the simplified reference: a restrained white bordered card, centered “Descubre brick.” lockup, short two-line description, rounded email field, and full-width lime action.

**Focused region comparison evidence**

No additional crop was required. Both the annotated hero/modal regions and the implementation were rendered at a scale where letter spacing, font weight, input/button geometry, border, card size, and copy were legible. Computed-style checks confirmed Dazzed 500 on the hero, `-3.264px` tracking at the rendered 48 px hero size (equivalent to `-0.068em`), `-0.8px` on the 16 px support copy (equivalent to `-0.05em`), and the intended navy/gray colors.

**Findings**

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: general landing copy inherits Dazzed Medium; hero tracking is -68, supporting copy is -50, and every textual `brick` lockup uses bold with -68 tracking.
- Spacing and layout rhythm: the dialog is 480 px wide on desktop and 288 px wide at 320 px, with 16 px mobile gutters and no horizontal overflow. Its heading, description, form gap, 48 px input, and 48 px action follow the supplied composition.
- Colors and visual tokens: accent `#E7F256`, ink `#04091A`, muted `#696765`, and border `#E4E4E4` are mapped into the shared theme.
- Image quality and asset fidelity: the requested changes introduce no new raster assets. Existing product images remain untouched and retain their source quality/crops; the dialog close control continues to use the installed icon library.
- Copy and content: the dialog now uses “Descubre brick.”, the supplied platform description, `ejemplo@gmail.com`, and “Explorar producto”.
- Hero clipping: the animated title masks include lower and side breathing room. The “g” descender is visible after animation while the reveal effect remains intact.

**Interaction and accessibility checks**

- The header demo trigger opens the dialog and focus moves to the work-email field.
- Escape closes the dialog.
- Native email validation rejects `correo-invalido` with `typeMismatch: true`; no request was sent.
- The dialog retains an accessible title, description, labeled email field, live feedback region, disabled sending state, and accessible close button.
- The 320 px view has a 320 px document width, a 288 px dialog, and no horizontal overflow.
- Browser console checked: no application runtime errors. The in-app browser reported one Vite development-websocket connection error after the final reload; it is limited to hot reload in this preview environment and does not affect rendering, navigation, or form behavior.
- Production build: passed.

**Comparison history**

- First post-build comparison found no actionable P0/P1/P2 issue. The simplified card proportions, typography, palette, title clipping fix, and responsive layout matched the annotated target closely enough to pass without a correction loop.

**Implementation Checklist**

- [x] Apply supplied typography weights and tracking.
- [x] Prevent the animated hero title from clipping the “g”.
- [x] Apply the supplied four-color palette to shared tokens.
- [x] Rebuild the demo dialog around the simplified editorial reference.
- [x] Verify desktop, 320 px mobile, keyboard close, validation, overflow, console, and production build.

**Follow-up Polish**

- P3: the accessible close icon is intentionally retained although the simplified static reference does not show one.
- P3: Vite hot reload may require a manual refresh in the in-app preview because its development websocket is unavailable; the production bundle is unaffected.

final result: passed
