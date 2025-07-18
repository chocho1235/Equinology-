import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
  current: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'Home',
      path: '/',
      current: pathnames.length === 0,
    },
  ];

  // Build breadcrumb items based on current path
  let currentPath = '';
  pathnames.forEach((name, index) => {
    currentPath += `/${name}`;
    
    // Convert path to readable name
    const readableName = name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbItems.push({
      name: readableName,
      path: currentPath,
      current: index === pathnames.length - 1,
    });
  });

  // Don't show breadcrumb on home page
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-[#0A0A0A]/50 backdrop-blur-sm border-b border-[#3CAAFF]/10" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-3">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-[#3CAAFF]/50 mx-2" />
              )}
              
              {item.current ? (
                <span className="text-sm font-medium text-[#3CAAFF]">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-sm text-[#B8BCC4] hover:text-white transition-colors duration-200"
                >
                  {index === 0 ? (
                    <Home className="w-4 h-4 mr-1" />
                  ) : null}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 