import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Article } from '../../data/articleData';
import TimeAgo from 'react-timeago';
import ViewToggle from './ViewToggle';

interface ArticleListProps {
  posts: Article[];
  isGridView: boolean;
  onViewToggle: () => void;
}

const listAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Custom formatter for TimeAgo
const timeAgoFormatter = (value: number, unit: string, suffix: string) => {
  if (unit === 'week' && value >= 4) {
    const months = Math.floor(value / 4);
    return `${months} month${months !== 1 ? 's' : ''} ${suffix}`;
  }
  if (unit === 'day' && value >= 30) {
    const months = Math.floor(value / 30);
    return `${months} month${months !== 1 ? 's' : ''} ${suffix}`;
  }
  // Add other conditions if needed, e.g., for years
  if (unit === 'month' && value >= 12) {
    const years = Math.floor(value / 12);
    return `${years} year${years !== 1 ? 's' : ''} ${suffix}`;
  }
  return `${value} ${unit}${value !== 1 ? 's' : ''} ${suffix}`;
};

const ArticleList: React.FC<ArticleListProps> = ({ posts, isGridView, onViewToggle }) => {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <ViewToggle isGridView={isGridView} onToggle={onViewToggle} />
      </div>
      
      <motion.div
        key={isGridView ? "article-list-grid" : "article-list-list"}
        variants={listAnimation}
        initial="initial"
        animate="animate"
        className={isGridView 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          : "space-y-6"
        }
      >
        {posts.map((post) => (
          <motion.div 
            key={post.id} 
            variants={itemAnimation} 
            className={isGridView ? "h-full" : ""}
          >
            <Link 
              to={`/articles/${post.slug}`} 
              className={`block group bg-gradient-to-br from-[#121212] to-[#0A0A0A] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#3CAAFF]/20 hover:scale-[1.02] border border-gray-800/30 ${
                isGridView ? "h-full flex flex-col" : "flex flex-col md:flex-row"
              }`}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${
                isGridView 
                  ? "h-48 sm:h-56 md:h-64" 
                  : "h-48 md:h-40 md:w-64 flex-shrink-0"
              }`}>
                <img
                  src={post.coverImage || post.image}
                  alt={`${post.title} - Article Summary`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#0A0A0A]/80 to-transparent opacity-85"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#3CAAFF]/10 via-[#00E0FF]/5 to-transparent mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                  <p className="text-[#3CAAFF] text-xs uppercase tracking-wider font-medium bg-black/40 px-3 py-1 rounded-full inline-block">
                    <TimeAgo date={post.timestamp} formatter={timeAgoFormatter} />
                  </p>
                  {post.readTime && (
                    <p className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full inline-flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime} min read
                    </p>
                  )}
                </div>
              </div>
              
              {/* Content Container */}
              <div className={`p-6 flex flex-col ${
                isGridView ? "flex-grow" : "md:flex-grow"
              }`}>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-[#3CAAFF] transition-colors duration-300 leading-snug">{post.title}</h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 flex-grow leading-relaxed">{post.summary}</p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex justify-end items-center">
                    <p className="text-[#3CAAFF] flex items-center text-sm font-medium">
                      Read article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArticleList; 