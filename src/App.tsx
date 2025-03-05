import { Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Sponsors from "./pages/Sponsors";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404s */}
      </Routes>
    </>
  );
}

export default App;
