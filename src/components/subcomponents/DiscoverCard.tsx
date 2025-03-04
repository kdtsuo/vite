interface DiscoverCardProps {
  style?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isOpen: boolean;
}

export default function DiscoverCard({
  style,
  title,
  description,
  image,
  link,
  isOpen,
}: DiscoverCardProps) {
  return (
    <a
      href={link}
      className={`relative w-1/3 h-3/4 rounded-lg overflow-hidden shadow-lg t200e ${style} ${
        isOpen ? "opacity-100" : "opacity-50 "
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 hover:opacity-25 t200e"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="relative p-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </a>
  );
}
