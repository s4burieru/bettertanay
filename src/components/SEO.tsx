import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  /** ISO 639-1 language code (e.g. 'en', 'fil') */
  lang?: string;
  /** Alternate language versions for hreflang */
  alternates?: { lang: string; url: string }[];
  /** JSON-LD structured data objects to embed */
  jsonLd?: Record<string, unknown>[];
  /** Published date (ISO string) — for article type pages */
  publishedTime?: string;
  /** Modified date (ISO string) */
  modifiedTime?: string;
  /** Author name(s) */
  author?: string;
  /** Twitter card type: summary, summary_large_image, etc. */
  twitterCard?: string;
  /** Article section / category */
  section?: string;
  /** No index this page */
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = import.meta.env.VITE_GOVERNMENT_NAME || 'Municipality of Tanay',
  lang = 'en',
  alternates,
  jsonLd,
  publishedTime,
  modifiedTime,
  author,
  twitterCard = 'summary_large_image',
  section,
  noIndex,
}: SEOProps) {
  const defaultTitle = `${siteName} | Official Community Portal`;
  const defaultDescription =
    import.meta.env.VITE_SITE_DESCRIPTION ||
    `Official community portal of ${siteName}, Rizal. Access local government services, tourism information, public documents, and community resources.`;
  const defaultKeywords =
    import.meta.env.VITE_SITE_KEYWORDS ||
    'Tanay, Rizal, Tanay Rizal, local government, LGU Tanay, municipal services, Tanay tourism, Rizal province, public information, BetterTanay, transparency portal, barangay Tanay';

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;
  const fullUrl =
    url || import.meta.env.VITE_WEBSITE_URL || 'https://bettertanay.org';
  const fullImage =
    image || import.meta.env.VITE_OG_IMAGE_URL || `${fullUrl}/og-image.jpg`;
  const fullImageAlt = `${fullTitle} — ${siteName}`;
  const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || '';

  // ── WebSite base schema (injected on every page) ──────────────────────
  const websiteSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: fullUrl,
    description: defaultDescription,
    inLanguage: lang,
    publisher: {
      '@type': 'GovernmentOrganization',
      name: siteName,
      url: fullUrl,
    },
  };

  // ── BreadcrumbList schema ────────────────────────────────────────────
  const breadcrumbSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    name: `${fullTitle} breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: fullUrl },
    ],
  };
  if (title && title !== siteName) {
    (breadcrumbSchema.itemListElement as Record<string, unknown>[]).push({
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: fullUrl,
    });
  }

  // ── Organization / LocalGovernment schema ────────────────────────────
  const govSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: siteName,
    url: fullUrl,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tanay',
      addressRegion: 'Rizal',
      addressCountry: 'PH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: import.meta.env.VITE_CONTACT_PHONE || '(02) 8924-7174',
      email: import.meta.env.VITE_CONTACT_EMAIL || 'contacts@tanay.gov.ph',
      contactType: 'general',
    },
    sameAs: [
      import.meta.env.VITE_FACEBOOK_URL,
      import.meta.env.VITE_TWITTER_URL,
      import.meta.env.VITE_YOUTUBE_URL,
    ].filter(Boolean),
  };

  // ── Article schema (for article-type pages) ──────────────────────────
  const articleSchema: Record<string, unknown> | null =
    type === 'article' && publishedTime
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: fullTitle,
          description: fullDescription,
          image: fullImage,
          author: author
            ? { '@type': 'Person', name: author }
            : { '@type': 'Organization', name: siteName },
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          publisher: {
            '@type': 'GovernmentOrganization',
            name: siteName,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
          },
        }
      : null;

  // Combine all schema objects
  const allSchema: Record<string, unknown>[] = [
    websiteSchema,
    breadcrumbSchema,
    govSchema,
    ...(articleSchema ? [articleSchema] : []),
    ...(jsonLd || []),
  ];

  // ── hreflang alternates ──────────────────────────────────────────────
  const hreflangs = alternates || [
    { lang: 'en', url: fullUrl },
    { lang: 'fil', url: fullUrl.replace(/\/$/, '') + '?lang=fil' },
  ];

  return (
    <Helmet>
      {/* ── Title ───────────────────────────────────────────────────── */}
      <title>{fullTitle}</title>

      {/* ── Basic Meta ──────────────────────────────────────────────── */}
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={siteName} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
      )}
      <meta name="language" content={lang} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="origin-when-cross-origin" />

      {/* ── Mobile / App Meta ───────────────────────────────────────── */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#003087" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="format-detection" content="telephone=yes" />

      {/* ── Open Graph / Facebook ───────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={fullImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta
        property="og:locale"
        content={lang === 'fil' ? 'fil_PH' : 'en_US'}
      />
      {section && <meta property="og:article:section" content={section} />}
      {author && <meta property="og:article:author" content={author} />}
      {publishedTime && (
        <meta property="og:article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="og:article:modified_time" content={modifiedTime} />
      )}

      {/* ── Twitter ─────────────────────────────────────────────────── */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullImageAlt} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {author && <meta name="twitter:creator" content={author} />}

      {/* ── Canonical URL ───────────────────────────────────────────── */}
      <link rel="canonical" href={fullUrl} />

      {/* ── hreflang alternate language tags ────────────────────────── */}
      {hreflangs.map(alt => (
        <link
          key={alt.lang}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.url}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* ── JSON-LD Structured Data ─────────────────────────────────── */}
      {allSchema.map((schema, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* ── Favicon ─────────────────────────────────────────────────── */}
      <link rel="icon" type="image/svg+xml" href="/bettertanay-logo-icon.png" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/bettertanay-logo-icon.png" color="#003087" />

      {/* ── Preconnect to external domains ──────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
}
