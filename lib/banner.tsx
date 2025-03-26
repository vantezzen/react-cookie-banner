"use client";

import { useState, useEffect } from "react";
import "./cookie-banner.css";
import { CookieCategory, CookieConsentEntries } from "./types";
import { useCookieConsent } from "./context";
import {
  CookieBannerTranslations,
  defaultTranslations,
  TranslationLanguage,
} from "./lang";

export function CookieBanner({
  privacyPolicyUrl = "/privacy",
  lang = "auto",
}: {
  privacyPolicyUrl?: string;
  lang?: CookieBannerTranslations | TranslationLanguage | "auto";
}) {
  const browserLang = navigator.language.split("-")[0];
  if (lang === "auto") {
    lang = browserLang as TranslationLanguage;
  }
  const t =
    typeof lang === "object"
      ? lang
      : defaultTranslations[lang] ?? defaultTranslations.en;

  const {
    isOpen,
    setOpen,
    services,
    serviceConsents,
    setFullConsent,
    consent,
  } = useCookieConsent();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const cookieCategories: {
    id: CookieCategory;
    name: string;
    required: boolean;
    enabled: boolean;
    services: typeof services;
  }[] = [
    {
      // @ts-expect-error - Not a real category but we want to display it
      id: "essential",
      name: t.essential,
      required: true,
      enabled: true,
    },
    {
      id: "marketing",
      name: t.marketing,
      required: false,
      enabled: true,
      services: services.filter((service) => service.category === "marketing"),
    },
    {
      id: "analytics",
      name: t.analytics,
      required: false,
      enabled: true,
      services: services.filter((service) => service.category === "analytics"),
    },
    {
      id: "other",
      name: t.other,
      required: false,
      enabled: true,
      services: services.filter((service) => service.category === "other"),
    },
  ];

  let [cookieCategoryConsents, setCookieCategoryConsents] =
    useState<CookieConsentEntries>(consent);
  let [customServiceConsents, setCustomServiceConsents] =
    useState<Record<string, boolean | null>>(serviceConsents);

  useEffect(() => {
    if (window.location.pathname === privacyPolicyUrl) {
      // Don't show the banner on the privacy policy page
      setOpen(false);
      return;
    }

    const consentState = localStorage.getItem("cookieConsent");
    if (!consentState) {
      // Show the banner if consent hasn't been given yet
      setOpen(true);
    }
  }, [window.location.pathname, consent, privacyPolicyUrl, setOpen]);

  const saveConsent = () => {
    setOpen(false);
    setFullConsent(cookieCategoryConsents, customServiceConsents);
  };

  const acceptAll = () => {
    cookieCategoryConsents = {
      marketing: true,
      analytics: true,
      other: true,
    };
    setCookieCategoryConsents(cookieCategoryConsents);

    customServiceConsents = {};
    setCustomServiceConsents({});

    saveConsent();
  };

  const disableAll = () => {
    cookieCategoryConsents = {
      marketing: false,
      analytics: false,
      other: false,
    };
    setCookieCategoryConsents(cookieCategoryConsents);

    customServiceConsents = {};
    setCustomServiceConsents({});

    saveConsent();
  };

  const toggleCategory = (categoryId: CookieCategory) => {
    setCookieCategoryConsents({
      ...cookieCategoryConsents,
      [categoryId]: !cookieCategoryConsents[categoryId],
    });
  };

  const toggleService = (serviceId: string) => {
    setCustomServiceConsents({
      ...customServiceConsents,
      [serviceId]: !(customServiceConsents[serviceId] ?? true),
    });
  };

  const toggleCategoryExpansion = (categoryId: CookieCategory) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const hasCustomSelection = () => {
    return (
      Object.values(customServiceConsents).some((value) => value !== null) ||
      Object.values(cookieCategoryConsents).some((value) => value !== true)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-banner-header">
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>

        <div className="cookie-categories">
          {cookieCategories
            .filter(
              (category) => category.services?.length > 0 || category.required
            )
            .map((category) => (
              <div key={category.id} className="cookie-category">
                <div className="cookie-banner-category-header">
                  <div className="cookie-banner-category-info">
                    <label className="cookie-banner-checkbox-container">
                      <input
                        type="checkbox"
                        checked={cookieCategoryConsents[category.id] ?? true}
                        onChange={() => toggleCategory(category.id)}
                        disabled={category.required}
                      />
                      <span className="cookie-banner-checkmark"></span>
                      <span className="cookie-banner-category-name">
                        {category.name}
                      </span>
                      {category.required && (
                        <span className="cookie-banner-required-badge">
                          {t.required}
                        </span>
                      )}
                    </label>
                  </div>
                  {category.services?.length > 0 && (
                    <button
                      className="cookie-banner-expand-button"
                      onClick={() => toggleCategoryExpansion(category.id)}
                      aria-expanded={expandedCategories.includes(category.id)}
                    >
                      {expandedCategories.includes(category.id) ? "−" : "+"}
                    </button>
                  )}
                </div>

                <div
                  className={
                    "cookie-banner-category-services" +
                    (expandedCategories.includes(category.id)
                      ? " cookie-banner-category-services-expanded"
                      : "")
                  }
                >
                  {category.services?.map((service) => (
                    <div
                      key={service.id}
                      className="cookie-banner-service-item"
                    >
                      <label className="cookie-banner-checkbox-container">
                        <input
                          type="checkbox"
                          checked={
                            customServiceConsents[service.id] ??
                            serviceConsents[service.id] ??
                            category.enabled
                          }
                          onChange={() => toggleService(service.id)}
                          disabled={category.required}
                        />
                        <span className="cookie-banner-checkmark cookie-banner-service-checkmark"></span>
                        <span className="cookie-banner-service-name">
                          {service.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className="cookie-banner-privacy-policy">
          <p>
            {t.privacyPolicyInfo}{" "}
            <a href={privacyPolicyUrl}>{t.privacyPolicy}</a>.
          </p>
        </div>

        <div className="cookie-banner-actions">
          {hasCustomSelection() ? (
            <button className="cookie-banner-save-button" onClick={saveConsent}>
              {t.saveSelection}
            </button>
          ) : (
            <button
              className="cookie-banner-disable-button"
              onClick={disableAll}
            >
              {t.disableAll}
            </button>
          )}
          <button className="cookie-banner-accept-button" onClick={acceptAll}>
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
