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

interface IconLinkWideProps {
  iconType?: string; // Now accepts a string identifier instead of direct icon/image
  label: string;
  link: string;
  style?: string;
  isOpen?: boolean;
  date?: string;
  onDelete?: () => void; // Add this line
}

export default function IconLinkWide({
  iconType,
  label,
  link,
  style,
  isOpen = true, // Default to true if not provided
  date,
  onDelete,
}: IconLinkWideProps) {
  const { user } = useAuth();
  // if the date is less than 7 days old, display "New" on the link
  // date is in the format "YYYY-MM-DD"
  const isNew = date
    ? new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    : false;

  // And modify the deleteLink function in the component:
  const deleteLink = () => {
    if (onDelete) {
      onDelete(); // Call the onDelete function passed from the parent
    } else {
      toast.success(`Deleted link: ${label}`);
    }
  };

  // Get icon or image from the map based on iconType
  const iconDetails = iconType ? iconMap[iconType] : undefined;
  const Icon = iconDetails?.iconComponent;
  const imagePath = iconDetails?.imagePath;

  // Create a content component that's shared between the clickable and non-clickable versions
  const LinkContent = () => (
    <>
      {Icon && <Icon strokeWidth={2} size={30} />}
      {imagePath && <img src={imagePath} alt={label} className="w-10 h-auto" />}
      <h1 className="mx-2 text-lg">{label}</h1>
      <ChevronRight
        className="t200e opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0"
        strokeWidth={2}
        size={30}
      />
      {!isOpen && (
        <div className="absolute text-xs text-white top-0 left-0 m-1 rounded-lg bg-gray-400 px-2">
          <h1>NOT AVAILABLE</h1>
        </div>
      )}
      {isNew && (
        <div className="absolute text-xs top-0 right-0 m-1 rounded-md bg-yellow-400 mt-2 mr-2 px-2 text-dsg">
          <h1>NEW</h1>
        </div>
      )}
    </>
  );

  return (
    <div className={`flex items-center justify-center`}>
      {user && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant={"secondary"}
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
            <AlertDialogFooter className="flex-row gap-2 sm:justify-end ">
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteLink}
                className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Render different elements based on isOpen state */}
      {isOpen ? (
        <a
          href={link}
          target="_blank"
          className={`h-20 t200e relative flex flex-grow items-center justify-between gap-2 p-4 rounded-xl text-lg font-medium group ${style}`}
        >
          <LinkContent />
        </a>
      ) : (
        <div
          className={`h-20 t200e relative flex flex-grow items-center justify-between gap-2 p-4 rounded-xl text-lg font-medium group ${style} opacity-70 cursor-not-allowed`}
        >
          <LinkContent />
        </div>
      )}

      <Toaster />
    </div>
  );
}
