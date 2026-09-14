import { v2 as cloudinary } from "cloudinary";

// Cloudinary automatically picks up process.env.CLOUDINARY_URL
cloudinary.config({
  secure: true,
});

/**
 * Appends Cloudinary auto-format, quality, and sizing transformations to a Cloudinary delivery URL.
 * Standard Cloudinary delivery URLs use path-based transformations after '/upload/':
 * Converts: https://res.cloudinary.com/.../image/upload/v12345/image.jpg
 * To:       https://res.cloudinary.com/.../image/upload/f_auto,q_auto,w_<width>/v12345/image.jpg
 *
 * Only transforms Cloudinary URLs; returns other URLs unchanged.
 *
 * @param {string} url - Cloudinary image URL
 * @param {Object} [options] - Transformation options
 * @param {number} [options.width] - Desired image width
 * @param {number|string} [options.quality] - Desired image quality
 * @returns {string} The optimized URL
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) {
    return url;
  }

  const transforms = ["f_auto", "q_auto"];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  const transformStr = transforms.join(",");

  // Cloudinary standard delivery URLs use path-based transformations after '/upload/'
  if (url.includes("/upload/")) {
    // Avoid re-applying if already transformed
    if (url.includes(`/upload/${transformStr}/`) || url.includes("/upload/f_auto")) {
      return url;
    }
    return url.replace("/upload/", `/upload/${transformStr}/`);
  }

  // Fallback for URLs without standard /upload/ segment
  const params = new URLSearchParams();
  params.set("f_auto", "auto");
  params.set("q_auto", "auto");
  if (options.width) params.set("w", String(options.width));

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${params.toString()}`;
}

export { cloudinary };
export default cloudinary;

