import { useState } from "react";
import {
  CookieBanner,
  ConsentMode,
  CookieConsentProvider,
  FloatingConsentInfo,
  CookieService,
} from "../lib";
import { TranslationLanguage } from "../lib/lang";

function App() {
  const [lang, setLang] = useState<TranslationLanguage | "auto">("auto");
  return (
    <>
      <CookieConsentProvider>
        <CookieBanner lang={lang} />
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
          id="adobe-analytics"
          category="analytics"
          name="Adobe Analytics"
          fallback={<div>Adobe Analytics not loaded</div>}
        >
          <div>Adobe Analytics loaded</div>
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

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as TranslationLanguage)}
        >
          <option value="auto">Auto</option>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="it">Italian</option>
          <option value="nl">Dutch</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
        </select>
      </CookieConsentProvider>
    </>
  );
}

export default App;
