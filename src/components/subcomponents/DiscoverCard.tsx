import { LucideIcon } from "lucide-react";

interface DiscoverCardProps {
  style?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  image: string;
  link: string;
  isOpen: boolean;
}

export default function DiscoverCard({
  style,
  icon: Icon,
  title,
  description,
  image,
  link,
  isOpen,
}: DiscoverCardProps) {
  return (
    <a
      href={link}
      className={`relative rounded-lg overflow-hidden shadow-lg group t200e flex justify-center ${style} ${
        isOpen ? "opacity-100" : "opacity-50"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center brightness-25 group-hover:brightness-50 t200e"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Dot pattern overlay - only visible on hover */}
      <div
        className="absolute inset-0 opacity-25 group-hover:opacity-40 t200e"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)`,
          backgroundSize: `12px 12px`,
        }}
      ></div>

      <div className="relative p-6 text-white h-auto flex flex-col items-center justify-center text-center z-10">
        <div className="flex justify-center items-center space-x-2">
          {Icon && <Icon size={30} strokeWidth={2} />}
          <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        </div>
        <p className="text-md md:text-xl mt-2 text-gray-200 t200e">
          {description}
        </p>
      </div>
    </a>
  );
}
