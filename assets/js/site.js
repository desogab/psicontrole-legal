(function () {
  const languageStorageKey = "psicontrole-language";
  const config = window.PSICONTROLE_CONFIG || {};
  const pageLanguage = String(document.documentElement.lang || "").toLowerCase();
  const currentLanguage = pageLanguage.startsWith("pt") ? "pt-BR" : pageLanguage.startsWith("en") ? "en" : "";

  if (currentLanguage) {
    try {
      localStorage.setItem(languageStorageKey, currentLanguage);
    } catch (error) {
      // Browsers can block storage in private modes; route links still work.
    }
  }

  document.querySelectorAll(".lang-switch a[lang]").forEach((link) => {
    const linkLanguage = String(link.lang || "").toLowerCase().startsWith("pt") ? "pt-BR" : "en";

    if (currentLanguage && linkLanguage === currentLanguage) {
      link.classList.add("lang-active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
      try {
        localStorage.setItem(languageStorageKey, linkLanguage);
      } catch (error) {
        // Route navigation remains the source of truth.
      }
    });
  });

  const fallbackUrl = String(config.APP_STORE_URL || "").trim();
  const appStoreUrl = String(
    currentLanguage === "pt-BR"
      ? config.APP_STORE_URL_PT_BR || fallbackUrl
      : config.APP_STORE_URL_EN || fallbackUrl
  ).trim();

  document.querySelectorAll("[data-app-store-link]").forEach((link) => {
    if (appStoreUrl) {
      link.href = appStoreUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");
      return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.classList.add("is-disabled");
    link.addEventListener("click", (event) => event.preventDefault());
  });

  const header = document.querySelector(".site-header");

  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }
})();
