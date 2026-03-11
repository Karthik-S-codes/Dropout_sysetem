import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/api/students").then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Predictions</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Risk</th>
            <th className="border p-2">Probability</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.risk}</td>
              <td className="border p-2">{s.probability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
