# @vantezzen/react-cookie-banner

> A simple, full-service cookie banner solution for React

react-cookie-banner handles displaying your cookie banner, saving and managing user consent and loading of external scripts based on user consent for you.

- **Simple to use**: No large configuration needed, just wrap your external scripts in the `CookieService` component
- **Support for all library loaders**: You can use other libraries like `@nextjs/third-parties` to load external scripts
- **i18n support**: Build-in support for multiple languages, plus fully customizable texts if you need it
- **Handles consent automatically**: All scripts wrapped in the `CookieService` component are only loaded if the user has given consent
- **Customizable**: Customize the look and feel of the cookie banner to fit your website
- **Google Consent Mode**: Automatically enable Google Consent Mode for Google Analytics and Ads
- **Multi-tab support**: User consent is saved in local storage and synced between tabs automatically

What does it look like?

![Cookie Banner](https://raw.githubusercontent.com/vantezzen/react-cookie-banner/refs/heads/main/demo.png)

Live Demo: <https://vantezzen.github.io/react-cookie-banner/>

```jsx
import {
  CookieBanner,
  ConsentMode,
  CookieConsentProvider,
  FloatingConsentInfo,
  CookieService,
} from "@vantezzen/react-cookie-banner";

function App() {
  return (
    // Wrap your app in the CookieConsentProvider to allow accessing the consent state anywhere
    <CookieConsentProvider>
      {/* Display the cookie banner */}
      <CookieBanner privacyPolicyUrl="/privacy-policy" />

      {/* Optionally you can show a floating consent info in the bottom right to allow
      changing consent later */}
      <FloatingConsentInfo />

      {/* To set Google Consent Mode status, simply add the ConsentMode component */}
      <ConsentMode />

      {/* Add a CookieService for each external script you want to load */}
      <CookieService
        id="google-analytics"
        category="analytics"
        name="Google Analytics"
        consentMode // For Google Consent Mode
      >
        {/* Add any component or script that should only be loaded if the user has given consent */}
        <script /* ... */ />
      </CookieService>
      <CookieService
        id="other-analytics"
        category="analytics"
        name="Other Analytics"
      >
        <div>Other Analytics loaded</div>
      </CookieService>

      {/* Your app goes here */}
    </CookieConsentProvider>;
  )
}
```

## Installation

```bash
npm install @vantezzen/react-cookie-banner
```

## Usage

### 1. Wrap your app in the `CookieConsentProvider`

Wrap your app in the `CookieConsentProvider` to allow accessing the consent state anywhere in your app.

```jsx
import { CookieConsentProvider } from "@vantezzen/react-cookie-banner";

function App() {
  return <CookieConsentProvider>{/* Your app */}</CookieConsentProvider>;
}
```

You could add this to your Nextjs layout file to make it available on all pages.

### 2. Display the cookie banner

Use the `CookieBanner` component to display the cookie banner.

Optionally, you can pass a `privacyPolicyUrl` prop to add a link to your privacy policy to the cookie banner. If none is provided `/privacy` will be used.

Additionally, you can set the `lang` prop to one of the supported languages (e.g. `de` for German) to change the language of the cookie banner or provide your own texts using the prop. If you do not supply a `lang` prop or explicitly set it to `"auto"`, the texts will be in the user's browser language or english as a fallback.

```jsx
import { CookieBanner } from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <CookieBanner privacyPolicyUrl="/privacy-policy" lang="de" />
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

### 3. Add services to the cookie banner

Wrap any component or script that should only be loaded if the user has given consent in the `CookieService` component.

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <CookieBanner privacyPolicyUrl="/privacy-policy" />

      <CookieService
        id="google-analytics"
        category="analytics" // or "marketing" or "other"
        name="Google Analytics"
      >
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
        />
      </CookieService>
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

### 4. Show a floating consent info (optional)

Optionally, you can show a floating consent info in the bottom right to allow changing consent later.

```jsx
import { FloatingConsentInfo } from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      {/* cookie banner, services etc. here */}
      <FloatingConsentInfo />
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

### 5. Add Google Consent Mode (optional)

To enable Google Consent Mode for Google Analytics and Ads, add the `ConsentMode` component to your app and set the `consentMode` prop on the `CookieService` component for all services that support it.

```jsx
import { ConsentMode } from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <ConsentMode />
      <CookieService
        id="google-analytics"
        category="analytics"
        name="Google Analytics"
        consentMode
      >
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
        />
      </CookieService>
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

## FAQ

### How do I add a service to the cookie banner?

Wrap any component or script that should only be loaded if the user has given consent in the `CookieService` component.

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

<CookieService
  id="google-analytics"
  category="analytics" // or "marketing" or "other"
  name="Google Analytics"
>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
  />
</CookieService>;
```

### My service has multiple scripts, how do I add them all?

You can simply add multiple scripts or components to the `CookieService` component or use the same ID for multiple `CookieService` components.

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

<CookieService
  id="google-analytics"
  category="analytics" // or "marketing" or "other"
  name="Google Analytics"
>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
  />
  <script async src="https://www.google-analytics.com/analytics.js" />
</CookieService>;
```

### How do I manually check if a service is enabled?

You can use the `useCookieConsent` hook to check if a service is enabled.

```jsx
import { useCookieConsent } from "@vantezzen/react-cookie-banner";

function MyComponent() {
  const { isServiceEnabled } = useCookieConsent();

  if (isServiceEnabled("google-analytics")) {
    // Load Google Analytics
  }

  return <div>My Component</div>;
}
```

### How do I manually open or close the cookie banner?

You can use the `useCookieConsent` hook to open or close the cookie banner.

```jsx
import { useCookieConsent } from "@vantezzen/react-cookie-banner";

function MyComponent() {
  const { isOpen, setOpen } = useCookieConsent();

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Cookie Banner</button>
      <button onClick={() => setOpen(false)}>Close Cookie Banner</button>
    </div>
  );
}
```

### How do I manually set the consent state?

react-cookie-banner differentiates between category consents and service consents. You can set the consent state for a category or a specific service using the `useCookieConsent` hook.

If no explicit consent is set for a service or it is set to `null`, the category consent is used.

```jsx
import { useCookieConsent } from "@vantezzen/react-cookie-banner";

function MyComponent() {
  const { setConsent, setServiceConsent } = useCookieConsent();

  // Set the consent state across categories
  setConsent({
    analytics: true,
    marketing: false,
    other: false,
  });

  // Set the consent state for a specific service
  setServiceConsent("google-analytics", true);

  // Setting service consent to null will use the category consent
  setServiceConsent("google-analytics", null); // => will use the "analytics" category consent

  return <div>My Component</div>;
}
```

### How do I add services that do not need a component?

You can simply add a `CookieService` component without any children.

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

<CookieService
  id="google-analytics"
  category="analytics" // or "marketing" or "other"
  name="Google Analytics"
/>;
```

You can then use `useCookieConsent` to check if the service is enabled and load the script manually.

### How do I render a fallback if the user has not given consent?

You can add a `fallback` prop to the `CookieService` component to render a component if the user has not given consent.

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

<CookieService
  id="google-analytics"
  category="analytics"
  name="Google Analytics"
  fallback={<div>Google Analytics is disabled</div>}
>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
  />
</CookieService>;
```

### A service is not shown in the cookie banner, what do I do?

To make sure a service is shown, follow these steps:

1. Make sure the service is wrapped in a `CookieService` component

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

// Wrong
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
/>

// Right
<CookieService
  id="google-analytics"
  category="analytics"
  name="Google Analytics"
>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
  />
</CookieService>
```

2. Make sure the `CookieService` component and the `CookieBanner` component are inside the `CookieConsentProvider`

```jsx
import {
  CookieConsentProvider,
  CookieBanner,
  CookieService,
} from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <CookieBanner privacyPolicyUrl="/privacy-policy" />
      <CookieService
        id="google-analytics"
        category="analytics"
        name="Google Analytics"
      >
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"
        />
      </CookieService>
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

3. Make sure the `CookieService` component is rendered when the `CookieBanner` component is rendered

In order for the service to be discoverable, the `CookieService` component needs to be rendered when the `CookieBanner` component is rendered. If you are only loading the service later or only on specific pages, consider adding a blank `CookieService` component to the layout or a parent component that is always rendered:

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

// Embeds are only loaded on specific pages so we add a blank CookieService component to the layout
<CookieService id="youtube" category="other" name="YouTube Embeds" />;
```

### How do I only load elements like YouTube Embeds if the user has given consent?

Simply wrap the element in a `CookieService` component. You may want to add a fallback to show a message to the user that they need to give consent to load the element.

```jsx
import {
  CookieService,
  useCookieConsent,
} from "@vantezzen/react-cookie-banner";

function MyEmbed() {
  const { setServiceConsent } = useCookieConsent();

  return (
    <CookieService
      id="youtube"
      category="other"
      name="YouTube Embeds"
      fallback={
        <div style={{ padding: "16px", backgroundColor: "red" }}>
          You need to give consent to load this video
          <button onClick={() => setServiceConsent("youtube", true)}>
            Give Consent
          </button>
        </div>
      }
    >
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </CookieService>
  );
}
```

Please keep in mind that for services to appear in the cookie banner, they need to be rendered in the component tree when the `CookieBanner` component is rendered. If you are only loading the embed later or only on specific pages, consider adding a `CookieService` component to the layout or a parent component that is always rendered:

```jsx
import { CookieService } from "@vantezzen/react-cookie-banner";

<CookieService id="youtube" category="other" name="YouTube Embeds" />;
```

You may add as many YouTube Embeds with the same ID as you want - they will all be loaded if the user gives consent.

### How does the Google Consent Mode work?

Google Consent Mode is a feature of Google Analytics and Google Ads that allows you to enable Google Analytics and Google Ads without tracking the user until they have given consent.

This is done by always loading the Google scripts and instead adding the consent status to the `window.dataLayer` object. Google Analytics and Google Ads will then only track the user if the consent status is set to `granted` and only send anonymized data if the consent status is not given yet.

For Consent Mode to work, you will need to include the `<ConsentMode />` component once - this will sync the consent status with the dataLayer. On all services that support it, you can then add the `consentMode` props - this will then always load those scripts as soon as the consent mode is ready.

### Why do I get "the consent mode integration wasn't found" in the console?

If you have actived Consent Mode support on a service but didn't load the `<ConsentMode />` component, you will see this warning:

> react-cookie-consent: You activated consent mode support for "Google Analytics" but the consent mode integration wasn't found.
> Make sure to add the <ConsentMode /> component to your app, otherwise the service won't be loaded.

To fix this issue, simply add the `<ConsentMode />` component to your app:

```jsx
import {
  CookieConsentProvider,
  ConsentMode,
} from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <ConsentMode />
      {/* Your app */}
    </CookieConsentProvider>
  );
}
```

### How do I add a link to my privacy policy?

You can add a link to your privacy policy by passing a `privacyPolicyUrl` prop to the `CookieBanner` component.

```jsx
import { CookieBanner } from "@vantezzen/react-cookie-banner";

<CookieBanner privacyPolicyUrl="/privacy-policy" />;
```

### How do I change the appearance of the cookie banner?

The cookie banner ships with a default CSS file that you can override with your own styles. You can take a look at the default styles in the `src/lib/cookie-banner.css` file.

### How do I change the texts of the cookie banner?

You can change the texts of the cookie banner by passing a `lang` prop to the `CookieBanner` component. The following languages are supported:

- `en` - English
- `de` - German
- `es` - Spanish
- `fr` - French
- `it` - Italian
- `nl` - Dutch
- `pt` - Portuguese
- `ja` - Japanese
- `ko` - Korean
- `zh` - Chinese
- `ru` - Russian
- `ar` - Arabic

Alternatively, you can pass a custom translation object to the `lang` prop to the `CookieBanner` component to customize the texts.

```jsx
import { CookieBanner } from "@vantezzen/react-cookie-banner";

<CookieBanner
  lang="ru"
  // or
  lang={{
    title: "Cookie consent",
    description:
      'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    required: "Required",

    privacyPolicyInfo: "For more information, please visit our",
    privacyPolicy: "Privacy Policy",

    acceptAll: "Accept all",
    saveSelection: "Save selection",
    disableAll: "Disable all",

    essential: "Essential",
    marketing: "Marketing",
    analytics: "Analytics",
    other: "Other",
  }}
/>;
```

## API

### `CookieConsentProvider`

- **Props**
  - `children`: ReactNode

### `CookieBanner`

- **Props**
  - `privacyPolicyUrl`: string

### `CookieService`

- **Props**
  - `id`: string
  - `category`: "analytics" | "marketing" | "other"
  - `name`: string
  - `consentMode`: boolean = false
  - `fallback`?: ReactNode - A component to render if the user has not given consent

### `useCookieConsent`

- **Returns**
  - `consent`: Consent
  - `setConsent`: (consent: Consent) => void
  - `serviceConsents`: Record<string, boolean | null> - The consent state for each service, if it is customized
  - `setServiceConsent`: (id: string, consent: boolean | null) => void - Set the consent state for a specific service
  - `isServiceEnabled`: (id: string) => boolean - Check if a service is enabled
  - `isOpen`: boolean - If the cookie banner is open
  - `setOpen`: (open: boolean) => void - Set the open state of the cookie banner
