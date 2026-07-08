export const MASLOL = {
  KIYUM: { value: "KIYUM", label: "קיום" },
  HITAZMUT: { value: "HITAZMUT", label: "התעצמות" },
};

export const MASLOL_OPTIONS = Object.values(MASLOL); 

export const STATUS_PEARIM_MAP = {
  "אין פער": "takin",
  "פער בפלוס": "odef",
  "פער במינוס": "geraon"
};


export const AGAF_OPTIONS = ["פיתוח", "תחזוקה", "מערכות מידע"];
export const YECHIDA_MEVATSAAT_OPTIONS = ["דיגיטל", "דבאופס", "תשתיות", "דיבי", "מערכות ליבה"];

export default { MASLOL, MASLOL_OPTIONS, STATUS_PEARIM_MAP, AGAF_OPTIONS, YECHIDA_MEVATSAAT_OPTIONS };

