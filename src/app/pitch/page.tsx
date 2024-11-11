"use client";

import { CursorClickIcon } from "@/components/icons/cursor-click";
import { ScanTextIcon } from "@/components/icons/scan-text";
import { WordPullUp } from "@/components/text/word-pull-up";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Cloud } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ImageClassifier from "../dashboard/image-checker/image-classifier";

export default function PitchDeck() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent>
          {/* Intro Slide */}
          <CarouselItem>
            <div className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                <Cloud className="w-12 h-12" />
                <div className="flex items-center gap-8 md:text-5xl text-2xl font-medium">
                  <WordPullUp words="CloudCheck Pitch Presentation" />
                  {/* <span>CloudCheck</span>
                  <span>Pitch</span>
                  <span>Presentation</span> */}
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Team Slide */}
          <CarouselItem>
            <div className="relative w-full min-h-screen bg-background flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-24">
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">Jia Wei</h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Ng</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">
                    Jeung Hong
                  </h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Tay</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">Vignesh</h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Kumar</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">Gary</h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Goh</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">
                    Liang Fan
                  </h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Lim</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-5xl font-medium">Fawaz</h2>
                  <h2 className="text-2xl md:text-5xl font-medium">Mohamed</h2>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Interactive Demo Slide */}
          <CarouselItem>
            <div className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                <CursorClickIcon />
                <div className="flex items-center gap-8 md:text-5xl text-2xl font-medium">
                  <span>Interactive Demo</span>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* QR Slide */}
          <CarouselItem>
            <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center gap-6">
              <ScanTextIcon />
              <div className="w-48 h-48">
                <QRCode
                  value={
                    process.env.NEXT_PUBLIC_APP_URL ??
                    "https://cloudcheckapp.vercel.app"
                  }
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  className="dark:invert"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-72">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                      OR GO TO YOUR BROWSER
                    </span>
                  </div>
                </div>
                <a
                  href={process.env.NEXT_PUBLIC_APP_URL}
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {process.env.NEXT_PUBLIC_APP_URL}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-12">
                Online app is only for interactive demo & references
              </p>
            </div>
          </CarouselItem>

          {/* Interactive Demo Slide */}
          <CarouselItem>
            <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
              <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
                <h1 className="md:text-5xl text-2xl font-medium">
                  Generated AI images is
                </h1>
                <h1 className="md:text-5xl text-2xl font-medium">
                  spreading misinformation
                </h1>
                <Image
                  src="/icons/warning_3d.png"
                  width={60}
                  height={60}
                  alt="Warning"
                  className="xl:absolute left-[38rem] top-14"
                />
              </div>
            </div>
          </CarouselItem>

          {/* Demo Slide */}
          <CarouselItem>
            <Card className="flex h-screen w-full flex-col items-center justify-center bg-transparent border-none">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-5xl font-bold mb-12 text-center text-foreground">
                  Dashboard
                </h2>
                <div className="flex flex-row justify-center items-center w-[1080px] h-[720px] -ml-20">
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>

          {/* Dashboard Slide */}
          <CarouselItem>
            <Card className="flex h-screen w-full flex-col items-center justify-center bg-transparent border-none">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-5xl font-bold mb-12 text-center text-foreground">
                  Demo
                </h2>
                <div>
                  <ImageClassifier />
                </div>
              </div>
            </Card>
          </CarouselItem>

          {/* Call to Action Slide */}
          <CarouselItem>
            <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center gap-8">
              <Cloud className="w-12 h-12" />
              <h1 className="text-2xl md:text-5xl font-medium text-center max-w-2xl">
                Detect the undetectable. Trust every pixel.
              </h1>
              <Button size="lg">Get Started</Button>
            </div>
          </CarouselItem>
        </CarouselContent>
        {/* <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row items-center justify-center">
            <ThemeToggle />
          </div>
        </div> */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row items-center justify-center">
            <CarouselPrevious className="text-foreground" />
            <div className="flex flex-col gap-2 items-center rounded-full text-sm text-foreground">
              {/* <div className="flex flex-col gap-2 items-center py-2 px-4 bg-muted/50 rounded-full text-sm text-foreground"> */}
              <div className="flex flex-col gap-1">
                <ThemeToggle />
                {/* Slide {current} of {count} */}
                {/* <Progress value={(current / count) * 100} className="h-1" /> */}
              </div>
            </div>
            <CarouselNext className="text-foreground" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
