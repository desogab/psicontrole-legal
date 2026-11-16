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
    const topic = link.dataset.productPage || "main";
    const customUrl = (config.CPP_URLS?.[currentLanguage] || {})[topic];
    let destination = appStoreUrl;
    try {
      const candidate = new URL(customUrl || appStoreUrl);
      if (candidate.protocol === "https:" && candidate.hostname === "apps.apple.com") {
        const provider = String(config.CAMPAIGN_PROVIDER_TOKEN || "").trim();
        if (provider) {
          candidate.searchParams.set("pt", provider);
          candidate.searchParams.set("ct", `web_${config.CAMPAIGN_NAME || "main"}_${currentLanguage}_${topic}`);
        }
        destination = candidate.href;
      }
    } catch (_) {
      // An unpublished or malformed CPP uses the ordinary localized product page.
    }
    if (destination) {
      link.href = destination;
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

  // Feature tour: on phones the panels swipe horizontally. The tabs are plain anchors (they work without
  // script); here they scroll the track instead of the page and follow the panel in view.
  const track = document.querySelector(".tour-track");
  const tabs = Array.from(document.querySelectorAll(".tour-tabs a"));

  if (track && tabs.length) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panelFor = (tab) => document.getElementById(tab.hash.slice(1));
    const setCurrent = (id) => {
      tabs.forEach((tab) => {
        if (tab.hash === `#${id}`) tab.setAttribute("aria-current", "true");
        else tab.removeAttribute("aria-current");
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        const panel = panelFor(tab);
        if (!panel || track.scrollWidth <= track.clientWidth) return;
        event.preventDefault();
        track.scrollTo({ left: panel.offsetLeft - track.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
        setCurrent(panel.id);
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrent(entry.target.id);
          });
        },
        { root: track, threshold: 0.6 }
      );
      tabs.map(panelFor).filter(Boolean).forEach((panel) => observer.observe(panel));
    }
  }
})();
