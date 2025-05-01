import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ShineBorder } from "../magicui/shine-border";
import { IconType } from "react-icons/lib";
import { Separator } from "../ui/separator";
import Link from "next/link";

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
    <Card className="w-full bg-primary/10 shadow-lg rounded-2xl overflow-hidden relative">
      <ShineBorder shineColor={shineColors} />

      <CardHeader className="pb-2 pt-8 px-8">
        <h2 className="text-2xl font-bol">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
      <CardContent className="px-8">
        <ul className="space-y-3 my-6">
          {featuresArr.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2
                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                size={16}
              />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Technologies
          </h3>
          <div className="flex gap-3 flex-wrap">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full"
              >
                <div
                  className={`w-4 h-4 rounded-full ${tech.bgColor} flex items-center justify-center`}
                >
                  <span className={`text-[10px] ${tech.textColor}`}>
                    <tech.icon />
                  </span>
                </div>
                <span className="text-xs">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-8 pb-8">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-5"
          asChild
        >
          <Link href="/contact">
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
