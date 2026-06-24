# Image drop-in guide

Drop real photos here and they appear automatically — no renaming, no code changes.
Until you do, the site shows designed earthy placeholder artwork.

```
public/images/
  hero/                         → homepage hero carousel + About gallery (any filenames)
  pages/
    fleet.jpg                   → /fleet page banner
    pricing.jpg                 → /pricing page banner
    about.jpg                   → /about page banner + intro photo
    contact.jpg                 → /contact page banner
  fleet/
    honda-activa/               → folder name MUST match the vehicle slug
      front.jpg
      side.jpg                  → any filenames, shown sorted alphabetically
    tvs-jupiter/
    suzuki-access-125/
    royal-enfield-classic-350/
    ktm-duke-200/
    bajaj-pulsar-220/
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
Vehicle slugs are defined in `src/data/vehicles.ts`.
