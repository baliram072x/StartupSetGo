import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Globe, Smartphone, Shield, Zap, Users, TrendingUp, Star, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

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

const Index = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRole, setReviewRole] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: reviewName,
          role: reviewRole,
          content: reviewContent,
          rating: reviewRating,
          is_approved: false // Admin must approve
        });

      if (error) throw error;

      toast({
        title: "Review Submitted! 🎉",
        description: "Thank you! Your review will be visible once approved by an admin.",
      });
      
      // Reset form
      setReviewName("");
      setReviewRole("");
      setReviewContent("");
      setReviewRating(5);
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Trusted by Small Business Owners
              </h2>
              <p className="text-muted-foreground text-lg">
                See what our clients say about working with us.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MessageCircle size={18} /> Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share Your Experience</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input 
                      placeholder="e.g. Rajesh Kumar" 
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Role / Business</label>
                    <Input 
                      placeholder="e.g. Shop Owner" 
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`focus:outline-none transition-transform hover:scale-110 ${
                            reviewRating >= star ? "text-yellow-400" : "text-muted"
                          }`}
                        >
                          <Star size={24} fill={reviewRating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Review</label>
                    <Textarea 
                      placeholder="How was your experience working with StartupSetGo?" 
                      rows={4}
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-8 border border-border h-48 animate-pulse" />
              ))
            ) : testimonials.length === 0 ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No reviews yet. Be the first to write one!
              </div>
            ) : (
              testimonials.map((t) => (
                <div key={t.id} className="bg-card rounded-xl p-8 border border-border shadow-card animate-fade-up">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">"{t.content}"</p>
                  <div>
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))
            )}
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
