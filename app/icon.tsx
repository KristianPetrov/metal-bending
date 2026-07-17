import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0b0d0e",
        color: "#f4f3ef",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 24,
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
