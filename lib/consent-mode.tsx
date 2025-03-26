"use client";

import { useEffect } from "react";
import { useCookieConsent } from "./context";

export function ConsentMode() {
  const { consent, isConsentModeActive, setConsentModeActive } =
    useCookieConsent();

  useEffect(() => {
    function getConsentStatus() {
      return {
        ad_storage: consent.marketing ? "granted" : "denied",
        analytics_storage: consent.analytics ? "granted" : "denied",
        wait_for_update: 500,
      };
    }

    if (!isConsentModeActive) {
      const script = document.createElement("script");
      script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', ${JSON.stringify(getConsentStatus())});
      `;
      document.head.appendChild(script);

      setConsentModeActive(true);
    } else {
      window.gtag("consent", "update", getConsentStatus());
    }
  }, [consent, isConsentModeActive, setConsentModeActive]);

  return null;
}
