import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F3ED",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            color: "#2A2622",
            letterSpacing: 4,
          }}
        >
          KAMAL COFFEE
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#8C7B6B",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Premium Vietnamese Iced Coffee
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 20,
            color: "#B8895A",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Vegan · Dairy Free · Sweetened with Allulose
        </div>
      </div>
    ),
    { ...size },
  );
}
