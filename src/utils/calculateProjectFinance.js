export function calculateProjectFinance(project) {
  if (!project) return {
    totalTakzuvCoachAdam: 0,
    totalTakzivRechesh: 0,
    coachAdam: 0,
    totalBudget: 0,
    gap: 0,
  };

  const totalTakzuvCoachAdam = Number(project.totalTakzuvCoachAdam || 0);
  const totalTakzivRechesh = Number(project.totalTakzivRechesh || 0);
  const coachAdam = Number(project.coachAdam || 0);

  const totalBudget = totalTakzuvCoachAdam + totalTakzivRechesh;
  const gap = totalTakzuvCoachAdam - coachAdam;

  return {
    totalTakzuvCoachAdam,
    totalTakzivRechesh,
    coachAdam,
    totalBudget,
    gap,
  };
}

export default calculateProjectFinance;
