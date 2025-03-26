"use client";

import { createContext, use, useEffect, useState } from "react";
import {
  CookieConsentEntries,
  CookieConsentState,
  CookieServiceDetails,
  DEFAULT_CONSENT_STATE,
} from "./types";
import { useLocalStorage } from "usehooks-ts";

// @ts-expect-error - Context is initialized in the provider
const CookieConsentContext = createContext<CookieConsentState>();

export const useCookieConsent = () => {
  const context = CookieConsentContext;
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return use(context);
};

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storedConsent, setStoredConsent] = useLocalStorage(
    "cookieConsent",
    DEFAULT_CONSENT_STATE
  );

  const [consent, setConsent] = useState<CookieConsentEntries>({
    marketing: false,
    analytics: false,
    other: false,
  });

  const [services, setServices] = useState<CookieServiceDetails[]>([]);
  const [serviceConsents, setServiceConsents] = useState<
    Record<string, boolean | null>
  >({});

  const [isOpen, setOpen] = useState(false);
  const [isConsentModeActive, setConsentModeActive] = useState(false);

  useEffect(() => {
    // Load consent preferences from localStorage
    const { cookieCategoryConsents, customServiceConsents } = storedConsent;
    setConsent(cookieCategoryConsents);
    setServiceConsents(customServiceConsents);
  }, [storedConsent]);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        services,
        serviceConsents,

        registerService: (service) => {
          if (!services.find((s) => s.id === service.id)) {
            setServices([...services, service]);
          }
        },
        removeService: (service) =>
          setServices(services.filter((s) => s !== service)),

        setConsent: (newConsent) => {
          setConsent({ ...consent, ...newConsent });
          setStoredConsent({
            cookieCategoryConsents: { ...consent, ...newConsent },
            customServiceConsents: serviceConsents,
          });
        },
        setServiceConsent: (serviceId, enabled) => {
          setServiceConsents({ ...serviceConsents, [serviceId]: enabled });
          setStoredConsent({
            cookieCategoryConsents: consent,
            customServiceConsents: {
              ...serviceConsents,
              [serviceId]: enabled,
            },
          });
        },
        setFullConsent: (newConsent, newServiceConsents) => {
          setConsent(newConsent);
          setServiceConsents(newServiceConsents);
          setStoredConsent({
            cookieCategoryConsents: newConsent,
            customServiceConsents: newServiceConsents,
          });
        },

        isServiceEnabled: (service) => {
          return serviceConsents[service.id] ?? consent[service.category];
        },

        isOpen,
        setOpen,

        isConsentModeActive,
        setConsentModeActive,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
