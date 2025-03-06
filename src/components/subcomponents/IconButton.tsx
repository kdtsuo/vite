import { LucideIcon } from "lucide-react";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label?: string;
  className?: string; // Renamed from style to className
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex items-center gap-2 p-2 rounded ${className || ""}`}
        {...props}
      >
        <Icon size={20} />
        {label && <span>{label}</span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
