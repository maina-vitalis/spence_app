"use client";

import React from "react";
import {
  Cloud,
  renderSimpleIcon,
  fetchSimpleIcons,
  ICloud,
} from "react-icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
  "odoo",
  "python",
  "canva",
  "wordpress",
  "django",
  "flask",
  "chatgpt",
  "webstorm",
];

const cloudProps: Omit<ICloud, "children"> = {
  id: "stable-id-for-csr-ssr",
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },

  canvasProps: {
    style: {
      maxWidth: "90%",
      width: "100%",
    },
  },

  options: {
    reverse: true,
    depth: 1.2,
    wheelZoom: false,
    imageScale: 1.4,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 1000,
    tooltipDelay: 0,
    outlineColour: "#160703",
  },
};

export function IconCloud() {
  const useIcons = (slugs: string[]) => {
    const [icons, setIcons] = React.useState<{
      simpleIcons: Record<string, { title: string; hex: string; slug: string }>;
    } | null>(null);
    React.useEffect(() => {
      fetchSimpleIcons({ slugs }).then((result) => setIcons(result));
    }, [slugs]);

    if (icons) {
      return Object.values(icons.simpleIcons).map((icon) =>
        renderSimpleIcon({
          icon,
          size: 90,
          minContrastRatio: 0,
          // bgHex: "transparent",
          fallbackHex: "#4B5563",
          aProps: {
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
              e.preventDefault(),
          },
        })
      );
    }

    return <a>Loading</a>;
  };

  const icons = useIcons(slugs);

  return <Cloud {...cloudProps}>{icons}</Cloud>;
}
