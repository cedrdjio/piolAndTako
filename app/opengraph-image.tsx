import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — Properties · Cars · Experiences`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a1633 0%, #101f47 45%, #1e5bff 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 6, opacity: 0.8 }}>
          PROPERTIES · CARS · EXPERIENCES
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 92,
            fontWeight: 800,
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          <span>piol</span>
          <span style={{ color: "#8ab0ff", margin: "0 18px" }}>&amp;</span>
          <span>tako</span>
        </div>
        <div style={{ fontSize: 40, marginTop: 20, maxWidth: 900, opacity: 0.85, lineHeight: 1.3 }}>
          Réservez l&apos;exception au Cameroun — logements, voitures et expériences premium.
        </div>
      </div>
    ),
    size,
  );
}
