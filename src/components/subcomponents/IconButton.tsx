import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  onClick?: () => void;
  style?: string;
}

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  style,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${label ? "space-x-2 px-2" : "px-4"}
        px-2 py-2 rounded-md text-lg font-medium flex items-center ${style}`}
      aria-label={label}
    >
      <h1>{label}</h1>
      <Icon strokeWidth={3} size={40} />
    </button>
  );
}
