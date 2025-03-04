import QuickLinks from "@/components/QuickLinks";
import Discover from "@/components/Discover";

export default function Home() {
  return (
    <div className="mx-auto bg-lb-100 h-auto pt-34 md:pt-46 ">
      <div className="text-center text-dsg text-xl md:text-4xl">
        <h1>all things kpop for ubco!</h1>
        <h1>dance projects and meetups for</h1>
        <h1>all kpop fans ♥</h1>
      </div>
      <QuickLinks style="flex flex-col space-y-4 max-w-full mx-5 mt-5 md:max-w-1/2 justify-center md:m-auto md:mt-10" />
      <div className="py-5"></div>
      <Discover />
    </div>
  );
}
