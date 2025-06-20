import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { articles, findArticleBySlug, Article } from '../data/articleData'; // Updated import
import ArticleList from '../components/article/ArticleList';
import ArticleDetail from '../components/article/ArticleDetail';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { ArrowRight } from 'lucide-react';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);
  const [isGridView, setIsGridView] = useState(() => {
    // Default to grid view, but check localStorage if preference exists
    const savedPreference = localStorage.getItem('articleViewPreference');
    return savedPreference ? savedPreference === 'grid' : true;
  });

  // Scroll to top whenever component mounts or location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Find the post based on slug when the component mounts or slug changes
  useEffect(() => {
    if (slug) {
      const post = findArticleBySlug(slug);
      setSelectedPost(post || null);
      // Optional: If slug is invalid, maybe redirect to /articles
      // if (!post) navigate('/articles'); 
    } else {
      setSelectedPost(null); // Ensure we show the list on /articles
    }
  }, [slug]);

  // Handler to navigate back to the list view
  const handleBackClick = () => {
    if (location.pathname.includes('/articles/')) {
      navigate('/articles');
    } else {
      navigate('/');
    }
  };

  // Handler to toggle between grid and list views
  const handleViewToggle = () => {
    const newView = !isGridView;
    setIsGridView(newView);
    localStorage.setItem('articleViewPreference', newView ? 'grid' : 'list');
  };

  // Determine which view to show
  const showSinglePost = slug && selectedPost;

  return (
    <div className="pt-20 md:pt-24 pb-20 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* --- Single Post View --- */}
        {showSinglePost && selectedPost && (
          <ArticleDetail post={selectedPost} onBackClick={handleBackClick} />
        )}

        {/* --- Articles List View Title --- */}
        {!showSinglePost && (
          <motion.div
            key="articles-list-title"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* Set Helmet for the main articles page */}
            <Helmet>
              <title>Digital Insights | Articles</title>
              <meta name="description" content="Expert articles on web design, digital marketing, branding, and software development. Read our latest insights on digital innovation and business growth." />
            </Helmet>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] mb-4 px-2 pb-1 overflow-visible">
              Digital Insights
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Expert articles on digital innovation, web design, and business growth.
            </p>
          </motion.div>
        )}

        {/* --- Articles List Grid --- */}
        {!showSinglePost && (
          <div className="w-full px-2 sm:px-0">
            <ArticleList 
              posts={articles} 
              isGridView={isGridView}
              onViewToggle={handleViewToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage; 