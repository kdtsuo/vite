import QuickLinks from "@/components/QuickLinks";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
      <div
        id="top"
        className="animate-fade-in mx-auto h-auto pt-34 md:pt-46"
        style={{
          background: `var(--bg-dotted-${theme === "dark" ? "dark" : "light"})`,
        }}
      >
        <div className="text-center text-xl md:text-4xl">
          <h1>all things kpop for ubco!</h1>
          <h1>dance projects and meetups for</h1>
          <h1>all kpop fans ♥</h1>
        </div>
        <div className="w-full flex justify-center">
          <QuickLinks
            style="flex flex-col space-y-4 w-full mx-16 lg:mx-4 
          mt-5 md:max-w-1/2 justify-center m-auto md:mt-10"
          />
        </div>
        <Separator decorative={false} className="w-1/2 mx-auto my-6 border-2" />
        <Discover />
      </div>

      <Footer />
    </>
  );
}
