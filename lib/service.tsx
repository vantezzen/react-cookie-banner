"use client";

import { useEffect } from "react";
import { useCookieConsent } from "./context";
import { CookieCategory } from "./types";

export function CookieService({
  id,
  name,
  category,
  children,
  consentMode = false,
  fallback = null,
}: {
  id: string;
  name: string;
  category: CookieCategory;
  children?: React.ReactNode;
  consentMode?: boolean;
  fallback?: React.ReactNode;
}) {
  const { registerService, isServiceEnabled, isConsentModeActive } =
    useCookieConsent();

  useEffect(() => {
    registerService({ id, name, category });
  }, [id, name, category, registerService]);

  useEffect(() => {
    if (consentMode && !isConsentModeActive) {
      const consentModeWarnTimeout = setTimeout(() => {
        console.warn(
          `react-cookie-consent: You activated consent mode support for "${name}" but the consent mode integration wasn't found.\nMake sure to add the <ConsentMode /> component to your app, otherwise the service won't be loaded.\nFor more information, visit https://github.com/vantezzen/react-cookie-banner#why-do-i-get-the-consent-mode-integration-wasnt-found-in-the-console`
        );
      }, 1000);
      return () => clearTimeout(consentModeWarnTimeout);
    }
  }, [consentMode, isConsentModeActive]);

  const canUseConsentMode = consentMode && isConsentModeActive;
  if (!canUseConsentMode && !isServiceEnabled({ id, name, category })) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
