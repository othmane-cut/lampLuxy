"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const feedbackSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-feedback", handleOpen);
    return () => window.removeEventListener("open-feedback", handleOpen);
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      const res = await fetch("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      reset();
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-background border border-border rounded-xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden"
          >
            <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
              <h3 className="font-serif font-bold">Share Your Feedback</h3>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Thank You!</h4>
                  <p className="text-sm text-muted-foreground">Your feedback helps us shine brighter.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                    <input
                      {...register("email")}
                      className={`w-full p-3 bg-muted rounded-md border ${errors.email ? 'border-red-500' : 'border-transparent'} focus:border-primary outline-none transition-all`}
                      placeholder="alex@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Your Message</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={`w-full p-3 bg-muted rounded-md border ${errors.message ? 'border-red-500' : 'border-transparent'} focus:border-primary outline-none transition-all resize-none`}
                      placeholder="What do you think of LuxGlow?"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FeedbackWidget;
