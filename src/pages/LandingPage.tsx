import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-centre justify-centre p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Card Preview Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[1200/630] relative">
          <img
            src="/ChatGPT Image Jun 20, 2025, 01_54_47 PM-optimized (1).svg?v=1"
            alt="Equinology Digital Agency"
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Welcome Video */}
        <div className="w-full aspect-[16/9] relative">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#10131A] p-4 border border-[#3CAAFF]/10 shadow-xl">
            <VideoPlayer
              src="/Sequence 01_1.mp4"
              poster="/lane edited xlol 2.jpg"
              className="w-full h-full rounded-xl"
              autoPlay={false}
              muted={true}
              loop={true}
              controls={true}
              showCustomControls={true}
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#3CAAFF]/20 rounded-full blur-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#00E0FF]/20 rounded-full blur-lg"></div>
          </div>
        </div>

        {/* Bio Text */}
        <div className="text-centre px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Equinology Digital Agency
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A Digital Agency for all businesses, specialising in web design and software engineering
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-centre gap-3 sm:gap-6 mt-6 sm:mt-8 px-2 sm:px-0">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-centre font-medium"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-centre font-medium"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-centre font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 