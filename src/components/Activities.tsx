import dancepractice from "../assets/img/stock/dancepractice.png";
import events from "../assets/img/stock/events.jpeg";
import events2 from "../assets/img/stock/events2.jpeg";
import events3 from "../assets/img/stock/events3.jpeg";
import showcase from "../assets/img/stock/showcase.jpeg";
import Activity from "./subcomponents/Activity";

interface ActivityProps {
  images: string[];
  title: string;
  text: string;
  reverse: boolean;
}

export default function Activities() {
  const activities: ActivityProps[] = [
    {
      images: [dancepractice],
      title: "Dance Workshops",
      text: "We provide drop-in dance classes for the general public and extra dance practices for performance groups! Learn from experienced instructors in a fun, supportive environment.",
      reverse: false,
    },
    {
      images: [events, events2, events3],
      title: "K-Pop Events",
      text: "We host K-pop related events including random dance challenges, watch parties, karaokes, and other activities that promote K-pop and Korean culture!",
      reverse: true,
    },
    {
      images: [showcase],
      title: "K-Fest Showcase",
      text: "Annually, we host K-pop dance concerts to showcase our dance skills and creativity! Join us for an unforgettable experience celebrating K-pop performance.",
      reverse: false,
    },
  ];

  return (
    <section
      className="bg-lb-800 py-16 px-4 lg:px-12 
      bg-[radial-gradient(#ffffff12_1px,transparent_1px)] 
      [background-size:10px_10px]"
    >
      <h1 className="text-4xl lg:text-5xl font-bold text-center text-white mb-16 relative">
        <span className="relative">
          Activities
          <span className="absolute -bottom-3 left-0 w-full h-1 bg-lb-100 rounded-full"></span>
        </span>
      </h1>
      <div>
        {activities.map((activity, index) => (
          <Activity
            key={index}
            images={activity.images}
            title={activity.title}
            text={activity.text}
            reverse={activity.reverse}
          />
        ))}
      </div>
    </section>
  );
}
