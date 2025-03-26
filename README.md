# @vantezzen/react-cookie-banner

> A simple, full-service cookie banner solution for React

react-cookie-banner handles displaying your cookie banner, saving and managing user consent and loading of external scripts based on user consent for you.

- **Simple to use**: Just wrap your app in the `CookieConsentProvider` and use the `CookieBanner` component to display the cookie banner
- **Minimal config**: Services are automatically added to your cookie banner by wrapping them in the `CookieService` component
- **Support for all library loaders**: You can use other libraries like `@nextjs/third-parties` to load external scripts
- **Handles loading of external scripts**: Only load external scripts if the user has given consent
- **Customizable**: Customize the look and feel of the cookie banner to fit your website
- **Google Consent Mode**: Automatically enable Google Consent Mode for Google Analytics and Ads
- **Privacy Policy Link**: Add a link to your privacy policy to the cookie banner and hide the banner while the user reads the privacy policy
- **Small**: Only 6.5kb gzipped

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

      {/* Optionally you can show a floating consent info in to bottom right to allow
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

```jsx
import { CookieBanner } from "@vantezzen/react-cookie-banner";

function App() {
  return (
    <CookieConsentProvider>
      <CookieBanner privacyPolicyUrl="/privacy-policy" />
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

You can simply add mutliple scripts or components to the `CookieService` component or use the same ID for multiple `CookieService` components.

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

### How does the Google Consent Mode work?

Google Consent Mode is a feature of Google Analytics and Google Ads that allows you to enable Google Analytics and Google Ads without tracking the user until they have given consent.

This is done by always loading the Google scripts and instead adding the consent status to the `window.dataLayer` object. Google Analytics and Google Ads will then only track the user if the consent status is set to `granted` and only send anonymized data if the consent status is not given yet.

### How do I change the appearance of the cookie banner?

The cookie banner ships with a default CSS file that you can override with your own styles. You can take a look at the default styles in the `src/lib/cookie-banner.css` file.

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

### `useCookieConsent`

- **Returns**
  - `consent`: Consent
  - `setConsent`: (consent: Consent) => void
  - `serviceConsents`: Record<string, boolean | null> - The consent state for each service, if it is customized
  - `setServiceConsent`: (id: string, consent: boolean | null) => void - Set the consent state for a specific service
  - `isServiceEnabled`: (id: string) => boolean - Check if a service is enabled
  - `isOpen`: boolean - If the cookie banner is open
  - `setOpen`: (open: boolean) => void - Set the open state of the cookie banner
