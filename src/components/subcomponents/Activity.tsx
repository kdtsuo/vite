interface ActivityProps {
  image: string;
  title: string;
  text: string;
  reverse: boolean;
  isLast?: boolean; // New prop to determine if it's the last element
}

export default function Activity({
  image,
  title,
  text,
  reverse,
  isLast = false,
}: ActivityProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={`flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } 
        w-full justify-center items-center md:space-x-4  overflow-hidden`}
      >
        <div className="w-full lg:w-1/2 flex justify-center pb-8">
          <img
            className="w-11/12 lg:w-5/6 h-auto rounded-xl shadow-lg 
                    t200e hover:scale-105 object-cover m-2"
            src={image}
            alt={title}
          />
        </div>
        <div
          className="w-11/12 lg:w-1/2 p-6 bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg max-w-lg 
            transition-transform duration-200 hover:-translate-y-3"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-lb-100 mb-4 capitalize">
            {title}
          </h2>
          <p className="text-lg text-white leading-relaxed">{text}</p>
        </div>
      </div>
      {!isLast && (
        <span className="w-1/2 h-1 bg-lb-100 rounded-full my-10"></span>
      )}
    </div>
  );
}
