import ImageClassifier from "@/app/dashboard/image-checker/image-classifier";
import { Card } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

export default function ImageClassifierSlide() {
  return (
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
  );
}
