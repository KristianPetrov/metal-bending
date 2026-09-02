import { createSocialImage } from "@/lib/social-image";

export const alt = "Metal Bending Corporation precision stretch forming services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return createSocialImage(slug);
}
