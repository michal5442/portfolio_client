/**
 * מחשב תקציבים, סך הכל ופערים עבור פרויקט בודד ומאחד שמות שדות
 */

const ACHUZEY_PEARIM = Number(import.meta.env.VITE_ACHUZEY_PEARIM) || 40;

export const calculateProjectFinance = (project) => {

  const totalTakzivCoachAdam = project?.totalTakzivCoachAdam || project?.totalTakzuvCoachAdam || 0;
  const totalTakzivRechesh   = project?.totalTakzivRechesh || 0;
  const coachAdam            = project?.coachAdam || 0;

  const totalTaktziv = totalTakzivCoachAdam + totalTakzivRechesh;

  const pearim = totalTakzivCoachAdam - coachAdam;

  // avoid division by zero / exploding percentages
  const achuzPearim = (coachAdam > 0 && totalTakzivCoachAdam > 0)
    ? (pearim / totalTakzivCoachAdam) * 100
    : 0;

  let statusPearim = "takin";

  if (pearim === 0) {
    statusPearim = "takin";
  } else if (Math.abs(achuzPearim) >= ACHUZEY_PEARIM || coachAdam === 0) {
    statusPearim = pearim < 0 ? "geraon" : "odef";
  }

  return {
    totalTakzivCoachAdam,
    totalTakzuvCoachAdam: totalTakzivCoachAdam,
    totalTakzivRechesh,
    coachAdam,
    totalTaktziv,
    pearim,
    achuzPearim: Math.round(Math.abs(achuzPearim)),
    statusPearim,
  };
};