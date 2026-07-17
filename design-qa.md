**Design QA status**

- Source visual truth: `C:\Users\felix\AppData\Local\Temp\codex-clipboard-2b56fe2c-67ef-4546-a094-cdccdef0f332.png`.
- Implementation screenshot (desktop): `C:\Users\felix\.codex\visualizations\2026\07\17\019f718e-2f27-7b01-b1bf-32666d49f2e7\brick-demo-dialog-desktop.png`.
- Implementation screenshot (320 px): `C:\Users\felix\.codex\visualizations\2026\07\17\019f718e-2f27-7b01-b1bf-32666d49f2e7\brick-demo-dialog-mobile-320.png`.
- Combined comparison: `C:\Users\felix\.codex\visualizations\2026\07\17\019f718e-2f27-7b01-b1bf-32666d49f2e7\brick-demo-dialog-comparison.png`.
- Viewports: 1440 × 900 and 320 × 700.
- State: demo dialog open, email field focused, before submission.

**Full-view comparison evidence**

The combined image places the supplied reference and the rendered Brick dialog in one comparison canvas. Both use a centered, high-contrast modal over a dark overlay; a short heading and supporting paragraph; one large email field; and a full-width lime primary action. Brick intentionally uses the white card, lime accent rule, rounded 18 px shell, Dazzed typography, wordmark, muted heading treatment, and restrained shadow established by `simple-contact-only-email.js` and its shared email styles.

**Focused region comparison evidence**

No separate crop was needed because the source visual is itself a single dialog and the combined image renders the complete card at a scale where the heading, copy, input, button, padding, border, and overlay are clearly readable.

**Findings**

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: Dazzed is used consistently; hierarchy, weights, line heights, muted heading segment, and mobile wrapping remain legible at 320 px.
- Spacing and layout rhythm: desktop composition follows the reference hierarchy; the 320 px dialog is 288 px wide with 16 px side margins and no horizontal overflow.
- Colors and visual tokens: ink, muted gray, accent lime, soft input background, border, overlay, and white surface map to the Brick tokens and email treatment.
- Image quality and asset fidelity: the dialog requires no raster imagery; the close control uses the installed Lucide icon rather than a custom drawing.
- Copy and content: Spanish product copy, work-email prompt, consent note, loading/error feedback, and CTA all match the Brick conversion flow.

**Interaction and accessibility checks**

- All five demo-related triggers open the dialog.
- Focus moves to the email field when the dialog opens.
- Escape closes the dialog and returns it to a clean idle state.
- Native email validation rejects a malformed address (`typeMismatch: true`).
- The dialog has an accessible title and description, a labeled email field, live feedback, disabled sending state, and an accessible close button.
- Successful API responses lead to `https://app.brick.lat/explore-product`; the live email send was not executed during QA to avoid creating an external side effect.
- Browser console errors and warnings checked: none.
- Production build checked: passed.

**Comparison history**

- First mobile pass found the card corners were square below the `sm` breakpoint, which drifted from the 18 px email-card treatment (P2). The radius was moved to the base DialogContent style.
- Post-fix evidence: `brick-demo-dialog-mobile-320.png` shows an 18 px radius, 16 px side margins, a 288 × 550 px dialog, and a 320 px document width with no overflow.

**Implementation Checklist**

- [x] Match the reference hierarchy with Brick email styling.
- [x] Connect every demo trigger.
- [x] Preserve source metadata, honeypot, validation, and idempotency.
- [x] Redirect only after a successful registration response.
- [x] Verify desktop, 320 px mobile, keyboard close, validation, console, and build.

**Follow-up Polish**

- None required for handoff.

final result: passed
