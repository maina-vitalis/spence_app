export const siteConfig = {
  name: "Vitalis Maina",
  title: "Vitalis Maina | Developer Portfolio",
  description:
    "Portfolio of web projects and case studies by Vitalis Maina.",
  url: "https://vitalismaina.me",
  domain: "vitalismaina.me",
  author: "Vitalis Maina",
  email: "hello@vitalismaina.me",
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
