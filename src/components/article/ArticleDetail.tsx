import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Article } from '../../data/articleData';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import SEOHead from '../SEOHead';
import { useNavigate } from 'react-router-dom';

interface ArticleDetailProps {
  post: Article;
  onBackClick: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ post, onBackClick }) => {
  const navigate = useNavigate();

  if (!post) {
    return <div className="text-center py-20">Article not found</div>;
  }

  const canonical = `/articles/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.coverImage || post.image,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: new Date(post.timestamp).toISOString(),
    dateModified: new Date(post.timestamp).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://equinology.co.uk${canonical}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Equinology Digital Agency",
      logo: {
        "@type": "ImageObject",
        url: "https://equinology.co.uk/logo512.png",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-6xl w-full"
    >
      <SEOHead
        title={`${post.title} | Digital Insights`}
        description={post.summary}
        canonical={canonical}
        ogImage={post.coverImage || post.image}
        structuredData={structuredData}
        ogType="article"
      />

      <div className="mb-6">
        <button 
          onClick={onBackClick}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>
      </div>
      
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{post.title}</h1>
        <div className="text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
        {post.coverImage && (
          <div className="w-full relative overflow-hidden rounded-lg shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '600px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#0A0A0A]/80 to-transparent opacity-85"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3CAAFF]/10 via-[#00E0FF]/5 to-transparent mix-blend-overlay"></div>
          </div>
        )}
      </div>

      <div className="prose prose-lg max-w-none prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-6 text-white" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-5 text-[#3CAAFF]" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-4 text-white" {...props} />,
            p: ({ node, ...props }) => <p className="my-4 text-gray-300 md:text-lg" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 text-gray-300" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 text-gray-300" {...props} />,
            li: ({ node, ...props }) => <li className="my-2 text-gray-300" {...props} />,
            a: ({ node, href, ...props }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#3CAAFF] hover:text-[#00E0FF] transition-colors hover:underline" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-[#3CAAFF]/50 pl-4 italic my-4 text-gray-400" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8 rounded-lg border border-gray-700 shadow-lg">
                <table className="min-w-full divide-y divide-gray-700" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-800/50" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody className="divide-y divide-gray-700/50 bg-gray-900/50" {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr className="bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-200" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-6 py-4 text-left text-sm font-semibold text-white border-b border-gray-700/50" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-6 py-4 text-sm text-gray-300 border-b border-gray-700/50" {...props} />
            ),
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <pre className="bg-gray-900 rounded p-4 overflow-x-auto my-4 text-gray-300">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-900 text-gray-300 rounded px-1 py-0.5" {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-900 rounded p-4 overflow-x-auto my-4 text-gray-300" {...props} />
            ),
            img: ({ node, src, alt, ...props }) => (
              <img
                src={src}
                alt={alt}
                className="w-full h-auto rounded my-4 shadow-sm"
                {...props}
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interested in learning more about how we can help your business?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl">
              Contact us to discuss your digital needs and discover how we can create a tailored solution for your business.
            </p>
            <button 
              onClick={() => {
                navigate('/contact');
                setTimeout(() => window.scrollTo(0, 0), 100);
              }}
              className="inline-flex items-center px-8 py-3 rounded-full bg-blue-400 text-[#0A0A0A] font-medium text-lg hover:bg-blue-400/90 transition-colors duration-200 group"
            >
              Contact Us Now
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetail; 