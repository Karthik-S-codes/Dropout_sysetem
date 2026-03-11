export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white p-4 flex items-center justify-between shadow-md">
      <h1 className="font-extrabold text-lg">Dropout Prediction</h1>
      <div className="space-x-3">
        <a href="/" className="px-3 py-1 rounded hover:bg-white/10">Predict</a>
        <a href="/dashboard" className="px-3 py-1 rounded hover:bg-white/10">Dashboard</a>
      </div>
    </div>
  );
}
