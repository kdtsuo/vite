import { useState, useEffect } from "react";
import joinourteam from "@/assets/img/stock/joinourteam.jpeg";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Check,
  ChevronsUpDown,
  Clipboard,
  Edit,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type Position = {
  label: string;
  form_url: string;
  is_accepting_responses: boolean;
};

const fallbackPositions: Position[] = [
  {
    label: "Senior Executive Team",
    form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLSeIAQWf8BCJUbN71X8RQgkvo8rmZA-j5JlFoBgM75JOV3yy1Q/viewform?usp=sf_link",
    is_accepting_responses: true,
  },
  {
    label: "Junior Executive Team",
    form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLSeLKmqK6ibtHO8HfItMOioxKjP5kmHdHzQFd4DtF6I3SLpiUg/viewform?usp=sf_link",
    is_accepting_responses: true,
  },
  {
    label: "Dance Instructor",
    form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLScTk4EakTgfma8fo72t0mJugyb5VFeL5sEKBlm_A_hXnK4WUg/viewform?usp=sf_link",
    is_accepting_responses: true,
  },
  {
    label: "Performance Team",
    form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLSdDBK_xgyeub7Przux1Lle2Ax-c_BDmN0B79Qpf7nKK-PJaXA/viewform?usp=sf_link",
    is_accepting_responses: true,
  },
  {
    label: "Cameraman",
    form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLScVl_PS4pdEdQ_4HwN6OO761pMiz7moYdwuyBTdnEsGE2dj3A/viewform?usp=sf_link",
    is_accepting_responses: true,
  },
];

export default function Positions() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [formClosed, setFormClosed] = useState<boolean>(false);
  const [positionsData, setPositionsData] =
    useState<Position[]>(fallbackPositions);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Function to check if a form is still accepting responses using AllOrigins
  const checkFormStatus = async (position: Position) => {
    try {
      // Using allorigins.win as the CORS proxy
      const allOriginsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        position.form_url
      )}`;
      const response = await fetch(allOriginsUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      // Check if the form contains the text indicating it's closed
      // Google Forms typically shows "This form is no longer accepting responses" when closed
      const is_accepting_responses = !text.includes(
        "no longer accepting response"
      );

      console.log(
        `Form status for ${position.label}: ${
          is_accepting_responses ? "Open" : "Closed"
        }`
      );

      return {
        ...position,
        is_accepting_responses,
      };
    } catch (error) {
      console.error(
        `Failed to check form status for ${position.label}:`,
        error
      );
      // In case of error, assume the form is still open to avoid false negatives
      return {
        ...position,
        is_accepting_responses: true,
      };
    }
  };

  // Check all form statuses when component mounts
  useEffect(() => {
    const fetchFormStatuses = async () => {
      setIsLoading(true);
      try {
        const updatedPositions = await Promise.all(
          fallbackPositions.map((fallbackPositions) =>
            checkFormStatus(fallbackPositions)
          )
        );
        setPositionsData(updatedPositions);
      } catch (error) {
        console.error("Error fetching form statuses:", error);
        // If the overall Promise.all fails, still update the state with original positions
        setPositionsData(fallbackPositions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormStatuses();
  }, []);
  // Update formClosed status when value changes
  useEffect(() => {
    if (value) {
      const selectedPosition = positionsData.find(
        (p) => p.label.toLowerCase().replace(/\s+/g, "") === value
      );
      setFormClosed(
        selectedPosition ? !selectedPosition.is_accepting_responses : false
      );
    } else {
      setFormClosed(false);
    }
  }, [value, positionsData]);
  return (
    <div className="animate-fade-in overflow-x-hidden">
      <div className="w-screen h-screen relative">
        <img
          className="absolute inset-0 object-cover w-full h-full brightness-[0.25]"
          src={joinourteam}
          alt="team"
        />

        <div className="relative flex flex-col justify-center items-center h-full p-4 text-white space-y-4">
          <div>
            <h1 className="text-3xl font-bold lg:text-4xl text-center my-5 text-lightblue-100">
              Find out what position fits you!
            </h1>
            <p className="text-xl lg:paragraph text-center max-w-screen-sm">
              We have a variety of positions available for you to join! Whether
              you're interested in dancing, videography, or graphic design, we
              have a spot for you.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            {/* Edit Positions Section */}
            {user && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer" variant="secondary">
                    <Edit />
                    Edit Positions
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Positions</DialogTitle>
                    <DialogDescription>
                      Add, remove, or update positions.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
            {/* Check Positions Section */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="secondary">
                  Check positions
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[350px] lg:w-[425px]">
                <DialogHeader>
                  <DialogTitle>Positions</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Select a position that you're interested in.
                </DialogDescription>
                <div className="flex items-center gap-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between cursor-pointer"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Loading..."
                          : value
                          ? positionsData.find(
                              (position) =>
                                position.label
                                  .toLowerCase()
                                  .replace(/\s+/g, "") === value
                            )?.label
                          : "Select positions..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <div className="rounded-md border">
                        {positionsData.map((position) => {
                          const positionValue = position.label
                            .toLowerCase()
                            .replace(/\s+/g, "");
                          return (
                            <div key={positionValue}>
                              <div
                                className={cn(
                                  "cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                  value === positionValue
                                    ? "bg-accent text-accent-foreground"
                                    : `transparent ${
                                        position.is_accepting_responses
                                          ? ""
                                          : "text-red-500 opacity-75"
                                      }`
                                )}
                                onClick={() => {
                                  setValue(
                                    positionValue === value ? "" : positionValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {position.label}
                                {position.is_accepting_responses ? (
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      value === positionValue
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                ) : (
                                  <X className="ml-auto h-4 w-4 text-red-500" />
                                )}
                              </div>
                              <Separator />
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Show X icon when selected form is closed */}
                {value && formClosed && (
                  <div className="flex items-center text-red-500">
                    <span className="text-xs">
                      We are not accepting applications for this position
                      currently
                    </span>
                  </div>
                )}
                <DialogFooter>
                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <Loader2
                        size={15}
                        className="animate-spin mr-2 text-slate-500"
                      />
                      <span className="text-xs text-slate-500">
                        Checking form for availability...
                      </span>
                    </div>
                  )}

                  <DialogClose asChild>
                    {value && (
                      <Button
                        variant="secondary"
                        className="border cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            positionsData.find(
                              (p) =>
                                p.label.toLowerCase().replace(/\s+/g, "") ===
                                value
                            )?.form_url || ""
                          );
                          toast.success("Copied link to clipboard!");
                        }}
                      >
                        Copy Link <Clipboard />
                      </Button>
                    )}
                  </DialogClose>
                  <DialogClose asChild>
                    {value && (
                      <Button
                        variant="default"
                        className="cursor-pointer"
                        disabled={!value || isLoading}
                        onClick={() => {
                          const selectedPosition = positionsData.find(
                            (p) =>
                              p.label.toLowerCase().replace(/\s+/g, "") ===
                              value
                          );
                          window.open(selectedPosition?.form_url, "_blank");
                        }}
                      >
                        Goto Form
                      </Button>
                    )}
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}
