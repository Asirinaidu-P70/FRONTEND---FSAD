const createAvatar = (initials, background, foreground = "#f8fafc") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${initials} avatar"><rect width="120" height="120" rx="28" fill="${background}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${foreground}" font-family="Arial, sans-serif" font-size="40" font-weight="700">${initials}</text></svg>`
  )}`;

export const trainers = [
  {
    id: 1,
    name: "Lena Moritz",
    role: "AI Product Strategist",
    expertise: "AI & Emerging Tech",
    sessions: 24,
    avatar: createAvatar("LM", "#2563eb"),
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Growth Workshop Facilitator",
    expertise: "Product Growth",
    sessions: 18,
    avatar: createAvatar("MC", "#7c3aed"),
  },
  {
    id: 3,
    name: "Nadia Rivera",
    role: "Learning Experience Designer",
    expertise: "Instructional Design",
    sessions: 21,
    avatar: createAvatar("NR", "#ea580c"),
  },
];
