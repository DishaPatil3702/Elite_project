import { useState } from "react";

export default function CreateLeadModal({ isOpen, onClose, onLeadCreated }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "new",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // ✅ Auth token from login
      const response = await fetch("http://localhost:8000/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create lead");

      const newLead = await response.json();
      onLeadCreated(newLead); // ✅ tell dashboard to refresh
      onClose();
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="source"
            placeholder="Source (e.g. Website, Referral)"
            value={formData.source}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
