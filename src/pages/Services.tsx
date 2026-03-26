import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Globe, Smartphone, Package, Check, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Get a professional website that works beautifully on all devices. Perfect for showcasing your business, taking orders, or sharing information.",
    features: ["Responsive Design", "WhatsApp Integration", "Google Maps", "Contact Forms", "SEO Optimized", "Fast Loading"],
    plans: [
      { name: "Basic", price: "₹9,999", features: ["5 Pages", "Mobile Responsive", "Contact Form", "1 Month Support"] },
      { name: "Standard", price: "₹19,999", features: ["10 Pages", "WhatsApp Chat", "Payment Gateway", "3 Months Support", "SEO Setup"] },
      { name: "Premium", price: "₹34,999", features: ["Unlimited Pages", "Custom Design", "E-commerce Ready", "6 Months Support", "Advanced SEO", "Analytics Dashboard"] },
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Custom mobile apps for Android and iOS that help your customers interact with your business anytime, anywhere.",
    features: ["Android & iOS", "Push Notifications", "In-app Payments", "Offline Support", "User Dashboard", "Admin Panel"],
    plans: [
      { name: "Basic", price: "₹24,999", features: ["Android App", "5 Screens", "Push Notifications", "1 Month Support"] },
      { name: "Standard", price: "₹49,999", features: ["Android + iOS", "10 Screens", "Payment Integration", "3 Months Support", "Admin Panel"] },
      { name: "Premium", price: "₹79,999", features: ["Cross-platform", "Unlimited Screens", "Custom Features", "6 Months Support", "Advanced Analytics", "Priority Support"] },
    ],
  },
  {
    icon: Package,
    title: "Complete Digital Setup",
    desc: "The all-in-one package — website, mobile app, hosting, domain, and ongoing maintenance. Everything handled for you.",
    features: ["Website + App", "Domain & Hosting", "SSL Certificate", "Monthly Maintenance", "Content Updates", "24/7 Support"],
    plans: [
      { name: "Starter", price: "₹39,999", features: ["Basic Website + Android App", "Domain & Hosting", "3 Months Maintenance"] },
      { name: "Growth", price: "₹69,999", features: ["Standard Website + Apps", "Premium Hosting", "6 Months Maintenance", "SEO & Marketing Setup"] },
      { name: "Enterprise", price: "₹1,19,999", features: ["Premium Everything", "Dedicated Manager", "12 Months Maintenance", "Priority Support", "Quarterly Updates"] },
    ],
  },
];

const Services = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Our Services
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            From simple websites to complete digital setups — we have the right solution for every business.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat, idx) => (
        <section key={cat.title} className={`py-20 ${idx % 2 === 0 ? "bg-background" : "bg-muted/50"}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <cat.icon className="text-primary-foreground" size={22} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{cat.title}</h2>
                <p className="text-muted-foreground">{cat.desc}</p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-12">
              {cat.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium">
                  <Check size={14} /> {f}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-3 gap-8">
              {cat.plans.map((plan, pi) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-8 border transition-all duration-300 ${
                    pi === 1
                      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-elevated scale-[1.02]"
                      : "bg-card border-border shadow-card hover:shadow-elevated"
                  }`}
                >
                  <h3 className={`font-heading font-bold text-lg ${pi === 1 ? "" : "text-foreground"}`}>{plan.name}</h3>
                  <div className="mt-2 mb-6">
                    <span className={`text-3xl font-heading font-extrabold ${pi === 1 ? "" : "text-foreground"}`}>{plan.price}</span>
                    <span className={`text-sm ml-1 ${pi === 1 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>one-time</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pi === 1 ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        <Check size={16} className={pi === 1 ? "text-primary-foreground" : "text-primary"} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button
                      variant={pi === 1 ? "heroOutline" : "default"}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Not sure which plan is right for you?
          </h2>
          <p className="text-primary-foreground/70 mb-8">Tell us about your business and we'll recommend the perfect solution.</p>
          <Link to="/contact">
            <Button variant="hero" size="xl">Contact Us <ArrowRight className="ml-1" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
