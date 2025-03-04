import DiscoverCard from "@/components/subcomponents/DiscoverCard";
import media from "@/assets/img/media.png";

export default function Discover() {
  const discoverCards = [
    {
      title: "More About Us",
      description: "What Makes Us Different",
      image: media,
      link: "/about",
      isOpen: true,
    },
    {
      title: "More About Us",
      description: "What Makes Us Different",
      image: media,
      link: "/about",
      isOpen: true,
    },
    {
      title: "More About Us",
      description: "What Makes Us Different",
      image: media,
      link: "/about",
      isOpen: true,
    },
    {
      title: "More About Us",
      description: "What Makes Us Different",
      image: media,
      link: "/about",
      isOpen: true,
    },
  ];

  return (
    <div className="bg-lb-500 text-white text-center py-10">
      <h1 className="text-4xl font-bold mb-6">Discover More</h1>
      {/* Cards Container */}
      <div className="flex justify-center gap-6 flex-wrap">
        {discoverCards.map((card) => (
          <DiscoverCard
            key={card.title}
            title={card.title}
            description={card.description}
            image={card.image}
            link={card.link}
            isOpen={card.isOpen}
            style="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          />
        ))}
      </div>
    </div>
  );
}
