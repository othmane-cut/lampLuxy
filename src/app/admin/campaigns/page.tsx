"use client";

import { useState } from "react";
import { Send, Target, Users, Layout, Loader2, CheckCircle } from "lucide-react";

export default function AdminCampaignsPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock bulk send
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setSubject("");
    setBody("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Marketing Campaigns</h1>
        <p className="text-gray-400">Engage your customer segments with targeted email campaigns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer */}
        <div className="lg:col-span-2 bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-serif font-bold mb-6 italic">New Campaign</h2>
          <form onSubmit={handleSend} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Exclusive Invitation: The Midnight Gold Collection"
                className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Campaign Body (HTML/Text)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Hello {{name}}, we have something special for you..."
                className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all resize-none font-mono text-sm"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                 <Users className="w-4 h-4" />
                 <span>Will be sent to 1,240 clients</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : sent ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{loading ? "Sending..." : sent ? "Sent Successfully" : "Launch Campaign"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                 <Target className="w-4 h-4 text-primary" />
                 <span>Segment Targeting</span>
              </h3>
              <div className="space-y-3">
                 {['Dormant', 'Passive', 'Active', 'Highly Engaged'].map(seg => (
                   <label key={seg} className="flex items-center space-x-3 group cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-primary" />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{seg}</span>
                   </label>
                 ))}
              </div>
           </div>

           <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
              <h3 className="font-bold text-primary mb-2 flex items-center space-x-2">
                 <Layout className="w-4 h-4" />
                 <span>Campaign Tips</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                 Personalize your subject lines to increase open rates by up to 26%. Use the <code className="text-primary">{"{{name}}"}</code> tag to insert the client's full name automatically.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
