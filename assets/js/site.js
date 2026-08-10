(function () {
  document.documentElement.classList.add("js");

  const languageStorageKey = "psicontrole-language";
  const config = window.PSICONTROLE_CONFIG || {};
  const pageLanguage = String(document.documentElement.lang || "").toLowerCase();
  const currentLanguage = pageLanguage.startsWith("pt") ? "pt-BR" : pageLanguage.startsWith("es") ? "es-ES" : pageLanguage.startsWith("en") ? "en" : "";

  if (currentLanguage) {
    try {
      localStorage.setItem(languageStorageKey, currentLanguage);
    } catch (error) {
      // Browsers can block storage in private modes; route links still work.
    }
  }

  document.querySelectorAll(".lang-switch a[lang]").forEach((link) => {
    const normalizedLinkLanguage = String(link.lang || "").toLowerCase();
    const linkLanguage = normalizedLinkLanguage.startsWith("pt") ? "pt-BR" : normalizedLinkLanguage.startsWith("es") ? "es-ES" : "en";

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
      : currentLanguage === "es-ES"
        ? config.APP_STORE_URL_ES_ES || fallbackUrl
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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealGroups = [
    ".hero-copy > *",
    ".hero-visual",
    ".trust-item",
    ".section-heading",
    ".feature-card",
    ".split-copy",
    ".split-media",
    ".privacy-point",
    ".screenshot-card",
    ".final-cta-inner"
  ];
  const revealItems = Array.from(document.querySelectorAll(revealGroups.join(",")));

  if (!reduceMotion && "IntersectionObserver" in window && revealItems.length) {
    revealItems.forEach((item, index) => {
      item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
    });

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
