# PsiControle Landing Page

Static bilingual landing and legal site for **PsiControle**, a native iOS app for organizing clinical schedules, patients, appointments, payments, reminders, and calendar-related workflows.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/pt-BR/` |
| `/pt-BR/` | Portuguese landing page |
| `/en/` | English landing page |
| `/pt-BR/privacy.html` | Portuguese Privacy Policy |
| `/pt-BR/terms.html` | Portuguese Terms of Use |
| `/en/privacy.html` | English Privacy Policy |
| `/en/terms.html` | English Terms of Use |

## App Store Link

Set the localized download URLs in one place:

```js
// assets/js/config.js
window.PSICONTROLE_CONFIG = {
  APP_STORE_URL_EN: "https://apps.apple.com/us/app/psicontrole-safe-and-smooth/id6772772414",
  APP_STORE_URL_PT_BR: "https://apps.apple.com/br/app/psicontrole-f%C3%A1cil-e-seguro/id6772772414"
};
```

The script selects the URL from the current page language. If a localized URL is empty, buttons for that page remain visible but disabled.

## Tech

- Static HTML, CSS, and JavaScript only.
- No build step.
- No frameworks.
- No analytics.
- No cookies.
- GitHub Pages compatible.
- Responsive layout focused on iPhone/iOS presentation.

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
