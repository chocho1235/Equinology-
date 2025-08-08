import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  showCustomControls?: boolean;
  preferNativeOnMobile?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = '',
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  showCustomControls = false,
  preferNativeOnMobile = true,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onError,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [videoPoster, setVideoPoster] = useState<string | undefined>(poster);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getMimeType = (url: string): string | undefined => {
    const lower = url.split('?')[0].toLowerCase();
    if (lower.endsWith('.mp4')) return 'video/mp4';
    if (lower.endsWith('.mov')) return 'video/quicktime';
    if (lower.endsWith('.webm')) return 'video/webm';
    return undefined;
  };

  const captureFirstFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const dataURL = canvas.toDataURL('image/jpeg', 0.8);
          setVideoPoster(dataURL);
        } catch (_err) {
          // ignore capture errors
        }
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      if (!poster) {
        // Ensure we are at the beginning then capture after a tick
        videoRef.current.currentTime = 0;
        setTimeout(captureFirstFrame, 120);
      }
    }
    setIsReady(true);
    setHasError(false);
    onReady?.();
  };

  const handleError = (error: any) => {
    setHasError(true);
    setIsReady(false);
    onError?.(error);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !seeking) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value) * duration;
    setCurrentTime(newTime);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (videoRef.current) {
      const newTime = parseFloat(e.currentTarget.value) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // If play is blocked, ensure native controls are visible on mobile
          });
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const played = duration > 0 ? currentTime / duration : 0;

  const useNativeControls = (preferNativeOnMobile && isMobile && controls) || (!showCustomControls && controls);

  return (
    <div 
      ref={containerRef}
      className={`relative video-player-container ${className}`}
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        onClick={togglePlay}
        onTouchEnd={togglePlay}
        src={src}
        poster={videoPoster}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        controls={useNativeControls}
        preload="metadata"
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        style={{ 
          objectFit: 'contain', 
          width: '100%', 
          height: '100%',
          objectPosition: 'center'
        }}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={onEnded}
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
      >
        {/* Provide a typed source for better mobile compatibility */}
        {getMimeType(src) && (
          <source src={src} type={getMimeType(src)} />
        )}
        Your browser does not support the video tag.
      </video>
      
      {/* Hidden canvas for capturing video frames */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {showCustomControls && !useNativeControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4"
        >
          {/* Progress Bar */}
          <div className="mb-2 sm:mb-3">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeek}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1 sm:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3CAAFF 0%, #3CAAFF ${played * 100}%, #4B5563 ${played * 100}%, #4B5563 100%)`
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4" /> : <Play size={14} className="sm:w-4 sm:h-4" />}
              </motion.button>

              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isMuted ? <VolumeX size={14} className="sm:w-4 sm:h-4" /> : <Volume2 size={14} className="sm:w-4 sm:h-4" />}
              </motion.button>

              <span className="text-white text-xs sm:text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <motion.button
              onClick={toggleFullscreen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              {isFullscreen ? <Minimize size={14} className="sm:w-4 sm:h-4" /> : <Maximize size={14} className="sm:w-4 sm:h-4" />}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoPlayer; 