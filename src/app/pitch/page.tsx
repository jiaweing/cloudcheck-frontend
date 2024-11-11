"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import SlideToolbar from "./slide-toolbar";
import CTA from "./slides/cta";
import DashboardDemo from "./slides/dashboard-demo";
import ImageClassifierSlide from "./slides/image-classifier";
import InteractiveDemo from "./slides/interactive-demo";
import Intro from "./slides/intro";
import Misinformation from "./slides/misinformation";
import QRCodeSlide from "./slides/qr-code";
import Team from "./slides/team";

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
          <Intro />
          <Team />
          <InteractiveDemo />
          <QRCodeSlide />
          <Misinformation />
          <DashboardDemo />
          <ImageClassifierSlide />
          <CTA />
        </CarouselContent>
        <SlideToolbar />
      </Carousel>
    </div>
  );
}
