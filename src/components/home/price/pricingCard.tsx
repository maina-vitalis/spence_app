import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ShineBorder } from "../../magicui/shine-border";
import { IconType } from "react-icons/lib";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type PricingCardProps = {
  title: string;
  subtitle: string;
  featuresArr: string[];
  technologies: Array<{
    icon: IconType;
    name: string;
    bgColor: string;
    textColor: string;
  }>;
  shineColors: string[];
};

export default function PricingCard({
  title,
  subtitle,
  featuresArr,
  technologies,
  shineColors,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="pricing-card"
    >
      <Card
        className={cn(
          "w-full relative rounded-2xl overflow-hidden",
          "backdrop-blur-md bg-white/10 dark:bg-gray-950/30",
          "border border-white/20 dark:border-gray-800/50",
          "shadow-[0_8px_16px_rgb(0_0_0/0.1)] dark:shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
          "transition-all duration-300 hover:shadow-[0_12px_24px_rgb(0_0_0/0.2)] hover:scale-[1.02]"
        )}
      >
        <ShineBorder shineColor={shineColors} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

        <CardHeader className="pb-2 pt-8 px-8 relative z-10">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {title}
          </h2>
          <p className="text-muted-foreground/80">{subtitle}</p>
        </CardHeader>

        <Separator className="bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <CardContent className="px-8 relative z-10">
          <ul className="space-y-4 my-6">
            {featuresArr.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <CheckCircle2
                  className="h-5 w-5 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                  size={16}
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground/80 mb-3">
              Technologies
            </h3>
            <div className="flex gap-3 flex-wrap">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 backdrop-blur-sm bg-white/5 dark:bg-gray-950/30 
                            border border-white/10 dark:border-gray-800/30 
                            px-3 py-1.5 rounded-full transition-all duration-300
                            hover:scale-105 hover:shadow-lg"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center",
                      tech.bgColor
                    )}
                  >
                    <span className={cn("text-[10px]", tech.textColor)}>
                      <tech.icon />
                    </span>
                  </div>
                  <span className="text-xs text-foreground/80">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-8 relative z-10">
          <Button
            className={cn(
              "w-full rounded-full py-6",
              "bg-gradient-to-r from-primary to-primary/80",
              "hover:shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
              "hover:scale-[1.02] transition-all duration-300",
              "text-white font-medium"
            )}
            asChild
          >
            <Link href="/contact" className="flex items-center justify-center">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
