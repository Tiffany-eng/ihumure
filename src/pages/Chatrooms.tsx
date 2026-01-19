import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Brain,
  CloudRain,
  Flame,
  Heart,
  Repeat,
  Zap,
  Utensils,
  Wine,
  HeartCrack,
  Battery,
  Focus,
  Users,
  Shield,
  MessageCircle,
} from "lucide-react";

const chatrooms = [
  { id: "anxiety", name: "Anxiety Support", icon: Zap, color: "text-amber-500", bgColor: "bg-amber-50", members: 234 },
  { id: "depression", name: "Depression Support", icon: CloudRain, color: "text-blue-500", bgColor: "bg-blue-50", members: 189 },
  { id: "ptsd", name: "PTSD & Trauma", icon: Flame, color: "text-red-500", bgColor: "bg-red-50", members: 156 },
  { id: "bipolar", name: "Bipolar Support", icon: Repeat, color: "text-purple-500", bgColor: "bg-purple-50", members: 98 },
  { id: "ocd", name: "OCD Support", icon: Brain, color: "text-teal-500", bgColor: "bg-teal-50", members: 87 },
  { id: "stress", name: "Stress & Overwhelm", icon: Heart, color: "text-rose-500", bgColor: "bg-rose-50", members: 312 },
  { id: "eating", name: "Eating Disorders", icon: Utensils, color: "text-orange-500", bgColor: "bg-orange-50", members: 76 },
  { id: "addiction", name: "Addiction Recovery", icon: Wine, color: "text-indigo-500", bgColor: "bg-indigo-50", members: 145 },
  { id: "grief", name: "Grief & Loss", icon: HeartCrack, color: "text-slate-500", bgColor: "bg-slate-50", members: 123 },
  { id: "burnout", name: "Burnout Recovery", icon: Battery, color: "text-yellow-600", bgColor: "bg-yellow-50", members: 201 },
  { id: "adhd", name: "ADHD Support", icon: Focus, color: "text-cyan-500", bgColor: "bg-cyan-50", members: 167 },
];

export default function Chatrooms() {
  return (
    <PageLayout>
      <section className="py-20 bg-hero-gradient min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Support Chatrooms
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join anonymous, moderated chatrooms to connect with others who understand 
              what you're going through. Share, listen, and heal together.
            </p>

            {/* Safe Space Notice */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-soft text-primary">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">
                All chatrooms are anonymous, moderated, and follow our community guidelines
              </span>
            </div>
          </motion.div>

          {/* Chatrooms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {chatrooms.map((room, index) => {
              const Icon = room.icon;
              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/chatroom/${room.id}`}
                    className={`block p-6 rounded-2xl ${room.bgColor} border border-transparent hover:border-border transition-all duration-300 hover:shadow-hover hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm">
                        <Icon className={`w-6 h-6 ${room.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {room.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{room.members} members</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="secondary" className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Join Chatroom
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Guidelines Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto mt-16 p-6 rounded-2xl bg-card shadow-card text-center"
          >
            <h3 className="font-semibold text-foreground mb-2">
              Community Guidelines
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our chatrooms are safe spaces. Please be respectful, avoid sharing personal 
              identifying information, and report any harmful content. If you are in crisis, 
              please contact emergency services.
            </p>
            <Link to="/contact">
              <Button variant="link" className="text-primary">
                View full guidelines and crisis resources
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
