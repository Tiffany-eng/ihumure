import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Using a reliable royalty-free ambient sound
const AMBIENT_AUDIO_URL = "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(AMBIENT_AUDIO_URL);
    audio.loop = true;
    audio.volume = volume / 100;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setIsLoading(false);
      setError(null);
    });

    audio.addEventListener("error", () => {
      setError("Unable to load audio. Please try again later.");
      setIsLoading(false);
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setError(null);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (err) {
        setError("Could not play audio. Click to try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wellness-audio-soft mb-4">
          <Volume2 className="w-8 h-8 text-wellness-audio" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Ambient Sounds
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Calming background music for relaxation and focus
        </p>
      </div>

      {/* Visualizer / Play Button */}
      <div
        className="relative mb-8 cursor-pointer"
        onClick={togglePlay}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-32 h-32 rounded-full bg-wellness-audio/30"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 w-32 h-32 rounded-full bg-wellness-audio/20"
            />
          </>
        )}

        {/* Main button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-wellness-audio to-wellness-audio/70 shadow-lg flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white ml-2" />
          )}
        </motion.div>
      </div>

      {/* Volume Control */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showVolume || isPlaying ? 1 : 0, 
          height: showVolume || isPlaying ? "auto" : 0 
        }}
        className="w-full max-w-xs mb-6"
      >
        <div className="flex items-center gap-4">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={(values) => setVolume(values[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-8">{volume}%</span>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive mb-4">{error}</p>
      )}

      {/* Status */}
      <p className="text-sm text-muted-foreground">
        {isPlaying ? "Now playing: Serene View" : "Click to play ambient sounds"}
      </p>
    </div>
  );
}
