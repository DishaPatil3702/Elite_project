// src/components/LeadsTable.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LeadsTable({ reloadKey = 0 }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all leads (with optional search)
  const fetchLeads = async (search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = search?.trim()
        ? `${API_URL}/leads/?search=${encodeURIComponent(search.trim())}`
        : `${API_URL}/leads/`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching leads:", err);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  // Delete lead
  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete lead");

      toast.success("Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
      toast.error("Failed to delete lead");
    }
  };

  // Update lead
  const updateLead = async (id, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      const updatedLead = await res.json();
      toast.success("Lead updated");

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...updatedLead } : l))
      );
    } catch (err) {
      console.error("Error updating lead:", err);
      toast.error("Failed to update lead");
    }
  };

  // Initial + reloads
  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  // Debounced search
  useEffect(() => {
    const id = setTimeout(() => {
      if (searchTerm.trim() === "") fetchLeads("");
      else fetchLeads(searchTerm);
    }, 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow">
      <h2 className="text-2xl font-bold mb-4">All Leads</h2>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by first name..."
          className="border p-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchLeads(searchTerm);
          }}
        />
        <button
          onClick={() => fetchLeads(searchTerm)}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearchTerm("");
            fetchLeads("");
          }}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2">Owner Email</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.first_name || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "first_name", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.last_name || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "last_name", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.company || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "company", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.email || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.phone || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "phone", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.source || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "source", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      className="border rounded p-1"
                      value={lead.status}
                      onChange={(e) =>
                        updateLead(lead.id, "status", e.target.value)
                      }
                    >
                      <option value="new">New</option>
                      <option value="hot">Hot</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <textarea
                      className="border rounded p-1 w-full"
                      rows="1"
                      value={lead.notes || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "notes", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">{lead.owner_email}</td>
                  <td className="border p-2">
                    {lead.created
                      ? new Date(lead.created).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
