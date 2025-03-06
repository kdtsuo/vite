import IconLinkWide from "./subcomponents/IconLinkWide";
import rubricLogo from "../assets/img/icons/rubriclogo.png";
import discordColorLogo from "../assets/img/icons/discordcolorlogo.png";
import googleFormsLogo from "../assets/img/icons/googleformslogo.png";
import { Link } from "lucide-react";

interface QuickLinksProps {
  style?: string;
}

export default function QuickLinks({ style }: QuickLinksProps) {
  const links = [
    {
      icon: Link,
      label: "UBCO SQUID GAMES",
      link: "https://www.bouncelife.com/events/670e957fccb9170c0e7e066b",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      image: googleFormsLogo,
      label: "Showcase Volunteer Sign Up",
      link: "https://docs.google.com/forms/d/1wKNqjhKz84gjOZN76VDzymdlz-ExG51RhVHKcygsvn4/",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      image: rubricLogo,
      label: "K-Fest Showcase Tickets",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      image: googleFormsLogo,
      label: "KPop Dance Song Requests",
      link: "https://forms.gle/yVZcBeKBWPCm235aA",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      image: rubricLogo,
      label: "Merch",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      image: rubricLogo,
      label: "Memberships & Ticket Sales",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      image: discordColorLogo,
      label: "Discord Server",
      link: "https://discord.com/invite/tbKkvjV2W8",
      isOpen: true,
      date: "2024-10-31",
    },
  ];

  return (
    <div className={style}>
      {links.map((link) => (
        <IconLinkWide
          key={link.label}
          image={link.image}
          icon={link.icon}
          label={link.label}
          link={link.link}
          isOpen={link.isOpen}
          date={link.date}
          style="bg-white border-3 text-center border-lb-300 hover:bg-lb-100 drop-shadow-box"
        />
      ))}
    </div>
  );
}
