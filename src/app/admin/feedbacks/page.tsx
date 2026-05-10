"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Trash2, Calendar, User } from "lucide-react";

interface Feedback {
  id: string;
  client: {
    full_name: string;
    email: string;
  };
  message: string;
  created_at: string;
}

export default function AdminFeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/admin/feedbacks");
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/admin/feedbacks", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setFeedbacks(feedbacks.filter(fb => fb.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Customer Voice</h1>
        <p className="text-gray-400">Monitor and analyze customer sentiment and feedback.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold">{fb.client.full_name}</h3>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{fb.client.email}</span>
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{fb.message}"</p>
                <div className="flex items-center space-x-4 mt-4 text-[10px] text-gray-500 uppercase tracking-widest">
                   <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(fb.created_at).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>Direct Submission</span>
                   </div>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col gap-2">
              <button 
                onClick={() => handleDelete(fb.id)}
                className="bg-white/5 hover:bg-red-500/10 hover:text-red-500 p-3 rounded-lg transition-all text-gray-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
