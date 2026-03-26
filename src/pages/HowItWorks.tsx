import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { FileText, Search, Code, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    num: "01",
    title: "Submit Your Requirement",
    desc: "Fill out a simple form or message us on WhatsApp. Tell us about your business, what you need, and your budget. No technical knowledge required!",
  },
  {
    icon: Search,
    num: "02",
    title: "We Analyze Your Needs",
    desc: "Our team reviews your requirements and prepares a custom plan. We research your industry and competitors to build the best solution.",
  },
  {
    icon: Code,
    num: "03",
    title: "We Build Your Product",
    desc: "Our developers and designers get to work. You'll get regular updates and previews so you can share feedback along the way.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "You Go Live Online",
    desc: "We launch your website or app, set up your domain, and make sure everything runs smoothly. You're now officially online!",
  },
];

const HowItWorks = () => {
  return (
    <div className="pt-16">
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            How It Works
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Getting your business online is easier than you think. Just 4 simple steps.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Simple Process"
            title="From Idea to Launch in 4 Steps"
            subtitle="We handle all the tech. You focus on your business."
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={step.num} className="flex gap-6 md:gap-8 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elevated">
                      <step.icon className="text-primary-foreground" size={24} />
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Step {step.num}</span>
                    <h3 className="text-xl font-heading font-bold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-primary-foreground/70 mb-8">It all begins with a simple message. Tell us your idea today.</p>
          <Link to="/contact">
            <Button variant="hero" size="xl">Get Started Now <ArrowRight className="ml-1" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
