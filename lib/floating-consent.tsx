"use client";

import { useCookieConsent } from "./context";

export function FloatingConsentInfo() {
  const { isOpen, setOpen } = useCookieConsent();
  if (isOpen) {
    return null;
  }

  return (
    <button
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        zIndex: "9998",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      aria-label="Cookie Settings"
      title="Cookie Settings"
      onClick={() => setOpen(true)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "#666" }}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="currentColor"
        />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
        <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
        <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </button>
  );
}
