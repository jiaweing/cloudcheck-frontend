import { Card } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

export default function DashboardDemo() {
  return (
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
  );
}
