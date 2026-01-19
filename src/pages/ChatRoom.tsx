import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ArrowLeft,
  Users,
  Flag,
  Trash2,
  Shield,
  Loader2,
  AlertCircle,
  X
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  message: string;
  nickname: string;
  user_id: string | null;
  created_at: string;
  room_id: string;
}

interface RoomMember {
  nickname: string;
  user_id: string;
}

const roomInfo: Record<string, { name: string; color: string; bgColor: string }> = {
  anxiety: { name: "Anxiety Support", color: "text-amber-500", bgColor: "bg-amber-50" },
  depression: { name: "Depression Support", color: "text-blue-500", bgColor: "bg-blue-50" },
  ptsd: { name: "PTSD & Trauma", color: "text-red-500", bgColor: "bg-red-50" },
  bipolar: { name: "Bipolar Support", color: "text-purple-500", bgColor: "bg-purple-50" },
  ocd: { name: "OCD Support", color: "text-teal-500", bgColor: "bg-teal-50" },
  stress: { name: "Stress & Overwhelm", color: "text-rose-500", bgColor: "bg-rose-50" },
  eating: { name: "Eating Disorders", color: "text-orange-500", bgColor: "bg-orange-50" },
  addiction: { name: "Addiction Recovery", color: "text-indigo-500", bgColor: "bg-indigo-50" },
  grief: { name: "Grief & Loss", color: "text-slate-500", bgColor: "bg-slate-50" },
  burnout: { name: "Burnout Recovery", color: "text-yellow-600", bgColor: "bg-yellow-50" },
  adhd: { name: "ADHD Support", color: "text-cyan-500", bgColor: "bg-cyan-50" },
};

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [showNicknameDialog, setShowNicknameDialog] = useState(false);
  const [tempNickname, setTempNickname] = useState("");
  const [onlineMembers, setOnlineMembers] = useState<RoomMember[]>([]);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportingMessageId, setReportingMessageId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const room = roomId ? roomInfo[roomId] : null;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !roomId) return;

    // Check if user already joined this room
    const checkMembership = async () => {
      const { data } = await supabase
        .from("room_members")
        .select("nickname")
        .eq("room_id", roomId)
        .eq("user_id", user.id)
        .single();

      if (data) {
        setNickname(data.nickname);
        setHasJoined(true);
        loadMessages();
      } else {
        setShowNicknameDialog(true);
      }
      setIsLoading(false);
    };

    checkMembership();
  }, [user, roomId]);

  const loadMessages = async () => {
    if (!roomId) return;

    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Load messages error:", error);
        toast({
          title: "Error loading messages",
          description: error.message || "Please refresh the page.",
          variant: "destructive",
        });
      } else {
        console.log("Messages loaded:", data);
        setMessages(data || []);
      }
    } catch (err) {
      console.error("Unexpected error loading messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!hasJoined || !roomId) return;

    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hasJoined, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinRoom = async () => {
    if (!user || !roomId || !tempNickname.trim()) return;

    try {
      const { error } = await supabase
        .from("room_members")
        .insert({
          room_id: roomId,
          user_id: user.id,
          nickname: tempNickname.trim(),
        });

      if (error) {
        console.error("Join room error:", error);
        toast({
          title: "Error joining room",
          description: error.message || "Please try again.",
          variant: "destructive",
        });
      } else {
        setNickname(tempNickname.trim());
        setHasJoined(true);
        setShowNicknameDialog(false);
        loadMessages();
        toast({
          title: "Welcome to the room!",
          description: "Remember to be kind and supportive.",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Connection error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !roomId || !newMessage.trim() || isSending) return;

    setIsSending(true);

    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .insert({
          room_id: roomId,
          user_id: user.id,
          nickname: nickname,
          message: newMessage.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error("Send message error:", error);
        toast({
          title: "Error sending message",
          description: error.message || "Please try again.",
          variant: "destructive",
        });
      } else {
        console.log("Message sent successfully:", data);
        setNewMessage("");
        // Also add message locally for immediate feedback
        if (data) {
          setMessages(prev => [...prev, data]);
        }
      }
    } catch (err) {
      console.error("Unexpected error sending message:", err);
      toast({
        title: "Connection error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    }

    setIsSending(false);
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("chat_messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      toast({
        title: "Error deleting message",
        description: "You can only delete your own messages.",
        variant: "destructive",
      });
    }
  };

  const reportMessage = async () => {
    if (!reportingMessageId || !reportReason.trim() || !user) return;

    const { error } = await supabase
      .from("message_reports")
      .insert({
        message_id: reportingMessageId,
        reporter_id: user.id,
        reason: reportReason.trim(),
      });

    if (error) {
      toast({
        title: "Error submitting report",
        description: "Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
      });
      setReportDialogOpen(false);
      setReportingMessageId(null);
      setReportReason("");
    }
  };

  if (loading || isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!room) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-semibold mb-2">Room not found</h1>
            <Link to="/chatrooms">
              <Button>Back to Chatrooms</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Nickname Dialog */}
      <Dialog open={showNicknameDialog} onOpenChange={setShowNicknameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Nickname</DialogTitle>
            <DialogDescription>
              Your nickname will be visible to others in this chatroom.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter your nickname..."
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              maxLength={30}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => navigate("/chatrooms")}>
              Cancel
            </Button>
            <Button onClick={joinRoom} disabled={!tempNickname.trim()}>
              Join Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Message</DialogTitle>
            <DialogDescription>
              Please describe why you're reporting this message. Our moderators will review it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              maxLength={500}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={reportMessage} disabled={!reportReason.trim()} variant="destructive">
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className={`min-h-screen ${room.bgColor}`}>
        <div className="container mx-auto px-4 py-4 h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 py-4 border-b border-border bg-card/80 backdrop-blur-sm rounded-xl px-4 mb-4"
          >
            <Link to="/chatrooms">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className={`text-xl font-semibold ${room.color}`}>{room.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Anonymous & Moderated
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{messages.length > 0 ? "Active" : "Quiet"}</span>
            </div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-2 space-y-3">
            <AnimatePresence>
              {messages.map((msg) => {
                const isOwnMessage = msg.user_id === user?.id;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${isOwnMessage
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card shadow-sm rounded-bl-md"
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${isOwnMessage ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {isOwnMessage ? "You" : msg.nickname}
                        </span>
                        <span className={`text-xs ${isOwnMessage ? "text-primary-foreground/60" : "text-muted-foreground/60"}`}>
                          {format(new Date(msg.created_at!), "h:mm a")}
                        </span>
                      </div>
                      <p className={isOwnMessage ? "text-primary-foreground" : "text-foreground"}>
                        {msg.message}
                      </p>
                      {/* Actions */}
                      <div className="flex items-center gap-1 mt-2">
                        {isOwnMessage && (
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        {!isOwnMessage && (
                          <button
                            onClick={() => {
                              setReportingMessageId(msg.id);
                              setReportDialogOpen(true);
                            }}
                            className="text-xs text-muted-foreground/60 hover:text-destructive transition-colors flex items-center gap-1"
                          >
                            <Flag className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={sendMessage}
            className="py-4"
          >
            <div className="flex gap-2 bg-card rounded-xl p-2 shadow-soft">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a supportive message..."
                className="flex-1 border-0 focus-visible:ring-0"
                maxLength={1000}
                disabled={!hasJoined}
              />
              <Button type="submit" disabled={!newMessage.trim() || isSending || !hasJoined}>
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Be kind and supportive. Report any harmful content.
            </p>
          </motion.form>
        </div>
      </section>
    </PageLayout>
  );
}
