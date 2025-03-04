import React from "react";
import discordlogo from "@/assets/img/icons/discordlogo.png";
import githublogo from "@/assets/img/icons/githublogo.png";
import instagramlogo from "@/assets/img/icons/instagramlogo.png";
import maillogo from "@/assets/img/icons/maillogo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "sonner"; // Add this import
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IconButton from "@/components/subcomponents/IconButton";
import { Mail } from "lucide-react";

// Define schema for form validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Define interface for social links
interface SocialLink {
  icon: string;
  alt: string;
  href: string;
}

export default function Contacts() {
  // Define form with React Hook Form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(values);
    // Updated toast implementation using sonner
    toast.success("Message sent!", {
      description: "Thank you for your message. We'll get back to you soon.",
    });
    form.reset();
  };

  const socialLinks: SocialLink[] = [
    {
      icon: discordlogo,
      alt: "Discord",
      href: "https://discord.com",
    },
    {
      icon: githublogo,
      alt: "GitHub",
      href: "https://github.com",
    },
    {
      icon: instagramlogo,
      alt: "Instagram",
      href: "https://instagram.com",
    },
    {
      icon: maillogo,
      alt: "Email",
      href: "mailto:contact@example.com",
    },
  ];

  return (
    <div
      className="bg-lb-100 min-h-screen flex flex-col items-center justify-center p-4 
    bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
    >
      <div className="flex justify-center space-x-4 mb-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={link.icon} alt={link.alt} className="w-10 h-10" />
          </a>
        ))}
      </div>
      <div className="w-2/3 space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 m-auto bg-white p-5 border-2 rounded-lg space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      className="text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-32 text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-slate-500 text-white "
            >
              Send Message
            </Button>
          </form>
        </Form>

        <Toaster />
      </div>
    </div>
  );
}
