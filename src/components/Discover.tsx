import DiscoverCard from "@/components/subcomponents/DiscoverCard";
import teamphoto from "@/assets/img/stock/teamphoto.jpeg";
import joinourteam from "@/assets/img/stock/joinourteam.jpeg";
import showcase from "@/assets/img/stock/showcase.jpeg";
import events from "@/assets/img/stock/events.jpeg";
import { BetweenHorizonalStart, Contact, HandCoins, Info } from "lucide-react";

export default function Discover() {
  const discoverCards = [
    {
      title: "More About Us",
      icon: Info,
      description: "What makes us different",
      image: teamphoto,
      link: "/about",
      isOpen: true,
    },
    {
      title: "Contact Us",
      icon: Contact,
      description: "Get in touch",
      image: showcase,
      link: "/contacts",
      isOpen: true,
    },
    {
      title: "Positions",
      icon: BetweenHorizonalStart,
      description: "Find what position fits you",
      image: joinourteam,
      link: "/positions",
      isOpen: true,
    },
    {
      title: "Sponsors",
      icon: HandCoins,
      description: "People who believe in us",
      image: events,
      link: "/sponsors",
      isOpen: true,
    },
  ];

  return (
    <div
      className="bg-slate-800 text-white text-center py-10 
    bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:40px_40px]"
    >
      <h1 className="text-4xl font-bold mb-6">Discover More</h1>
      {/* Cards Container */}
      <div className="flex justify-center gap-6 flex-wrap mx-5">
        {discoverCards.map((card, index) => (
          <DiscoverCard
            key={`${card.title}-${index}`}
            title={card.title}
            icon={card.icon}
            description={card.description}
            image={card.image}
            link={card.link}
            isOpen={card.isOpen}
            style="w-full md:w-full lg:w-1/3 aspect-video"
          />
        ))}
      </div>
    </div>
  );
}
