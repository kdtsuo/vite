import teamphoto from "../assets/img/stock/teamphoto.jpeg";

export default function About() {
  return (
    <div className="animate-fade-in flex flex-wrap lg:flex-nowrap items-center justify-center h-auto">
      <div className="w-screen h-screen relative overflow-hidden ">
        <img
          className="absolute inset-0 object-cover w-full h-full brightness-[0.5]"
          src={teamphoto}
          alt="team"
        />

        <div className="relative flex flex-col justify-center items-center h-full p-4 text-white">
          <div>
            <h1 className="text-3xl font-bold lg:text-4xl text-center my-5 text-lightblue-100">
              What is KDT?
            </h1>
            <p className="text-xl lg:paragraph  text-center max-w-screen-sm">
              The KPop Dance Team (KDT), is a team consisting of diverse, unique
              individuals that have common interests in dancing, choreographing,
              and performing to promote korean pop-culture, and have fun!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
