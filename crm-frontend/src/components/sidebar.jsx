// src/components/Sidebar.jsx
export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">Dashboard</li>
        <li className="mb-2">Leads</li>
        <li className="mb-2">Settings</li>
      </ul>
    </div>
  );
}
