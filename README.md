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
  APP_STORE_URL_EN: "https://apps.apple.com/us/app/psicontrole-safe-and-smooth/id6772772414",
  APP_STORE_URL_PT_BR: "https://apps.apple.com/br/app/psicontrole-f%C3%A1cil-e-seguro/id6772772414",
  APP_STORE_URL_ES_ES: "https://apps.apple.com/es/app/psicontrole/id6772772414"
};
```

The script selects the URL from the current page language. If a localized URL is empty, buttons for that page remain visible but disabled.

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
