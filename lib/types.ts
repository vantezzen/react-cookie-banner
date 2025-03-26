export type CookieCategory = "marketing" | "analytics" | "other";

export type CookieConsentEntries = {
  marketing: boolean;
  analytics: boolean;
  other: boolean;
};

export type CookieServiceDetails = {
  id: string;
  name: string;
  category: CookieCategory;
};

export type CookieConsentState = {
  /**
   * Current consent state.
   */
  consent: CookieConsentEntries;

  /**
   * Current consent state for custom services.
   */
  serviceConsents: Record<string, boolean | null>;

  /**
   * Set the full consent state.
   *
   * @param consent
   * @param serviceConsents
   * @returns
   */
  setFullConsent: (
    consent: CookieConsentEntries,
    serviceConsents: Record<string, boolean | null>
  ) => void;

  /**
   * List of services that should be displayed in the banner.
   * This is primarily used inside the CookieService component.
   */
  services: CookieServiceDetails[];
  registerService: (service: CookieServiceDetails) => void;
  removeService: (service: CookieServiceDetails) => void;

  // Helper functions, mostly to allow easily updating the consent state for external components.

  /**
   * Update the consent state of consent categories.
   * @param consent - Partial consent state to update.
   * @example
   * setConsent({ marketing: true });
   */
  setConsent: (consent: Partial<CookieConsentEntries>) => void;

  /**
   * Update the consent state of a specific service.
   * @param serviceId - ID of the service to update.
   * @param enabled - New consent state for the service.
   */
  setServiceConsent: (serviceId: string, enabled: boolean | null) => void;

  /**
   * Check if a service is enabled.
   * @param service - Service to check.
   * @returns True if the service is enabled, false otherwise.
   */
  isServiceEnabled: (service: CookieServiceDetails) => boolean;

  isOpen: boolean;
  setOpen: (open: boolean) => void;

  isConsentModeActive: boolean;
  setConsentModeActive: (active: boolean) => void;
};

export const DEFAULT_CONSENT_STATE = {
  cookieCategoryConsents: {
    marketing: false,
    analytics: false,
    other: false,
  },
  customServiceConsents: {},
};
