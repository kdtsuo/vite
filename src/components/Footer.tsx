import rmlogo from "../assets/img/rmlogo.png";

export default function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <div
      className="bg-slate-900 text-white p-4
        flex flex-col items-center justify-center space-y-2
        text-center"
    >
      <div className="text-lg font-bold">
        &copy; KDT ("KPop Dance Team") {getYear()}
      </div>
      <div className="text-sm flex items-center justify-center space-x-2">
        <p>Made with ❤️ by</p>
        <span>
          <a href="https://rinmeng.github.io" target="_blank" rel="noreferrer">
            <img src={rmlogo} alt="rmlogo" className="w-16 h-auto mx-1" />
          </a>
        </span>
      </div>
      <p>
        All photos are provided by{" "}
        <a
          className="underline text-slate-300 hover:text-slate-400 t200e"
          href="https://www.tsengphoto.ca/"
          target="_blank"
        >
          Matthew Tseng
        </a>
      </p>
    </div>
  );
}
