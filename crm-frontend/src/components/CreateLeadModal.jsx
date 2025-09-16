// src/components/CreateLeadModal.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function CreateLeadModal({ isOpen, onClose, onLeadCreated }) {
  const { user } = useAuth(); // ✅ get logged-in user info

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "new",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL
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
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        owner_email: user?.email || "unknown@crm.local",
      };
      const response = await fetch(`${API_URL}/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // backend returns { message, lead }
        onLeadCreated(data.lead);
        toast.success(data.message || "✅ Lead created successfully!");
        onClose();
        setFormData({
          first_name: "",
          last_name: "",
          company: "",
          email: "",
          phone: "",
          source: "",
          status: "new",
          notes: "",
        });
      } else {
        console.error("Backend error:", data);
        toast.error(data.detail || "Failed to create lead");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      toast.error("Failed to create lead. Try again.");
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
              className="border p-2 rounded text-blue-600 placeholder-gray-400"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="border p-2 rounded text-blue-600 placeholder-gray-400"
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
          />

          <input
            type="text"
            name="source"
            placeholder="Source (e.g. Website, Referral)"
            value={formData.source}
            onChange={handleChange}
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
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
            className="border p-2 rounded text-blue-600 placeholder-gray-400"
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
