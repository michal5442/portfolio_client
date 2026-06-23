// keep only colors that are actually used by the dashboard components
export const DASH_COLORS = ['#1e3a5f', '#3b82f6'];

// Format large numbers compactly: 1_000 -> '1K', 1_000_000 -> '1.0M'
export const formatCompactNumber = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(0)}K`
    : String(n);

// compute total budget for a project (HR budget + procurement budget)
export const computeProjectTotalBudget = (p) => (p.totalTakzuvCoachAdam || 0) + (p.totalTakzivRechesh || 0);

// compute budget gap as (HR budget - planned HR)
export const computeBudgetMinusPlanned = (p) => (p.totalTakzuvCoachAdam || 0) - (p.coachAdam || 0);

// Donut geometry constants (clearer names)
export const CIRCLE_RADIUS = 48;
export const CIRCLE_CENTER_X = 56;
export const CIRCLE_CENTER_Y = 56;
export const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
