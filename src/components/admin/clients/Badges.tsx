"use client";

import { cn } from "@/lib/utils";

type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export const TierBadge = ({ tier }: { tier: Tier }) => {
  const styles = {
    Bronze: "bg-[#CD7F32]/10 text-[#CD7F32] border-[#CD7F32]/20",
    Silver: "bg-[#C0C0C0]/10 text-[#C0C0C0] border-[#C0C0C0]/20",
    Gold: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20",
    Platinum: "bg-[#E5E4E2]/10 text-[#E5E4E2] border-[#E5E4E2]/20",
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider", styles[tier])}>
      {tier}
    </span>
  );
};

type Segment = 'Dormant' | 'Passive' | 'Active' | 'Highly Engaged';

export const SegmentBadge = ({ segment }: { segment: Segment }) => {
  const styles = {
    Dormant: "bg-gray-500/10 text-gray-500",
    Passive: "bg-blue-500/10 text-blue-500",
    Active: "bg-green-500/10 text-green-500",
    "Highly Engaged": "bg-primary/10 text-primary",
  };

  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap", styles[segment])}>
      {segment}
    </span>
  );
};
