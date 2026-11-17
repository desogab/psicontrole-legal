# PsiControle Landing Page

Static trilingual landing and legal site for **PsiControle**, a native iOS app for organizing patients, schedules, recurring appointments, reminders, finances, Siri/Shortcuts workflows, and optional Calendar integration.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to the saved/browser language (Portuguese by default) |
| `/pt-BR/` | Portuguese landing page |
| `/en/` | English landing page |
| `/es-ES/` | Spanish (Spain) landing page |
| `/pt-BR/privacy.html` | Portuguese Privacy Policy |
| `/pt-BR/terms.html` | Portuguese Terms of Use |
| `/en/privacy.html` | English Privacy Policy |
| `/en/terms.html` | English Terms of Use |
| `/es-ES/privacy.html` | Spanish (Spain) Privacy Policy |
| `/es-ES/terms.html` | Spanish (Spain) Terms of Use |

## App Store Link

Set the localized download URLs in one place:

```js
// assets/js/config.js
window.PSICONTROLE_CONFIG = {
  APP_STORE_URL_EN: "https://apps.apple.com/us/app/id6772772414",
  APP_STORE_URL_PT_BR: "https://apps.apple.com/br/app/id6772772414",
  APP_STORE_URL_ES_ES: "https://apps.apple.com/app/id6772772414"
};
```

Download links use the stable app ID rather than a title that can change. Portuguese uses the Brazil storefront, English uses the US storefront, and Spanish uses the international link because the Spain storefront currently returns a missing page. App availability still depends on the visitor’s App Store account region. Each download button has the same URL in its HTML so it remains usable without JavaScript. The script selects the configured URL from the current page language.

## Tech

- Static HTML, CSS, and JavaScript only.
- No build step.
- No frameworks.
- No analytics.
- No cookies.
- DigitalOcean App Platform static-site compatible.
- Responsive layout focused on iPhone/iOS presentation.

## Deployment

- Production: `https://psicontrole.app.br`
- Hosting: DigitalOcean App Platform
- Source: automatic deployments from the `main` branch
- GitHub Pages is a legacy fallback, not the production environment. Do not use
  its URLs in the app or App Store metadata, and do not disable it while a
  released app version still references those URLs.

## Local Preview

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

## Contact

desogab@icloud.com
<!-- campaign:start -->
## Marketing campaign

The `rotina-sob-controle-v1` campaign presents three workflows (before the session, after it, at the end of the month) instead of a recorded demo. Each workflow is HTML text plus one silent looping clip in a phone frame: `assets/video/<locale>/{before,after,month}.mp4` with a `.webp` poster (the first frame). The clips play only while visible and stay on the poster with reduced motion. They are rendered by the `psicontrole-motion` Remotion project (`Site-*` compositions, `npm run render:site`) from real screens captured with fictional data; see its `capture/README.md`. The website remains static, without third-party video embeds or tracking scripts.

Set real, approved custom product page URLs in `assets/js/config.js` under `CPP_URLS`. Empty or invalid custom URLs fall back to the localized default page. Set `CAMPAIGN_PROVIDER_TOKEN` only to the real provider token from App Store Connect to enable campaign attribution. No tokens or page IDs are invented.

Pushing `feature/static-website` updates the review branch. Merging its pull request into `main` triggers the existing DigitalOcean deployment.
<!-- campaign:end -->
