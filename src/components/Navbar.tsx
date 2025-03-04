export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white p-4 w-full">
      <h1 className="text-2xl font-bold">Navbar</h1>
      <div>
        <a href="#" className="hover:underline">
          Link 1
        </a>
        <a href="#" className="hover:underline ml-4">
          Link 2
        </a>
      </div>
    </div>
  );
}
