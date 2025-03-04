import { Link, useLocation } from "react-router-dom";
import kdtlogosquare from "../assets/img/kdtlogosquare.png";

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

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 m-auto bg-lb-100 flex text-dsg shadow-md w-3/4 h-auto glass rounded-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <img src={kdtlogosquare} alt="KDT Logo" className="w-16 h-auto" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">{links}</div>

        {/* Mobile Menu Button (Optional) */}
        <button className="md:hidden p-2 rounded-md bg-gray-800">☰</button>
      </div>
    </nav>
  );
}
