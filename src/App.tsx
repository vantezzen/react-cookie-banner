import {
  CookieBanner,
  ConsentMode,
  CookieConsentProvider,
  FloatingConsentInfo,
  CookieService,
} from "../lib";

function App() {
  return (
    <>
      <CookieConsentProvider>
        <CookieBanner />
        <FloatingConsentInfo />
        <ConsentMode />

        <CookieService
          id="google-analytics"
          category="analytics"
          name="Google Analytics"
          consentMode
        >
          <div>Google Analytics loaded with consent mode</div>
        </CookieService>

        <CookieService
          id="other-analytics"
          category="analytics"
          name="Other Analytics"
        >
          <div>Other Analytics loaded</div>
        </CookieService>
      </CookieConsentProvider>
    </>
  );
}

export default App;
