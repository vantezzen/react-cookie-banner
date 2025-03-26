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
          name="Somer Other Analytics"
        >
          <div>Some other Analytics loaded</div>
        </CookieService>

        <CookieService
          id="facebook-pixel"
          category="marketing"
          name="Facebook Pixel"
        >
          <div>Facebook Pixel loaded</div>
        </CookieService>

        <CookieService
          id="youtube-embed"
          category="other"
          name="Youtube Embed"
        />

        <CookieService id="intercom" category="other" name="Intercom">
          <div>Intercom loaded</div>
        </CookieService>
      </CookieConsentProvider>
    </>
  );
}

export default App;
