import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", desc: "To help small businesses and startups grow by making digital solutions simple, affordable, and accessible to everyone — regardless of technical expertise." },
  { icon: Eye, title: "Our Vision", desc: "A world where every local business has a strong online presence, where going digital is as easy as opening a shop. We want to bridge the gap between offline and online." },
  { icon: Heart, title: "Our Values", desc: "Simplicity, transparency, and genuine care for our clients. We treat every project like our own and deliver solutions that actually make a difference." },
];

const About = () => {
  return (
    <div className="pt-16">
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            About StartupSetGo
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            We're on a mission to make digital presence accessible to every business, big or small.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-8 border border-border shadow-card text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <SectionHeading
            badge="Our Story"
            title="Why We Started"
            subtitle="A conversation with a local shop owner who wanted a website but couldn't afford one — that's where it all began."
          />
          <div className="bg-card rounded-xl p-8 border border-border shadow-card text-left">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We noticed that thousands of talented business owners were missing out on online customers simply because they didn't know how to build a website or couldn't afford expensive agencies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              StartupSetGo was founded with one goal: to provide high-quality digital solutions at prices that small businesses can actually afford, with a process so simple that anyone can use it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we've helped dozens of businesses — from chai shops to coaching institutes — establish their digital presence and reach new customers. And we're just getting started.
            </p>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-heading font-bold text-foreground">— The StartupSetGo Team</p>
              <p className="text-sm text-muted-foreground">Founders & Builders</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-primary-foreground/70 mb-8">We'd love to hear about your business and help you grow online.</p>
          <Link to="/contact">
            <Button variant="hero" size="xl">Get in Touch <ArrowRight className="ml-1" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
