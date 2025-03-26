"use client";

import React from "react";
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

  React.useEffect(() => {
    registerService({ id, name, category });
  }, [id, name, category, registerService]);

  const canUseConsentMode = consentMode && isConsentModeActive;

  if (!canUseConsentMode && !isServiceEnabled({ id, name, category })) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
