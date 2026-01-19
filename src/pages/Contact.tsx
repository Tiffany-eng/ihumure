import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, AlertTriangle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const crisisContacts = [
  { name: "Rwanda National Police", phone: "112", description: "Emergency services" },
  { name: "Ndera Hospital", phone: "+250 788 304 432", description: "Mental health services" },
  { name: "Solid Minds", phone: "+250 788 456 789", description: "Mental health organization" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <PageLayout>
      <section className="py-20 bg-hero-gradient min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Reach out through any of the channels below.
            </p>
          </motion.div>

          {/* Crisis Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-destructive/10 border border-destructive/20"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-semibold text-foreground mb-2">
                  In Crisis? Get Help Now
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  If you or someone you know is in immediate danger, please contact emergency services 
                  or one of the crisis resources below.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {crisisContacts.map((contact) => (
                    <div key={contact.name} className="p-3 rounded-lg bg-background">
                      <p className="font-medium text-foreground text-sm">{contact.name}</p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-primary font-semibold hover:underline"
                      >
                        {contact.phone}
                      </a>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-8 rounded-2xl bg-card shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-card shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:support@ihumure.rw"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">support@ihumure.rw</p>
                    </div>
                  </a>
                  <a
                    href="tel:+250788000000"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">+250 788 000 000</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary-soft">
                <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our chatrooms are available 24/7. For direct support:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                  <li>Saturday: 9:00 AM - 1:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
