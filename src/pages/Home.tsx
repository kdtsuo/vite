import QuickLinks from "@/components/QuickLinks";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      id="top"
      className="animate-fade-in mx-auto bg-lb-100 h-auto pt-34 md:pt-46 
    bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
    >
      <div className="text-center text-dsg text-xl md:text-4xl">
        <h1>all things kpop for ubco!</h1>
        <h1>dance projects and meetups for</h1>
        <h1>all kpop fans ♥</h1>
      </div>
      <div className="w-full flex justify-center">
        <QuickLinks style="flex flex-col space-y-4 w-4/5 mx-5 mt-5 md:max-w-1/2 justify-center m-auto md:mt-10" />
      </div>
      <div className="py-5"></div>
      <Discover />

      <Footer />
    </div>
  );
}
