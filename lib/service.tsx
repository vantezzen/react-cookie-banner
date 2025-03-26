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
}: {
  id: string;
  name: string;
  category: CookieCategory;
  children: React.ReactNode;
  consentMode?: boolean;
}) {
  const { registerService, isServiceEnabled, isConsentModeActive } =
    useCookieConsent();

  React.useEffect(() => {
    registerService({ id, name, category });
  }, [id, name, category, registerService]);

  const canUseConsentMode = consentMode && isConsentModeActive;

  if (!canUseConsentMode && !isServiceEnabled({ id, name, category })) {
    return null;
  }

  // TODO: Implement consent mode

  return <>{children}</>;
}
