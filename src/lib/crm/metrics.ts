// Core E-CRM computation module

export interface ClientMetrics {
  client_id: string;
  total_spent: number;
  order_count: number;
  feedback_count: number;
  days_since_last_order: number | null;
  purchase_frequency: number; // orders per 30 days
  profitability_tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  engagement_score: number;
  engagement_segment: 'Dormant' | 'Passive' | 'Active' | 'Highly Engaged';
}

/**
 * Computes profitability tier based on LTV relative to Average Order Value
 */
export function computeProfitabilityTier(
  ltv: number,
  avgOrderValue: number
): ClientMetrics['profitability_tier'] {
  if (avgOrderValue === 0) return 'Bronze';
  if (ltv < avgOrderValue)           return 'Bronze';
  if (ltv < avgOrderValue * 3)       return 'Silver';
  if (ltv < avgOrderValue * 6)       return 'Gold';
  return 'Platinum';
}

/**
 * Computes engagement score based on orders, feedback, and recency
 */
export function computeEngagementScore(
  orderCount: number,
  feedbackCount: number,
  daysSinceLastOrder: number | null
): number {
  const recencyBonus = daysSinceLastOrder !== null && daysSinceLastOrder < 60 ? 2 : 0;
  return (orderCount * 3) + (feedbackCount * 5) + recencyBonus;
}

/**
 * Segments clients based on their engagement score
 */
export function computeEngagementSegment(
  score: number
): ClientMetrics['engagement_segment'] {
  if (score <= 3)  return 'Dormant';
  if (score <= 8)  return 'Passive';
  if (score <= 15) return 'Active';
  return 'Highly Engaged';
}

/**
 * Computes purchase frequency (orders per 30-day period)
 */
export function computePurchaseFrequency(
  orderCount: number,
  createdAt: Date
): number {
  const daysSinceJoined = Math.max(
    1,
    Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );
  return (orderCount / daysSinceJoined) * 30;
}
