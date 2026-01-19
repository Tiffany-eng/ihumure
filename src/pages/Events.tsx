import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventCardSkeleton } from "@/components/ui/animated-skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  ArrowRight,
  Heart,
  Sparkles,
  Star,
  Check,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string;
  location: string | null;
  max_attendees: number | null;
  image_url: string | null;
  created_at: string;
  registrations_count?: number;
  is_registered?: boolean;
}

const eventTypeColors: Record<string, string> = {
  workshop: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  webinar: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  session: "bg-green-500/10 text-green-600 border-green-500/20",
  support: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

const eventTypeLabels: Record<string, string> = {
  workshop: "Workshop",
  webinar: "Webinar",
  session: "Session",
  support: "Support Group",
};

// Animated calendar icon
const AnimatedCalendarIcon = () => (
  <motion.div
    animate={{ 
      y: [0, -3, 0],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <Calendar className="w-6 h-6" />
  </motion.div>
);

// Floating decorative element
const FloatingIcon = ({ Icon, className, delay = 0 }: { Icon: React.ElementType; className: string; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 5, repeat: Infinity, delay }}
    className={className}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (eventsError) throw eventsError;

      // If user is logged in, fetch their registrations
      let userRegistrations: string[] = [];
      if (user) {
        const { data: regData } = await supabase
          .from('event_registrations')
          .select('event_id')
          .eq('user_id', user.id);
        
        userRegistrations = regData?.map(r => r.event_id) || [];
      }

      // Add registration status to events
      const eventsWithStatus = eventsData?.map(event => ({
        ...event,
        is_registered: userRegistrations.includes(event.id),
      })) || [];

      setEvents(eventsWithStatus);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (event: Event) => {
    if (!user) {
      toast.error('Please sign in to register for events');
      return;
    }
    setSelectedEvent(event);
    setShowConfirmDialog(true);
  };

  const handleConfirmRegistration = async () => {
    if (!selectedEvent || !user) return;

    setRegistering(true);
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: selectedEvent.id,
          user_id: user.id,
        });

      if (error) throw error;

      setShowConfirmDialog(false);
      setShowSuccessDialog(true);
      
      // Update local state
      setEvents(prev => prev.map(e => 
        e.id === selectedEvent.id ? { ...e, is_registered: true } : e
      ));
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === '23505') {
        toast.error('You are already registered for this event');
      } else {
        toast.error('Failed to register. Please try again.');
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async (eventId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Registration cancelled');
      
      // Update local state
      setEvents(prev => prev.map(e => 
        e.id === eventId ? { ...e, is_registered: false } : e
      ));
    } catch (error) {
      console.error('Cancel error:', error);
      toast.error('Failed to cancel registration');
    }
  };

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.event_type === filter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-hero-gradient overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-accent/20 blur-3xl"
          />
          <FloatingIcon Icon={Heart} className="absolute top-32 right-[15%] text-primary/20" />
          <FloatingIcon Icon={Sparkles} className="absolute bottom-40 left-[10%] text-accent/30" delay={1} />
          <FloatingIcon Icon={Star} className="absolute top-[50%] right-[8%] text-secondary/30" delay={2} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6"
            >
              <AnimatedCalendarIcon />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Upcoming Events &{" "}
              <span className="text-gradient-primary">Workshops</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Join our community events, workshops, and support groups designed to help you 
              learn, grow, and connect with others on their mental wellness journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {["all", "workshop", "webinar", "session", "support"].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={filter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className="capitalize"
                >
                  {type === "all" ? "All Events" : eventTypeLabels[type] || type}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-2xl bg-card shadow-card overflow-hidden ${
                    event.is_registered ? "ring-2 ring-green-500/30" : ""
                  }`}
                >
                  {event.is_registered && (
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      className="absolute top-4 left-0 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-r-full flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Registered
                    </motion.div>
                  )}

                  <div className="p-6">
                    {/* Event type badge */}
                    <div className="flex items-start justify-between mb-4">
                      <Badge 
                        variant="outline" 
                        className={`${eventTypeColors[event.event_type] || eventTypeColors.workshop} border`}
                      >
                        {eventTypeLabels[event.event_type] || event.event_type}
                      </Badge>
                      {event.location?.toLowerCase().includes('virtual') && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Video className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </div>

                    {/* Title and description */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{formatTime(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location || 'TBA'}</span>
                      </div>
                      {event.max_attendees && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-primary" />
                          <span>Max {event.max_attendees} attendees</span>
                        </div>
                      )}
                    </div>

                    {/* Register/Cancel button */}
                    {event.is_registered ? (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full gap-2 border-red-500/30 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleCancelRegistration(event.id)}
                        >
                          <X className="w-4 h-4" />
                          Cancel Registration
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full gap-2"
                          onClick={() => handleRegisterClick(event)}
                        >
                          Register Now
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">
                There are no {filter !== "all" ? eventTypeLabels[filter]?.toLowerCase() + "s" : "events"} scheduled at the moment.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-muted-foreground mb-6">
              Are you a mental health professional or organization interested in hosting 
              a workshop or event with our community? We'd love to hear from you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You're about to register for:
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="py-4">
              <h4 className="font-semibold text-foreground mb-2">{selectedEvent.title}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedEvent.event_date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatTime(selectedEvent.event_date)}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedEvent.location}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRegistration} disabled={registering}>
              {registering ? "Registering..." : "Confirm Registration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
          >
            <Check className="w-8 h-8 text-green-500" />
          </motion.div>
          <DialogHeader>
            <DialogTitle className="text-center">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center">
              You've been registered for <strong>{selectedEvent?.title}</strong>. 
              We'll send you a reminder before the event.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
