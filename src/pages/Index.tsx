import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Globe, Smartphone, Shield, Zap, Users, TrendingUp, Star, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Beautiful, fast websites that showcase your business and attract customers online." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Custom mobile apps for Android & iOS that keep your customers engaged on the go." },
  { icon: Shield, title: "Complete Digital Setup", desc: "Full package — website, app, hosting, and ongoing support. Everything you need." },
];

const benefits = [
  { icon: Zap, title: "Fast Delivery", desc: "Go live in days, not months" },
  { icon: Users, title: "Built for You", desc: "Tailored to your business needs" },
  { icon: TrendingUp, title: "Grow Online", desc: "Reach more customers digitally" },
  { icon: Shield, title: "Ongoing Support", desc: "We're always here to help" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Café Owner", text: "StartupSetGo built our website in just 5 days. Now customers find us on Google and order online!", rating: 5 },
  { name: "Rahul Verma", role: "Coaching Institute", text: "Our enrollment doubled after we got our app. Parents love the easy access to schedules and results.", rating: 5 },
  { name: "Anita Desai", role: "Medical Store", text: "Going digital felt overwhelming, but the team made it so simple. Highly recommended!", rating: 5 },
];

const Index = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-hero relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(217,91%,50%,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground/80 text-sm font-medium mb-6 animate-fade-up">
              🚀 From Local to Digital
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.1] animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Turn Your Business Into a{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Digital Brand
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We build custom websites and mobile apps for small businesses, coaching centers, and startups — so you can grow online without any tech hassle.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Get Your Website/App <ArrowRight className="ml-1" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="heroOutline" size="xl">
                  View Services
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-primary-foreground/50 text-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <span className="flex items-center gap-1"><CheckCircle size={16} /> No tech skills needed</span>
              <span className="flex items-center gap-1"><CheckCircle size={16} /> Go live in days</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="What We Do"
            title="Simple Digital Solutions for Real Businesses"
            subtitle="Whether you own a shop, run a coaching class, or just started a new business — we make going online easy and affordable."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5">
                  <s.icon className="text-primary-foreground" size={22} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Go Digital */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Why Go Digital?"
            title="Your Customers Are Already Online"
            subtitle="80% of customers search online before visiting a shop. If you're not online, you're invisible to them."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={b.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="text-primary" size={24} />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2">{b.title}</h4>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Testimonials"
            title="Trusted by Small Business Owners"
            subtitle="See what our clients say about working with us."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-xl p-8 border border-border shadow-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <p className="font-heading font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Ready to Take Your Business Online?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
            Tell us your idea and we'll build it. No tech knowledge required.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Let's Get Started <ArrowRight className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
