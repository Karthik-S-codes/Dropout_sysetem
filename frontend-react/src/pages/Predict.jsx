import { useState } from "react";
import api from "../api";

export default function Predict() {
  const [form, setForm] = useState({
    name: "",
    attendance: "",
    gpa: "",
    backlogs: "",
    assignment_rate: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post("/api/students/predict", form);
      setResult(res.data.student);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const riskBadge = (risk) => {
    if (!risk) return null;
    const color = risk === "High" ? "bg-rose-100 text-rose-800" : risk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800";
    return <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${color}`}>{risk}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-teal-50 to-emerald-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">Predict Dropout Risk</h2>
          <p className="text-indigo-600 mb-6">Quickly estimate a student's dropout risk and store the prediction.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
              <input name="attendance" type="number" min="0" max="100" value={form.attendance} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input name="gpa" type="number" step="0.1" min="0" max="10" value={form.gpa} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Backlogs</label>
              <input name="backlogs" type="number" min="0" value={form.backlogs} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Rate (%)</label>
              <input name="assignment_rate" type="number" min="0" max="100" value={form.assignment_rate} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white py-3 rounded-lg font-semibold">
                {loading && <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>}
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 border rounded bg-red-50 text-red-700">Error: {error}</div>
          )}

          {result && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-indigo-800">{result.name}</p>
                <p className="text-sm text-gray-600">Probability: <span className="font-medium">{Number(result.probability).toFixed(2)}</span></p>
              </div>
              <div className="text-right">
                {riskBadge(result.risk)}
                <p className="text-xs text-gray-500 mt-1">Saved to database</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
