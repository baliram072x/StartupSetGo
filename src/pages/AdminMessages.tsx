import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Search, RefreshCw, Eye, LogOut, Star, Check, Trash2, LayoutDashboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Submission {
  id: string;
  name: string;
  business_type: string | null;
  requirements: string;
  contact: string;
  status: string;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

const businessTypeLabels: Record<string, string> = {
  shop: "Local Shop / Retail",
  food: "Restaurant / Café",
  education: "Coaching / Institute",
  health: "Medical / Health",
  startup: "Startup",
  other: "Other",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  read: "bg-yellow-100 text-yellow-800 border-yellow-200",
  replied: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-muted text-muted-foreground border-border",
};

const AdminMessages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Messages state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [msgSearch, setMsgSearch] = useState("");
  const [msgFilterStatus, setMsgFilterStatus] = useState("all");
  const [selectedMsg, setSelectedMsg] = useState<Submission | null>(null);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testLoading, setTestLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Access Denied", description: "Please login to view messages.", variant: "destructive" });
        navigate("/login");
      } else {
        fetchSubmissions();
        fetchTestimonials();
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fetchSubmissions = async () => {
    setMsgLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load messages.", variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
    setMsgLoading(false);
  };

  const fetchTestimonials = async () => {
    setTestLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load reviews.", variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setTestLoading(false);
  };

  const updateMsgStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      if (selectedMsg?.id === id) setSelectedMsg({ ...selectedMsg, status });
    }
  };

  const toggleReviewApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update review.", variant: "destructive" });
    } else {
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, is_approved: !currentStatus } : t)));
      toast({ title: "Success", description: !currentStatus ? "Review approved!" : "Review unapproved." });
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete review.", variant: "destructive" });
    } else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast({ title: "Success", description: "Review deleted." });
    }
  };

  const filteredMsgs = submissions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
      s.contact.toLowerCase().includes(msgSearch.toLowerCase()) ||
      s.requirements.toLowerCase().includes(msgSearch.toLowerCase());
    const matchesStatus = msgFilterStatus === "all" || s.status === msgFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary" size={28} />
            <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare size={16} /> Messages
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star size={16} /> Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search by name, contact, or requirements..."
                  value={msgSearch}
                  onChange={(e) => setMsgSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={msgFilterStatus} onValueChange={setMsgFilterStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchSubmissions} disabled={msgLoading}>
                <RefreshCw size={16} className={msgLoading ? "animate-spin" : ""} /> Refresh
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Business Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="w-[80px]">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {msgLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        Loading messages...
                      </TableCell>
                    </TableRow>
                  ) : filteredMsgs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No messages found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMsgs.map((s) => (
                      <TableRow key={s.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedMsg(s)}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {s.business_type ? businessTypeLabels[s.business_type] || s.business_type : "—"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{s.contact}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[s.status] || ""}`}>
                            {s.status}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                          {new Date(s.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" onClick={fetchTestimonials} disabled={testLoading}>
                <RefreshCw size={16} className={testLoading ? "animate-spin" : ""} /> Refresh
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        Loading reviews...
                      </TableCell>
                    </TableRow>
                  ) : testimonials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        No reviews yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    testimonials.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role}</div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm line-clamp-2">{t.content}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(t.created_at).toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-0.5 text-yellow-400">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={t.is_approved ? "default" : "outline"} className={t.is_approved ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" : ""}>
                            {t.is_approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={t.is_approved ? "text-muted-foreground" : "text-green-600 hover:text-green-700 hover:bg-green-50"}
                              onClick={() => toggleReviewApproval(t.id, t.is_approved)}
                              title={t.is_approved ? "Unapprove" : "Approve"}
                            >
                              {t.is_approved ? <Trash2 size={16} className="text-red-500" /> : <Check size={18} />}
                            </Button>
                            {!t.is_approved && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => deleteReview(t.id)}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMsg} onOpenChange={() => setSelectedMsg(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">Message from {selectedMsg?.name}</DialogTitle>
            </DialogHeader>
            {selectedMsg && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p className="font-medium text-foreground">{selectedMsg.contact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Business Type</p>
                    <p className="font-medium text-foreground">
                      {selectedMsg.business_type ? businessTypeLabels[selectedMsg.business_type] || selectedMsg.business_type : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedMsg.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[selectedMsg.status] || ""}`}>
                      {selectedMsg.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-1">Requirements</p>
                  <p className="text-foreground bg-muted/50 rounded-lg p-4 text-sm leading-relaxed">
                    {selectedMsg.requirements}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {["new", "read", "replied", "closed"].map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedMsg.status === s ? "default" : "outline"}
                      onClick={() => updateMsgStatus(selectedMsg.id, s)}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMessages;
