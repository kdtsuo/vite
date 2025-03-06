import { Link, useLocation } from "react-router-dom";
import kdtlogotransparent from "../assets/img/kdtlogotransparent.png";
import IconButton from "./subcomponents/IconButton";
import { supabase } from "@/lib/supabase";
import { Loader2, LogIn, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import instagramlogo from "../assets/img/icons/instagramlogo.png";
import maillogo from "../assets/img/icons/maillogo.png";
import discordlogo from "../assets/img/icons/discordlogo.png";
import githublogo from "../assets/img/icons/githublogo.png";
import IconLink from "./subcomponents/IconLink";
import { useAuth } from "@/contexts/AuthContext";
import { toast, Toaster } from "sonner";

// Login Dialog Component
function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message, {
          duration: 3000,
        });
      } else {
        // Login successful
        setIsOpen(false);
        toast.success("Logged in successfully " + data.session.user.email, {
          duration: 3000,
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred", {
        duration: 3000,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="secondary">
          <LogIn size={24} /> Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Sign in to your account to edit the website contents. One will be
            provided to you if you are a team member. Contact the developer for
            more info.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignIn}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const items = ["Home", "About", "Positions", "Contacts", "Sponsors"];
  const [open, setOpen] = useState(false);

  const links = items.map((item) => {
    const path = item.toLowerCase();
    const isActive =
      pathname === `/${path}` || (pathname === "/" && item === "Home");

    return (
      <div key={item}>
        <Link
          to={path}
          onClick={() => setOpen(false)}
          className={`navbar-link t200e ${isActive ? "bg-lb-500" : ""}`}
        >
          {item}
        </Link>
      </div>
    );
  });

  const authSection = user ? (
    <div className="flex flex-col items-center space-y-2">
      <span className="text-sm inline text-black px-2 py-1 bg-white rounded-full">
        {user.email?.split("@")[0]}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          signOut();
          toast.success("Logged out successfully", {
            duration: 3000,
          });
        }}
        className="cursor-pointer"
      >
        <LogOut size={24} /> Logout
      </Button>
    </div>
  ) : (
    <LoginDialog />
  );

  const linkIcons = [
    {
      href: "https://www.instagram.com/kdt.suo/?theme=dark",
      imgSrc: instagramlogo,
      alt: "instagram",
    },
    {
      href: "mailto:kpopdanceteam.suo@gmail.com",
      imgSrc: maillogo,
      alt: "mail",
    },
    {
      href: "https://discord.com/invite/tbKkvjV2W8",
      imgSrc: discordlogo,
      alt: "discord",
    },
    {
      href: "https://www.github.com/kdtsuo/v3",
      imgSrc: githublogo,
      alt: "github",
    },
  ];

  return (
    <div>
      <nav
        className="fixed left-1/2 top-0 z-50 mt-4 md:mt-7 flex
                    w-11/12 max-w-7xl -translate-x-1/2 flex-col 
                    items-center rounded-full bg-lb-500/20 p-0 md:p-3 glass"
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/">
            <img
              src={kdtlogotransparent}
              alt="KDT Logo"
              className="w-16 h-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hidden md:flex space-x-2 text-xl">{links}</div>
            {authSection}
          </div>

          {/* Mobile Menu Button using Sheet from shadcn */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <IconButton
                  icon={Menu}
                  size={40}
                  className="cursor-pointer drop-shadow-md text-white"
                />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glass bg-lb-100/20 border-none w-3/4 md:w-full "
              >
                <SheetTitle></SheetTitle>
                <SheetHeader className="flex items-center mb-6">
                  <img
                    src={kdtlogotransparent}
                    alt="KDT Logo"
                    className="w-28 h-auto mx-auto"
                  />
                </SheetHeader>
                <SheetDescription></SheetDescription>
                <div className="flex flex-col items-center justify-center space-y-6 text-xl">
                  {links}
                  {authSection}
                </div>
                <SheetFooter className="w-full flex justify-center mt-8">
                  <IconLink links={linkIcons} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <Toaster />
    </div>
  );
}
