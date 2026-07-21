export const mediaAccept = "image/*,video/mp4,video/quicktime,video/webm,video/x-m4v";

const videoExtensions = [".mp4", ".mov", ".webm", ".m4v"];

export function isVideoUrl(url?: string | null) {
  if (!url) {
    return false;
  }

  const cleanUrl = url.split(/[?#]/)[0]?.toLowerCase() || "";

  return videoExtensions.some((extension) => cleanUrl.endsWith(extension));
}

