## `src` Structure

This project now uses a small feature-first structure:

- `app`
  App bootstrap, providers, and app-level wiring.

- `shared/ui`
  Reusable presentational building blocks shared across features.

- `features/auth`
  Authentication-related UI such as navbar login actions.

- `features/home`
  Homepage-specific pages and sections like hero banners and deal blocks.

- `features/location`
  Delivery location picker and related UI.

- `features/navigation`
  Global navigation pieces such as the top header and navbar.

- `features/user`
  User action widgets like wishlist, compare, and cart shortcuts.

- `assets`
  Bundled source-controlled assets imported from code.

### Rule of thumb

- If a component is reused across multiple features, place it in `shared/ui`.
- If a component belongs to one domain or screen, place it inside that feature.
- Keep API/state providers under `app/providers` unless they are feature-specific.
