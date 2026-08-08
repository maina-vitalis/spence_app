export const siteConfig = {
  name: "Vitalis Maina",
  title: "Vitalis Maina | Developer Portfolio & Tech Blog",
  description:
    "Full-stack developer portfolio and tech blog by Vitalis Maina. Featuring web projects, case studies, and insights on AI, cloud computing, and modern software development.",
  url: "https://vitalismaina.me",
  domain: "vitalismaina.me",
  author: "Vitalis Maina",
  email: "mainavitalis65@gmail.com",
  phone: "+254799732696",
  location: "Nairobi, Kenya",
  twitter: "@vitalismaina",
  keywords: [
    "Vitalis Maina",
    "developer portfolio",
    "web development",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "case studies",
    "tech blog",
    "software engineering",
    "artificial intelligence",
    "cloud computing",
    "cybersecurity",
    "developer tutorials",
    "programming",
    "web applications",
  ],
  social: {
    github: "https://github.com/vitalismaina",
    linkedin: "https://linkedin.com/in/vitalismaina",
    twitter: "https://twitter.com/vitalismaina",
  },
} as const;

export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
