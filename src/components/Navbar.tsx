import { Link, useLocation } from "react-router-dom";
import kdtlogotransparent from "../assets/img/kdtlogotransparent.png";
import IconButton from "./subcomponents/IconButton";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import instagramlogo from "../assets/img/icons/instagramlogo.png";
import maillogo from "../assets/img/icons/maillogo.png";
import discordlogo from "../assets/img/icons/discordlogo.png";
import githublogo from "../assets/img/icons/githublogo.png";
import IconLink from "./subcomponents/IconLink";

export default function Navbar() {
  const { pathname } = useLocation();
  const items = ["Home", "About", "Contacts", "Sponsors"];
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
          <div className="hidden md:flex space-x-6 text-xl">{links}</div>

          {/* Mobile Menu Button using Sheet from shadcn */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <IconButton icon={Menu} style="cursor-pointer drop-shadow-md" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glass bg-lb-100/20 border-none w-3/4 md:w-full "
              >
                <SheetHeader className="flex items-center mb-6">
                  <img
                    src={kdtlogotransparent}
                    alt="KDT Logo"
                    className="w-28 h-auto mx-auto"
                  />
                </SheetHeader>
                <div className="flex flex-col items-center justify-center space-y-6 text-3xl">
                  {links}
                </div>
                <SheetFooter className="w-full flex justify-center mt-8">
                  <IconLink links={linkIcons} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
