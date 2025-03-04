import { Link, useLocation } from "react-router-dom";
import kdtlogotransparent from "../assets/img/kdtlogotransparent.png";
import IconButton from "./subcomponents/IconButton";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const items = ["Home", "About", "Contact", "Sponsors"];

  const links = items.map((item) => {
    const path = item.toLowerCase();
    const isActive =
      pathname === `/${path}` || (pathname === "/" && item === "Home");

    return (
      <div key={item}>
        <Link
          to={path}
          className={`navbar-link t200e   ${isActive ? "bg-lb-300 " : ""}`}
        >
          {item}
        </Link>
      </div>
    );
  });

  const handleMenuClick = () => {
    console.log("Menu Clicked");
  };

  return (
    <nav
      className="fixed left-1/2 top-0 z-50 mt-4 md:mt-7 flex w-11/12 max-w-7xl -translate-x-1/2 flex-col 
    items-center rounded-full bg-lb-300/20 p-0 md:p-3 glass"
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
        <div className="hidden md:flex space-x-6">{links}</div>

        {/* Mobile Menu Button (Optional) */}
        <IconButton
          icon={Menu}
          onClick={handleMenuClick}
          style="cursor-pointer md:hidden text-white drop-shadow-md"
        />
      </div>
    </nav>
  );
}
