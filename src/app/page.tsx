import { ContainerScroll } from "@/components/global/container-scroll";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { LampDemo } from "@/components/ui/lamp";
import { clients, products } from "@/lib/constants";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import ThreeDCard from "@/components/global/ThreeDCardContainer";

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <section className="h-screen w-full
     bg-neutral-950 rounded-md !overflow-scroll
     relative flex flex-col items-center antialiased">
        <div className="max-w-4xl mx-auto p-4
      relative z-10 flex items-center
      justify-center flex-col"></div>
        <div className="absolute inset-0
       h-full w-full items-center px-5 py-24
        [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll titleComponent={<div className="flex items-center flex-col">
            <Button
              size={'lg'}
              className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                Start For Free Today
              </span>
            </Button>
            <h1 className="mb-10 text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
              Automate Your Work With Fuzzie
            </h1>
          </div>}
          >

            <Image
              src={`/assets/temp-banner.png`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
            />

          </ContainerScroll>
        </div>
      </section>
      <InfiniteMovingCards
        items={clients}
        direction="right"
        speed="slow"
      />
      <section>
        <HeroParallax products={products} />
      </section>
      <section className="">
        <LampDemo></LampDemo>
        <div className="flex items-center justify-center flex-wrap
        flex-col md:flex-row gap-8 -mt-52">
          <ThreeDCard title="Hobby" price={0}/>
          <ThreeDCard title="Pro Plan" price={29}/>
          <ThreeDCard title="Unlimited" price={99}/>
        </div>
      </section>
    </main>
  );
}
