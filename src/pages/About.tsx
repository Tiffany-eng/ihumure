import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Heart, Target, Eye, Users, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach mental health with empathy, understanding that everyone's journey is unique.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "We prioritize creating safe, anonymous spaces where people can share without judgment.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of peer support and shared experiences in healing.",
  },
  {
    icon: Award,
    title: "Accessibility",
    description: "Mental health resources should be available to everyone, regardless of circumstances.",
  },
];

const team = [
  { name: "Dr. Marie Uwimana", role: "Founder & Clinical Director", initial: "M", bio: "Psychiatrist with 15+ years experience in trauma-informed care and community mental health." },
  { name: "Jean-Pierre Habimana", role: "Co-Founder & Technology Lead", initial: "J", bio: "Tech entrepreneur passionate about using technology to improve mental health accessibility." },
];

export default function About() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Ihumure
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ihumure means "comfort" in Kinyarwanda. We are on a mission to make 
              mental health support accessible, stigma-free, and community-driven for all Rwandans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-primary-soft"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                To provide a safe, anonymous platform where Rwandans can access mental 
                health information, connect with peer support communities, and find 
                resources to support their wellbeing journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-secondary"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-secondary-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground">
                A Rwanda where mental health is prioritized, stigma is eliminated, 
                and everyone has access to the support they need to thrive mentally 
                and emotionally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card shadow-card text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card shadow-card"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{member.initial}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguarding */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Safeguarding & Privacy
            </h2>
            <p className="text-muted-foreground mb-6">
              Your safety is our priority. All conversations are anonymous, we do not 
              collect identifying information, and our platform is moderated to ensure 
              a supportive environment for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/privacy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline">Terms of Service</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Whether you need support or want to support others, there's a place for you at Ihumure.
          </p>
          <Link to="/chatrooms">
            <Button size="lg" variant="secondary">
              Explore Chatrooms
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
