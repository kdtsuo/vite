import IconLinkWide from "@/components/subcomponents/IconLinkWide";
import { ListPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import iconMap from "@/utils/iconMap";
import { useState } from "react";

interface QuickLinksProps {
  style?: string;
}

// Define the schema for our form - removing date from user input
const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  link: z.string().url("Please enter a valid URL"),
  iconType: z.string().min(1, "Icon type is required"),
  isOpen: z.boolean().default(true),
});

export default function QuickLinks({ style }: QuickLinksProps) {
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState([
    {
      iconType: "link",
      label: "UBCO SQUID GAMES",
      link: "https://www.bouncelife.com/events/670e957fccb9170c0e7e066b",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      iconType: "googleForms",
      label: "Showcase Volunteer Sign Up",
      link: "https://docs.google.com/forms/d/1wKNqjhKz84gjOZN76VDzymdlz-ExG51RhVHKcygsvn4/",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      iconType: "rubric",
      label: "K-Fest Showcase Tickets",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2025-3-3",
    },
    {
      iconType: "googleForms",
      label: "KPop Dance Song Requests",
      link: "https://forms.gle/yVZcBeKBWPCm235aA",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      iconType: "rubric",
      label: "Merch",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      iconType: "rubric",
      label: "Memberships & Ticket Sales",
      link: "https://campus.hellorubric.com/?s=7805",
      isOpen: true,
      date: "2024-10-31",
    },
    {
      iconType: "discord",
      label: "Discord Server",
      link: "https://discord.com/invite/tbKkvjV2W8",
      isOpen: true,
      date: "2024-10-31",
    },
  ]);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      link: "",
      iconType: "link",
      isOpen: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add the new link to the links array with current date
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    setLinks([...links, { ...values, date: currentDate }]);
    toast.success(`Added new link: ${values.label}`);
    setOpen(false);
    console.log(values);
    form.reset(); // Reset the form
  }

  return (
    <div className={style}>
      {useAuth().user && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant={"secondary"} className="cursor-pointer">
              <ListPlus className="mr-2" />
              Add Links
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Link</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter link title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed for the link.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the full URL including https://
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="iconType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row flex-wrap justify-start md:justify-around"
                        >
                          {Object.keys(iconMap).map((iconKey) => {
                            const Icon = iconMap[iconKey].iconComponent;
                            const imagePath = iconMap[iconKey].imagePath;
                            return (
                              <FormItem
                                key={iconKey}
                                className="flex flex-col items-center space-y-2"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={iconKey}
                                    id={iconKey}
                                    className="sr-only"
                                  />
                                </FormControl>
                                <label
                                  htmlFor={iconKey}
                                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                                    field.value === iconKey
                                      ? "border-primary bg-accent"
                                      : "border-muted"
                                  }`}
                                >
                                  {Icon && <Icon strokeWidth={2} size={30} />}
                                  {imagePath && (
                                    <img
                                      src={imagePath}
                                      alt={iconKey}
                                      className="w-8 h-8 object-contain"
                                    />
                                  )}
                                </label>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isOpen"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Available</FormLabel>
                        <FormDescription>
                          Is this link currently available?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Link
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      {links.map((link) => (
        <IconLinkWide
          key={link.label}
          iconType={link.iconType}
          label={link.label}
          link={link.link}
          isOpen={link.isOpen}
          date={link.date}
          style="bg-white border-3 text-center border-lb-300 hover:bg-lb-100 drop-shadow-box"
        />
      ))}

      <Toaster />
    </div>
  );
}
