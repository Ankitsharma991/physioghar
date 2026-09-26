import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0F9488, #0B6F66)",
        borderRadius: 16,
        color: "#ffffff",
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: -1,
      }}
    >
      DC
    </div>,
    size,
  );
}
