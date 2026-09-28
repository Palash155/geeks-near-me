export const referenceServices = [
  {
    slug: "scary-pop-ups",
    title: "Scary Pop-Ups",
    image: "/images/redesign/scary-popups.png",
    tone: "red",
    description: ["Seeing warnings, strange messages or something telling you to call a number?"],
    detail: ["Do not call the number on the screen.", "Restart the computer.", "Still there? Call us."],
  },
  {
    slug: "printer-issues",
    title: "Printer Issues",
    image: "/images/redesign/printer-issues.png",
    tone: "blue",
    description: ["Printer not printing?", "Scanner not working?", "Printer suddenly disappeared?"],
    detail: ["We can come to you and get it working again."],
  },
  {
    slug: "new-device-setup",
    title: "New Device Setup",
    image: "/images/redesign/new-device.png",
    tone: "purple",
    description: ["Bought a new computer, laptop, phone, tablet or printer?"],
    detail: ["We can set it up properly, transfer your information and show you how to use it."],
  },
  {
    slug: "internet-wifi",
    title: "Internet & Wi-Fi",
    image: "/images/redesign/internet-wifi.png",
    tone: "teal",
    description: ["No internet? Weak Wi-Fi?", "Devices not connecting?"],
    detail: ["We can diagnose the problem and get you connected again."],
  },
  {
    slug: "computer-problems",
    title: "Computer Problems",
    image: "/images/redesign/computer-problems.png",
    tone: "green",
    description: ["Computer slow, freezing, showing errors or simply not behaving normally?"],
    detail: ["We can check it and explain the problem in plain English."],
  },
  {
    slug: "data-recovery-transfer",
    title: "Data Recovery & Transfer",
    image: "/images/redesign/data-recovery.png",
    tone: "gold",
    description: ["Need your photos, documents, emails or other important files moved to a new computer?"],
    detail: ["We can help transfer or recover your data safely."],
  },
] as const;

export type ReferenceService = (typeof referenceServices)[number];

export function getReferenceService(slug?: string) {
  return referenceServices.find((service) => service.slug === slug) ?? referenceServices[1];
}
