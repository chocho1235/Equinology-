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
  title = 'Web Design UK | Affordable Web Design Services | Equestrian & Business Websites',
  description = 'Professional web design services across the UK. Specialising in equestrian, agricultural, and business websites. Affordable web design from £299. Expert web developers in the UK.',
  keywords = 'web design UK, cheap web design, affordable web design, equestrian web design, agricultural web design, horses for sale website, business website design, web development UK, website designer, local web design, professional web design, responsive web design, e-commerce website, WordPress web design, custom website design, small business website, UK web designer, web design services, website development, digital agency UK',
  canonical = 'https://equinology.co.uk',
  ogImage = 'https://equinology.co.uk/cardpreview.png',
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