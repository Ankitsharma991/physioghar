import { ImageResponse } from "next/og";

export const alt = "Digital Chautari: digital bridges between ideas and impact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0B1220",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #0F9488, #0B6F66)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          DC
        </div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>Digital Chautari</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 22,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          <span>We build</span>
          <span style={{ color: "#E0A930" }}>digital bridges</span>
          <span>between ideas and impact</span>
        </div>
        <div style={{ fontSize: 30, color: "#9aa6b5" }}>
          Digital marketing, content creation and health-tech software from Kathmandu
        </div>
      </div>
    </div>,
    size,
  );
}
