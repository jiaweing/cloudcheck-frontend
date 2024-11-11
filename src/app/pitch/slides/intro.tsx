import { WordPullUp } from "@/components/text/word-pull-up";
import { CarouselItem } from "@/components/ui/carousel";
import { Cloud } from "lucide-react";

export default function Intro() {
  return (
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
  );
}
