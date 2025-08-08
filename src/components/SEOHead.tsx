import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Equine Web Design UK | Equestrian & Agricultural Websites | Equinology',
  description = 'British equine web design for equestrian and rural businesses. Specialising in fast, accessible websites that convert, crafted in the UK.',
  keywords = 'equine web design, equestrian web design, equine website designer UK, equestrian websites UK, rural business web design, agricultural web design, British web design, accessible web design, SEO for equestrian businesses',
  canonical = 'https://equinology.co.uk',
  ogImage = 'https://equinology.co.uk/cardpreview-optimised.png',
  ogType = 'website',
  structuredData,
  noIndex = false,
}) => {
  const baseUrl = 'https://equinology.co.uk';
  const fullCanonical = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Equinology Digital Agency" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://equinology.co.uk"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 