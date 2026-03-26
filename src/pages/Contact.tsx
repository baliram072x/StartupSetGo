import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", businessType: "", requirements: "", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        business_type: formData.businessType,
        requirements: formData.requirements,
        contact: formData.contact,
      }).select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      console.log("Submission successful:", data);
      toast({ title: "Message Sent! 🎉", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", businessType: "", requirements: "", contact: "" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <section className="bg-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Tell us your idea, we will build it. Let's start a conversation.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill out the form and we'll respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name</label>
                  <Input
                    placeholder="e.g., Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Business Type</label>
                  <Select value={formData.businessType} onValueChange={(v) => setFormData({ ...formData, businessType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shop">Local Shop / Retail</SelectItem>
                      <SelectItem value="food">Restaurant / Café</SelectItem>
                      <SelectItem value="education">Coaching / Institute</SelectItem>
                      <SelectItem value="health">Medical / Health</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Requirements</label>
                  <Textarea
                    placeholder="Tell us what you need — website, app, or both? Any specific features?"
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone / Email</label>
                  <Input
                    placeholder="Your phone number or email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  <Send size={18} /> {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Other Ways to Reach Us</h2>
                <p className="text-muted-foreground">Choose whatever is most convenient for you.</p>
              </div>

              <a
                href="https://wa.me/919527955039"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-green-50 border border-green-200 hover:shadow-elevated transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <MessageSquare className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">WhatsApp Us</p>
                  <p className="text-sm text-muted-foreground">Chat with us instantly</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="text-primary" size={22} />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">+91 9527955039</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={22} />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Email Us</p>
                  <p className="text-sm text-muted-foreground">hello@startupsetgo.com</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground italic">
                  "We respond to every inquiry within 24 hours. Most of our clients start with a simple WhatsApp message — feel free to do the same!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
