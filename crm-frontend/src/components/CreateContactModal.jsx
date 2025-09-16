//crm-sys//crm-frontend//src//components//CreateContactModal.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CreateContactModal({ isOpen, onClose, onContactCreated }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    job_title: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        // ✅ Ensure created timestamp is always included
        body: JSON.stringify({ ...formData, created: new Date().toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to create contact");

      toast.success("Contact created");
      onContactCreated(); // ✅ refresh list in parent
      onClose();
      setFormData({ first_name: "", last_name: "", email: "", phone: "", company: "", job_title: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create contact");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Contact</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid grid-cols-2 gap-2">
            <input name="first_name" placeholder="First name" required className="border p-2 rounded"
                   value={formData.first_name} onChange={handleChange}/>
            <input name="last_name" placeholder="Last name" required className="border p-2 rounded"
                   value={formData.last_name} onChange={handleChange}/>
          </div>
          <input type="email" name="email" required placeholder="Email" className="border p-2 rounded"
                 value={formData.email} onChange={handleChange}/>
          <input name="phone" placeholder="Phone" className="border p-2 rounded"
                 value={formData.phone} onChange={handleChange}/>
          <input name="company" placeholder="Company" className="border p-2 rounded"
                 value={formData.company} onChange={handleChange}/>
          <input name="job_title" placeholder="Job title" className="border p-2 rounded"
                 value={formData.job_title} onChange={handleChange}/>
          <textarea name="notes" placeholder="Notes" className="border p-2 rounded"
                    value={formData.notes} onChange={handleChange}/>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">
              {loading ? "Saving..." : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
