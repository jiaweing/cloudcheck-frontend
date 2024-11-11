import { CarouselItem } from "@/components/ui/carousel";

export default function Team() {
  return (
    <CarouselItem>
      <div className="relative w-full min-h-screen bg-background flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-24">
          <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-medium">Jia Wei</h2>
            <h2 className="text-2xl md:text-5xl font-medium">Ng</h2>
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-medium">Jeung Hong</h2>
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
            <h2 className="text-2xl md:text-5xl font-medium">Liang Fan</h2>
            <h2 className="text-2xl md:text-5xl font-medium">Lim</h2>
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-medium">Fawaz</h2>
            <h2 className="text-2xl md:text-5xl font-medium">Mohamed</h2>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
