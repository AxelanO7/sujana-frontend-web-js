import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../layouts/base";

// import { Card, CardContent } from "@sc/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@sc/components/ui/carousel";

const Dashboard = () => {
  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Dashboard</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Dashboard</p>
        </div>
        <div className="m-4 bg-gray-200">
          <div className="h-4"/>
          <p className="text-xl font-semibold text-center">
            Tour and travel booking
          </p>
          <div className="h-2"/>
          <div>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src={`https://picsum.photos/1200/500?random=${index}`}
                        className="w-full h-[500px] object-cover"
                      />
                      <p className="text-center text-lg font-semibold">
                        Lorem ipsum dolor sit amet
                      </p>
                      <p className="text-center text-sm font-light">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Dashboard;
