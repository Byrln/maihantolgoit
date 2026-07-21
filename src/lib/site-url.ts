const fallbackSiteUrl = "https://maikhantolgoi.com";

export function getSiteUrl() {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!rawValue) {
    return fallbackSiteUrl;
  }

  const withProtocol = /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

