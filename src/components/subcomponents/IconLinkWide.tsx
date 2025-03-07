import { ChevronRight, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import iconMap from "@/utils/iconMap";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface IconLinkWideProps {
  iconType?: string;
  label: string;
  link: string;
  style?: string;
  isOpen?: boolean;
  date?: string;
  onDelete?: () => void;
}

export default function IconLinkWide({
  iconType,
  label,
  link,
  style,
  isOpen = true,
  date,
  onDelete,
}: IconLinkWideProps) {
  const { user } = useAuth();
  const isNew = date
    ? new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    : false;

  const deleteLink = () => {
    if (onDelete) {
      onDelete();
    } else {
      toast.success(`Deleted link: ${label}`);
    }
  };

  const iconDetails = iconType ? iconMap[iconType] : undefined;
  const Icon = iconDetails?.iconComponent;
  const imagePath = iconDetails?.imagePath;

  const LinkContent = () => (
    <>
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 mr-4">
          {Icon && <Icon strokeWidth={2} size={30} />}
          {imagePath && (
            <img src={imagePath} alt={label} className="w-10 h-auto" />
          )}
        </div>
        <h1 className="flex-grow text-center text-lg">{label}</h1>
        <div className="flex-shrink-0">
          <ChevronRight
            className="t200e opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0"
            strokeWidth={2}
            size={30}
          />
        </div>
      </div>

      {!isOpen && (
        <Badge
          variant={"destructive"}
          className="absolute text-xs top-0 right-0 m-1 rounded-md mt-2 mr-2"
        >
          <h1>NOT AVAILABLE</h1>
        </Badge>
      )}
      {isNew && (
        <Badge
          variant={"default"}
          className="absolute text-xs top-0 right-0 m-1 rounded-md mt-2 mr-2"
        >
          <h1>NEW</h1>
        </Badge>
      )}
    </>
  );

  return (
    <div className="flex items-center justify-center">
      {user && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full p-0 mr-3 cursor-pointer z-10"
            >
              <X size={14} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Link</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the "{label}" link? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row gap-2 sm:justify-end">
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteLink}
                className="bg-destructive hover:bg-destructive/90 cursor-pointer"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isOpen ? (
        <Button
          asChild
          variant="ghost"
          className={cn(
            "h-20 t200e relative flex w-full items-center px-4 py-3 rounded-xl text-lg font-medium group",
            style
          )}
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full"
          >
            <LinkContent />
          </a>
        </Button>
      ) : (
        <Button
          disabled
          variant="ghost"
          className={cn(
            "h-20 t200e relative flex w-full items-center px-4 py-3 rounded-xl text-lg font-medium group opacity-70",
            style
          )}
        >
          <LinkContent />
        </Button>
      )}

      <Toaster />
    </div>
  );
}
