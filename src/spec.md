# Specification

## Summary
**Goal:** Add a per-open “day reveal” animation for unlocked Valentine Week days, with an extra confetti burst and additional romantic 3D effects.

**Planned changes:**
- Trigger a one-time-per-screen-open reveal animation sequence when an unlocked day’s Day Detail screen is shown; do not run the sequence for locked days.
- Increase confetti intensity specifically during the reveal via a short, time-bounded extra-dense burst that does not block interactions or degrade performance.
- Add celebratory romantic 3D animated elements (e.g., flowers, gift boxes) as part of the reveal, layered so the day message remains readable and respecting prefers-reduced-motion.

**User-visible outcome:** When opening an unlocked day, the Day Detail view plays a celebratory reveal with a denser confetti burst and romantic 3D animations; locked days open without the reveal.
