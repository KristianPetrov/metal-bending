/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/lib/site-content";
import { seoForSlug } from "@/lib/seo";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export async function createSocialImage(slug: string) {
  const seo = seoForSlug(slug);
  const backgroundPath = seo?.image ?? "/work/hero-1.jpg";
  const [backgroundData, markData] = await Promise.all([
    readFile(join(process.cwd(), "public", backgroundPath), "base64"),
    readFile(join(process.cwd(), "public", "icon-512.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0b0d0c",
          color: "#f7f6f2",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <img
          alt=""
          height={630}
          src={`data:image/jpeg;base64,${backgroundData}`}
          style={{
            height: "100%",
            objectFit: "cover",
            opacity: 0.32,
            position: "absolute",
            width: "100%",
          }}
          width={1200}
        />
        <div
          style={{
            background: "rgba(4, 6, 5, 0.42)",
            display: "flex",
            height: "100%",
            position: "absolute",
            width: "100%",
          }}
        />

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.28)",
            display: "flex",
            flexDirection: "column",
            height: 562,
            justifyContent: "space-between",
            margin: 34,
            padding: "34px 38px",
            position: "relative",
            width: 1132,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ alignItems: "center", display: "flex" }}>
              <img
                alt=""
                height={72}
                src={`data:image/png;base64,${markData}`}
                style={{ borderRadius: 36, height: 72, width: 72 }}
                width={72}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 18,
                  textTransform: "uppercase",
                }}
              >
                <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: "0.12em" }}>
                  Metal Bending
                </span>
                <span style={{ fontSize: 14, letterSpacing: "0.31em", marginTop: 3 }}>
                  Corporation
                </span>
              </div>
            </div>
            <span
              style={{
                border: "1px solid rgba(255,255,255,0.48)",
                fontSize: 13,
                letterSpacing: "0.16em",
                padding: "11px 15px",
                textTransform: "uppercase",
              }}
            >
              Anaheim · Since {company.established}
            </span>
          </div>

          <div style={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
              <span
                style={{
                  color: "#c5c9c4",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  marginBottom: 15,
                  textTransform: "uppercase",
                }}
              >
                {seo?.eyebrow ?? "Precision stretch forming"}
              </span>
              <span
                style={{
                  fontSize: 58,
                  fontWeight: 800,
                  letterSpacing: "-0.045em",
                  lineHeight: 0.96,
                  textTransform: "uppercase",
                }}
              >
                {seo?.title ?? "Precision stretch forming"}
              </span>
              <span
                style={{
                  color: "#d5d7d3",
                  fontSize: 20,
                  lineHeight: 1.35,
                  marginTop: 20,
                  maxWidth: 760,
                }}
              >
                {seo?.description}
              </span>
            </div>
            <div
              style={{
                alignItems: "flex-end",
                display: "flex",
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              <span style={{ background: "#f7f6f2", display: "flex", height: 2, width: 132 }} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  marginTop: 13,
                }}
              >
                METALBENDING.COM
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_IMAGE_SIZE,
    },
  );
}
