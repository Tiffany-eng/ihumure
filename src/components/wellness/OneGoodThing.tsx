import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Heart, Star, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GratitudeEntry {
  id: string;
  text: string;
  timestamp: Date;
}

const kindMessages = [
  "What a beautiful thought!",
  "That's wonderful!",
  "How lovely!",
  "Such a great moment!",
  "That made me smile!",
  "What a gift!",
  "Cherish this moment!",
  "How special!",
];

const floatingIcons = [Sparkles, Heart, Star, Sun];

export function OneGoodThing() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; icon: number }>>([]);

  const addEntry = useCallback(() => {
    if (!inputValue.trim()) return;

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setInputValue("");

    // Show kind message
    const randomMessage = kindMessages[Math.floor(Math.random() * kindMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);

    // Create floating elements
    const newFloating = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      icon: Math.floor(Math.random() * floatingIcons.length),
    }));
    setFloatingElements(newFloating);

    setTimeout(() => {
      setShowMessage(false);
      setFloatingElements([]);
    }, 3000);
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center p-8 min-h-[400px]">
      {/* Floating animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        <AnimatePresence>
          {floatingElements.map((el) => {
            const Icon = floatingIcons[el.icon];
            return (
              <motion.div
                key={el.id}
                initial={{ y: "100vh", x: `${el.x}vw`, opacity: 1 }}
                animate={{ y: "-20vh", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute text-wellness-gratitude"
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Kind message popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-wellness-gratitude text-white font-semibold text-lg shadow-lg"
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wellness-gratitude-soft mb-4">
          <Sun className="w-8 h-8 text-wellness-gratitude" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          One Good Thing
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          What small positive moment happened today? 
          Capture it and watch it bloom!
        </p>
      </div>

      {/* Input */}
      <div className="w-full max-w-md flex gap-2 mb-8">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEntry()}
          placeholder="Something that made me smile..."
          className="flex-1"
          maxLength={200}
        />
        <Button onClick={addEntry} disabled={!inputValue.trim()}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Entries as floating bubbles */}
      {entries.length > 0 && (
        <div className="w-full max-w-lg">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Your moments of gratitude
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <AnimatePresence>
              {entries.slice(0, 10).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-wellness-gratitude-soft border border-wellness-gratitude/20 text-sm text-foreground"
                >
                  {entry.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          Your grateful moments will appear here...
        </p>
      )}
    </div>
  );
}
