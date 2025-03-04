import { ChevronRight, LucideIcon } from "lucide-react";

interface IconLinkWideProps {
  icon?: LucideIcon;
  image?: string;
  label: string;
  link: string;
  style?: string;
  isOpen?: boolean;
  date?: string;
}

export default function IconLinkWide({
  icon: Icon,
  image,
  label,
  link,
  style,
  isOpen,
  date,
}: IconLinkWideProps) {
  // if the date is less than 7 days old, display "New" on the link
  // date is in the format "YYYY-MM-DD"
  const isNew = date
    ? new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    : false;

  return (
    <a
      href={link}
      target="_blank"
      className={`h-20 t200e flex items-center justify-between gap-2 p-4 rounded-xl text-lg font-medium group zoomin-sm ${style}`}
    >
      {Icon && <Icon strokeWidth={2} size={30} />}
      {image && <img src={image} alt={label} className="w-10 h-auto" />}
      <h1 className="mx-2 text-lg">{label}</h1>
      <ChevronRight
        className="t200e opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0"
        strokeWidth={2}
        size={30}
      />
      {!isOpen && (
        <div className="absolute text-xs text-white top-0 right-0 m-1 rounded-lg bg-gray-400 px-2 text-dsg">
          <h1>NOT AVAILABLE</h1>
        </div>
      )}
      {isNew && (
        <div className="absolute text-xs top-0 right-0 m-1 rounded-md bg-yellow-400 mt-2 mr-2 px-2 text-dsg">
          <h1>NEW</h1>
        </div>
      )}
    </a>
  );
}
