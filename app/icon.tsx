import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#080a09",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg width="50" height="44" viewBox="0 0 104 92" fill="none">
          <path
            d="M8 84V40a16 16 0 0 1 32 0v44M40 84V40a16 16 0 0 1 32 0v44"
            stroke="#6f7478"
            strokeWidth="11"
            transform="translate(7 5)"
          />
          <path
            d="M8 84V40a16 16 0 0 1 32 0v44M40 84V40a16 16 0 0 1 32 0v44"
            stroke="#ffffff"
            strokeWidth="11"
          />
        </svg>
      </div>
    ),
    size,
  );
}
