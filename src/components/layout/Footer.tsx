import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  support: [
    { name: "Mental Health Conditions", href: "/conditions" },
    { name: "Find a Chatroom", href: "/chatrooms" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Wellness Activities", href: "/wellness" },
  ],
  community: [
    { name: "Share Your Story", href: "/community" },
    { name: "Events & Workshops", href: "/events" },
    { name: "Resources", href: "/resources" },
  ],
  about: [
    { name: "Our Mission", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Crisis Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-destructive font-medium">
            If you are in crisis or need immediate help, please contact emergency services or call a crisis hotline.
            <Link to="/contact" className="underline ml-2 hover:no-underline">
              View emergency contacts
            </Link>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Ihumure
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              A safe space for mental wellness in Rwanda. Connect with others, 
              access resources, and take steps toward healing together.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:support@ihumure.rw"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@ihumure.rw
              </a>
              <a
                href="tel:+250788000000"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +250 788 000 000
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kigali, Rwanda
              </p>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Ihumure. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
              Disclaimer: Ihumure provides mental health information and peer support. 
              It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
