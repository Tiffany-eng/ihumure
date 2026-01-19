import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Heart, 
  Brain, 
  Shield, 
  Loader2,
  RefreshCw,
  MessageCircle,
  Lightbulb,
  Smile,
  ChevronDown
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  { icon: Brain, text: "I'm feeling anxious lately", color: "bg-amber-50 text-amber-600" },
  { icon: Heart, text: "Help me cope with stress", color: "bg-rose-50 text-rose-600" },
  { icon: Lightbulb, text: "Teach me a breathing technique", color: "bg-teal-50 text-teal-600" },
  { icon: Smile, text: "I need some encouragement", color: "bg-purple-50 text-purple-600" },
];

const floatingIcons = [
  { Icon: Heart, delay: 0, x: "10%", y: "20%" },
  { Icon: Brain, delay: 0.5, x: "85%", y: "15%" },
  { Icon: Sparkles, delay: 1, x: "15%", y: "70%" },
  { Icon: Shield, delay: 1.5, x: "80%", y: "65%" },
  { Icon: MessageCircle, delay: 2, x: "50%", y: "10%" },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setShowWelcome(false);

    try {
      await streamChat([...messages, userMsg]);
    } catch (error) {
      toast({
        title: "Connection issue",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      // Remove the user message if failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  return (
    <PageLayout>
      <section className="min-h-screen bg-hero-gradient relative overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10 h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-gradient shadow-glow mb-4"
              animate={{ 
                boxShadow: [
                  "0 0 40px hsl(168 50% 50% / 0.2)",
                  "0 0 60px hsl(168 50% 50% / 0.4)",
                  "0 0 40px hsl(168 50% 50% / 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Ihumure AI Assistant
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your compassionate companion for mental wellness support
            </p>
          </motion.div>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              <AnimatePresence mode="wait">
                {showWelcome && messages.length === 0 ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-16 h-16 text-primary mb-6" />
                    </motion.div>
                    
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Hello! How can I support you today?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                      I'm here to listen, offer coping strategies, and help you feel better.
                    </p>

                    {/* Suggested Prompts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                      {suggestedPrompts.map((prompt, index) => {
                        const Icon = prompt.icon;
                        return (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => sendMessage(prompt.text)}
                            className={`flex items-center gap-3 p-4 rounded-xl ${prompt.color} hover:shadow-hover transition-all hover:-translate-y-1 text-left`}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className="text-sm font-medium">{prompt.text}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.div
                      className="mt-8 flex items-center gap-2 text-muted-foreground"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronDown className="w-5 h-5" />
                      <span className="text-sm">Or type your message below</span>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="messages"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                          <motion.div
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              msg.role === "user" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-primary-soft text-primary"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </motion.div>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-md"
                                : "bg-muted rounded-tl-md"
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div className="px-4 py-3 rounded-2xl bg-muted rounded-tl-md">
                            <motion.div
                              className="flex gap-1"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <span className="w-2 h-2 rounded-full bg-primary/60" />
                              <span className="w-2 h-2 rounded-full bg-primary/60" />
                              <span className="w-2 h-2 rounded-full bg-primary/60" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-border p-4"
            >
              <div className="flex items-end gap-3">
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetChat}
                    className="shrink-0"
                    title="Start new conversation"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Share what's on your mind..."
                    className="min-h-[52px] max-h-32 resize-none pr-12"
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 bottom-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                <Shield className="w-3 h-3 inline mr-1" />
                Your conversations are private. In crisis? Call <span className="font-medium">114</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
