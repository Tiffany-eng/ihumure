import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Wind,
  TrendingUp,
  Sparkles,
  Sun,
  BookOpen,
  Bot,
  LogOut,
  User,
  Calendar,
  Plus,
  Settings,
  Shield,
  Users,
  Clock
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/animated-skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  id: string;
  mood_level: number;
  mood_label: string | null;
  created_at: string;
}

interface GratitudeEntry {
  id: string;
  entry_text: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  event_type: string;
  location: string | null;
  max_attendees: number | null;
  image_url: string | null;
  created_at: string;
}

interface PendingEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  event_type: string;
  location: string;
  max_attendees: number;
  status: 'pending' | 'approved' | 'rejected';
  created_by: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ display_name: string | null } | null>(null);
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [recentGratitude, setRecentGratitude] = useState<GratitudeEntry[]>([]);
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '18:00',
    event_type: 'workshop',
    location: '',
    max_attendees: 50
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      setDataLoading(true);
      Promise.all([
        // Fetch profile
        supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .maybeSingle()
          .then(({ data }) => setProfile(data)),

        // Fetch recent moods
        supabase
          .from("mood_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)
          .then(({ data }) => setRecentMoods(data || [])),

        // Fetch recent gratitude entries
        supabase
          .from("gratitude_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3)
          .then(({ data }) => setRecentGratitude(data || [])),

        // Check if user is admin
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle()
          .then(({ data }) => {
            setIsAdmin(data?.role === 'admin');
          }),

        // Fetch pending events for admin
        supabase
          .from("events")
          .select("*")
          .eq("status", 'pending')
          .order("created_at", { ascending: false })
          .then(({ data }) => {
            const pendingData = data?.map(eventItem => ({
              ...eventItem,
              status: 'pending' as const,
              created_by: user.id,
              event_time: eventItem.event_time || '18:00'
            })) || [];
            setPendingEvents(pendingData);
          })
      ]).finally(() => setDataLoading(false));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleCreateEvent = async () => {
    if (!user || !newEvent.title.trim() || !newEvent.event_date) return;

    console.log("Creating event:", newEvent);

    try {
      const { data, error } = await supabase
        .from("events")
        .insert({
          title: newEvent.title.trim(),
          description: newEvent.description.trim(),
          event_date: newEvent.event_date,
          event_time: newEvent.event_time,
          event_type: newEvent.event_type,
          location: newEvent.location.trim(),
          max_attendees: newEvent.max_attendees,
          status: 'pending'
        })
        .select()
        .single();

      console.log("Event creation response:", { data, error });

      if (error) {
        console.error("Event creation error:", error);
        toast({
          title: "Error creating event",
          description: error.message || "Please try again.",
          variant: "destructive",
        });
      } else {
        console.log("Event created successfully:", data);
        toast({
          title: "Event submitted",
          description: "Your event has been submitted for approval.",
        });
        setNewEvent({
          title: '',
          description: '',
          event_date: '',
          event_time: '18:00',
          event_type: 'workshop',
          location: '',
          max_attendees: 50
        });
        setShowEventDialog(false);
      }
    } catch (err) {
      console.error("Unexpected error creating event:", err);
      toast({
        title: "Connection error",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = (action: any) => {
    if (action.action === 'createEvent') {
      setShowEventDialog(true);
    } else {
      navigate(action.href);
    }
  };

  if (authLoading || !user) {
    return (
      <PageLayout>
        <section className="py-20 bg-hero-gradient min-h-screen">
          <div className="container mx-auto px-4">
            <DashboardSkeleton />
          </div>
        </section>
      </PageLayout>
    );
  }

  const quickActions = [
    { name: "Join Chatroom", href: "/chatrooms", icon: MessageCircle, color: "bg-blue-50 text-blue-600" },
    { name: "Wellness", href: "/wellness", icon: Wind, color: "bg-teal-50 text-teal-600" },
    { name: "AI Assistant", href: "/ai-assistant", icon: Bot, color: "bg-amber-50 text-amber-600" },
    { name: "Resources", href: "/resources", icon: BookOpen, color: "bg-indigo-50 text-indigo-600" },
    { name: "Events", href: "/events", icon: Calendar, color: "bg-green-50 text-green-600" },
    { name: "Create Event", action: "createEvent", icon: Plus, color: "bg-purple-50 text-purple-600" },
  ];

  const adminActions = [
    { name: "Approve Events", count: pendingEvents.length, icon: Calendar, color: "bg-orange-50 text-orange-600" },
    { name: "Manage Users", icon: Users, color: "bg-red-50 text-red-600" },
    { name: "Moderation", icon: Shield, color: "bg-slate-50 text-slate-600" },
    { name: "Settings", icon: Settings, color: "bg-gray-50 text-gray-600" },
  ];

  const getMoodEmoji = (level: number) => {
    if (level <= 2) return "😢";
    if (level <= 4) return "😔";
    if (level <= 6) return "😐";
    if (level <= 8) return "😊";
    return "😄";
  };

  return (
    <PageLayout>
      <section className="py-20 bg-hero-gradient min-h-screen">
        {dataLoading ? (
          <div className="container mx-auto px-4">
            <DashboardSkeleton />
          </div>
        ) : (
          <div className="container mx-auto px-4">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Welcome back, {profile?.display_name || "Friend"}! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  How are you feeling today? Let's take care of your wellbeing.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleQuickAction(action)}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card shadow-card hover:shadow-hover transition-all hover:-translate-y-1 w-full"
                      >
                        <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{action.name}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Moods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Recent Moods
                  </h2>
                  <Link to="/wellness">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                {recentMoods.length > 0 ? (
                  <div className="space-y-3">
                    {recentMoods.map((mood) => (
                      <div key={mood.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="text-2xl">{getMoodEmoji(mood.mood_level)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{mood.mood_label || `Mood: ${mood.mood_level}/10`}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(mood.created_at!), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No mood entries yet</p>
                    <Link to="/wellness">
                      <Button variant="link" size="sm">Track your first mood</Button>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Recent Gratitude */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    Gratitude Journal
                  </h2>
                  <Link to="/wellness">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                {recentGratitude.length > 0 ? (
                  <div className="space-y-3">
                    {recentGratitude.map((entry) => (
                      <div key={entry.id} className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <p className="text-foreground">{entry.entry_text}</p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(entry.created_at!), "MMM d, h:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sun className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No gratitude entries yet</p>
                    <Link to="/wellness">
                      <Button variant="link" size="sm">Write your first entry</Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Daily Inspiration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-8 rounded-2xl bg-primary-gradient text-primary-foreground text-center"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <blockquote className="text-xl md:text-2xl font-medium italic max-w-2xl mx-auto">
                "Every day may not be good, but there is something good in every day."
              </blockquote>
              <p className="mt-4 opacity-80">— Alice Morse Earle</p>
            </motion.div>

            {/* Admin Panel */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    Admin Panel
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="gap-2"
                  >
                    {showAdminPanel ? "Hide" : "Show"} Admin
                  </Button>
                </div>

                {showAdminPanel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-card rounded-2xl shadow-card"
                  >
                    {adminActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.div
                          key={action.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all w-full">
                            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center relative`}>
                              <Icon className="w-6 h-6" />
                              {action.count !== undefined && (
                                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {action.count}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-foreground">{action.name}</span>
                          </button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </section>

      {/* Create Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Submit your event for approval. Events will be reviewed by administrators before being published.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Event Title</label>
              <Input
                placeholder="Enter event title..."
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe your event..."
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                maxLength={500}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Event Date</label>
                <Input
                  type="date"
                  value={newEvent.event_date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, event_date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Time</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={newEvent.event_time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, event_time: e.target.value }))}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEventDialog(false)}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Max Attendees</label>
              <Input
                type="number"
                placeholder="50"
                value={newEvent.max_attendees}
                onChange={(e) => setNewEvent(prev => ({ ...prev, max_attendees: parseInt(e.target.value) || 50 }))}
                min="1"
                max="1000"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Event location (online or physical address)"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Event Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newEvent.event_type}
                onChange={(e) => setNewEvent(prev => ({ ...prev, event_type: e.target.value }))}
              >
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="community">Community Event</option>
                <option value="support">Support Group</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent} disabled={!newEvent.title.trim() || !newEvent.event_date}>
              Submit for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
