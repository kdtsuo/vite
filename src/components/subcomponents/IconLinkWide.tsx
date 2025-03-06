import { ChevronRight, LucideIcon, X } from "lucide-react";
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
  const { user } = useAuth();
  // if the date is less than 7 days old, display "New" on the link
  // date is in the format "YYYY-MM-DD"
  const isNew = date
    ? new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    : false;

  const deleteLink = () => {
    console.log(`Deleting link: ${label}`);

    toast.success(`Deleted link: ${label}`);
  };

  return (
    <div className="flex items-center justify-center">
      {user && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant={"secondary"}
              className="size-8 rounded-full p-0 mr-3 cursor-pointer"
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
      <a
        href={link}
        target="_blank"
        className={`h-20 t200e flex flex-grow items-center justify-between gap-2 p-4 rounded-xl text-lg font-medium group ${style}`}
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
          <div className="absolute text-xs text-white top-0 right-0 m-1 rounded-lg bg-gray-400 px-2 ">
            <h1>NOT AVAILABLE</h1>
          </div>
        )}
        {isNew && (
          <div className="absolute text-xs top-0 right-0 m-1 rounded-md bg-yellow-400 mt-2 mr-2 px-2 text-dsg">
            <h1>NEW</h1>
          </div>
        )}
      </a>
      <Toaster />
    </div>
  );
}
