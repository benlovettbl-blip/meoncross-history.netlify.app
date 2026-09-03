# public/units/

## ⚠️ Architecture Note

This folder serves **two distinct purposes** — do not delete it:

### 1. Runtime Unit Assets (ACTIVE — do not delete)
The app's `getAssetUrl()` helper (in `src/core_app.js`) resolves paths like:
```
/units/<unit_id>/workbooks/<file>.pdf
/units/<unit_id>/images/<img>.jpg
/units/<unit_id>/mock_papers/<file>.pdf
```
All workbook PDFs, lesson images, and mock exam files live here and are served directly by Netlify.

### 2. Stale data.js mirrors (DEPRECATED — do not edit)
Each `public/units/<unit_id>/data.js` is an **old snapshot** of the unit data. It is NOT read by the app at runtime.

**The canonical source of truth is:**
- `units/<unit_id>/data.js` — edited by developers
- `public/database.json` — compiled by `node scripts/build_database.cjs`

> If a `data.js` in `public/units/` disagrees with `public/database.json`, the app will always use `database.json`.

### Safe workflow
1. Edit `units/<unit_id>/data.js`
2. Run `node scripts/build_database.cjs`
3. Never edit `public/units/<unit_id>/data.js` directly
