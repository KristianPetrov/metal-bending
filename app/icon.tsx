import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        border: "4px solid #ffffff",
        borderRadius: "50%",
        color: "#ffffff",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 22,
        fontWeight: 800,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-1px",
        width: "100%",
      }}
    >
      MB
    </div>,
    size,
  );
}
