import React from "react";
import discordlogo from "@/assets/img/icons/discordlogo.png";
import githublogo from "@/assets/img/icons/githublogo.png";
import instagramlogo from "@/assets/img/icons/instagramlogo.png";
import maillogo from "@/assets/img/icons/maillogo.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Toaster } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
  title: string;
  description: string;
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
      title: "Discord",
      description: "Join our community and stay connected",
    },
    {
      icon: githublogo,
      alt: "GitHub",
      href: "https://github.com",
      title: "GitHub",
      description: "Check out our open-source projects",
    },
    {
      icon: instagramlogo,
      alt: "Instagram",
      href: "https://instagram.com",
      title: "Instagram",
      description: "Follow us for latest updates",
    },
    {
      icon: maillogo,
      alt: "Email",
      href: "mailto:contact@example.com",
      title: "Email",
      description: "Reach out directly to our team",
    },
  ];

  return (
    <div
      className="bg-lb-100 min-h-screen flex items-center justify-center p-4 
      bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
    >
      <div className="w-4/5 max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden flex relative">
        {/* Social Media Cards Section */}
        <div className="w-1/3 p-8 flex flex-col justify-between items-center">
          <h2 className="text-3xl font-bold text-center">Connect With Us</h2>
          <div className="w-full flex-grow justify-between flex flex-col py-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-black text-white">
                  <CardHeader className="flex flex-row items-center space-x-4 p-4">
                    <img src={link.icon} alt={link.alt} className="w-12 h-12" />
                    <CardTitle className="text-xl font-extralight">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Vertical line  */}
        <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gray-300 my-8"></div>

        {/* Contact Form Section */}
        <div className="w-2/3 p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">
                Directly Contact Us
              </h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Name</FormLabel>
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
                    <FormLabel className="text-xl">Email</FormLabel>
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
                    <FormLabel className="text-xl">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message..."
                        className="min-h-32 text-gray-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-black hover:bg-slate-500 text-white"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
