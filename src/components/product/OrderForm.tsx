"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const orderSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  quantity: z.number().min(1).max(10),
  message: z.string().max(500).optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, control } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = useWatch({
    control,
    name: "quantity",
    defaultValue: 1,
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      console.log("Submitting order:", data);
      
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Submission failed");

      const order = await res.json();
      setOrderRef("LX-" + order.id.slice(-6).toUpperCase());
      setSubmitted(true);
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4">Order Received!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for choosing LuxGlow. We&apos;ve sent a confirmation email to your inbox.
        </p>
        <div className="bg-muted p-4 rounded-lg inline-block mb-8">
          <span className="text-sm uppercase tracking-widest block text-muted-foreground mb-1">Order Reference</span>
          <span className="text-xl font-mono font-bold text-primary">{orderRef}</span>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="block w-full text-sm font-bold text-primary hover:underline"
        >
          Place another order
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Full Name</label>
          <input
            {...register("fullName")}
            className={`w-full p-3 bg-background rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-border'} focus:border-primary outline-none transition-all`}
            placeholder="Alex Johnson"
          />
          {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Email</label>
          <input
            {...register("email")}
            className={`w-full p-3 bg-background rounded-lg border ${errors.email ? 'border-red-500' : 'border-border'} focus:border-primary outline-none transition-all`}
            placeholder="alex@example.com"
          />
          {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Phone</label>
          <input
            {...register("phone")}
            className={`w-full p-3 bg-background rounded-lg border ${errors.phone ? 'border-red-500' : 'border-border'} focus:border-primary outline-none transition-all`}
            placeholder="06 12 34 56 78"
          />
          {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-1 block">City</label>
          <input
            {...register("city")}
            className={`w-full p-3 bg-background rounded-lg border ${errors.city ? 'border-red-500' : 'border-border'} focus:border-primary outline-none transition-all`}
            placeholder="Casablanca"
          />
          {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Quantity</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted"
          >
            -
          </button>
          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setValue("quantity", Math.min(10, quantity + 1))}
            className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Message (Optional)</label>
        <textarea
          {...register("message")}
          className="w-full p-3 bg-background rounded-lg border border-border focus:border-primary outline-none transition-all resize-none h-20"
          placeholder="Special delivery instructions..."
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
        >
          {isSubmitting ? (
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Confirm Order — {(quantity * 2499).toLocaleString()} MAD</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">
          Secure Payment · Pay on Delivery
        </p>
      </div>
    </form>
  );
};

export default OrderForm;
