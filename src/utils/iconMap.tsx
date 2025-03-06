import { Link, Music, TicketMinus, LucideIcon } from "lucide-react";
import rubricLogo from "@/assets/img/icons/rubriclogo.png";
import discordColorLogo from "@/assets/img/icons/discordcolorlogo.png";
import googleFormsLogo from "@/assets/img/icons/googleformslogo.png";

// Define a type for our icon map
interface IconMapItem {
  iconComponent?: LucideIcon;
  imagePath?: string;
}

// Map string identifiers to their respective icon components or image paths
const iconMap: Record<string, IconMapItem> = {
  link: { iconComponent: Link },
  rubric: { imagePath: rubricLogo },
  discord: { imagePath: discordColorLogo },
  googleForms: { imagePath: googleFormsLogo },
  music: { iconComponent: Music },
  ticket: { iconComponent: TicketMinus },
};

export default iconMap;
