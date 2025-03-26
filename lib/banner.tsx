"use client";

import { useState, useEffect } from "react";
import "./cookie-banner.css";
import { CookieCategory, CookieConsentEntries } from "./types";
import { useCookieConsent } from "./context";

export function CookieBanner({
  privacyPolicyUrl = "/privacy",
}: {
  privacyPolicyUrl?: string;
}) {
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
      name: "Essential",
      required: true,
      enabled: true,
    },
    {
      id: "marketing",
      name: "Marketing",
      required: false,
      enabled: true,
      services: services.filter((service) => service.category === "marketing"),
    },
    {
      id: "analytics",
      name: "Analytics",
      required: false,
      enabled: true,
      services: services.filter((service) => service.category === "analytics"),
    },
    {
      id: "other",
      name: "Other",
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
  }, []);

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
          <h2>Cookie Preferences</h2>
          <p>
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By clicking
            "Accept All", you consent to our use of cookies.
          </p>
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
                          Required
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

                {expandedCategories.includes(category.id) && (
                  <div className="cookie-banner-category-services">
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
                          <span className="cookie-banner-checkmark"></span>
                          <span className="cookie-banner-service-name">
                            {service.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="cookie-banner-privacy-policy">
          <p>
            For more information about how we use cookies, please read our{" "}
            <a href={privacyPolicyUrl}>Privacy Policy</a>.
          </p>
        </div>

        <div className="cookie-banner-actions">
          {hasCustomSelection() ? (
            <button className="cookie-banner-save-button" onClick={saveConsent}>
              Save Selection
            </button>
          ) : (
            <button
              className="cookie-banner-disable-button"
              onClick={disableAll}
            >
              Disable All
            </button>
          )}
          <button className="cookie-banner-accept-button" onClick={acceptAll}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
