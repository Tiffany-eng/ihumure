import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Finding Ihumure was a turning point for me. The anonymous chatrooms helped me open up about my struggles without fear of judgment.",
    author: "Anonymous",
    role: "Community Member",
    rating: 5,
  },
  {
    quote:
      "The breathing exercises and wellness activities have become part of my daily routine. They help me manage my anxiety in ways I never thought possible.",
    author: "Anonymous",
    role: "Community Member",
    rating: 5,
  },
  {
    quote:
      "Knowing that others understand what I'm going through has given me hope. This community reminds me every day that I'm not alone.",
    author: "Anonymous",
    role: "Community Member",
    rating: 5,
  },
];

// Animated quote mark component
const AnimatedQuote = () => (
  <motion.div
    initial={{ scale: 0, rotate: -45 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <Quote className="w-10 h-10 text-primary/20" />
  </motion.div>
);

// Animated star rating
const StarRating = ({ rating, delay }: { rating: number; delay: number }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(rating)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + i * 0.1, type: "spring" }}
      >
        <Star className="w-4 h-4 fill-primary text-primary" />
      </motion.div>
    ))}
  </div>
);

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Quote className="w-6 h-6" />
            </motion.div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of Hope
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from members of our community who have found support and healing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-6 md:p-8 rounded-2xl bg-card shadow-card group"
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="relative z-10">
                <AnimatedQuote />
                <StarRating rating={testimonial.rating} delay={0.2 + index * 0.1} />
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-primary font-semibold">
                      {testimonial.author[0]}
                    </span>
                  </motion.div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
