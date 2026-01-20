import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Wellness from "./pages/Wellness";
import Conditions from "./pages/Conditions";
import Chatrooms from "./pages/Chatrooms";
import ChatRoom from "./pages/ChatRoom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import AIAssistant from "./pages/AIAssistant";
import Events from "./pages/Events";
import ShareStory from "./pages/ShareStory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/chatrooms" element={<Chatrooms />} />
            <Route path="/chatroom/:roomId" element={<ChatRoom />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/share-story" element={<ShareStory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
