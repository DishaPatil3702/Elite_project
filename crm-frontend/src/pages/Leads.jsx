// crm-frontend/src/pages/leads.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CreateLeadModal from "../components/CreateLeadModal";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/leads";


export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all leads (with optional search & filter)
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      let url = API_URL;
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter) params.append("status", statusFilter);
      if (params.toString()) url += `/?${params.toString()}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data || []);
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
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete lead");

      toast.success("Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
      toast.error("Failed to delete lead");
    }
  };

  // Update lead (inline)
  const updateLead = async (id, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
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

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Leads Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          + Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          className="border p-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="hot">Hot</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <button
          onClick={fetchLeads}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Loading leads...
            </p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No leads found.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Create Your First Lead
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-4">{lead.first_name} {lead.last_name}</td>
                    <td className="px-4 py-4">{lead.company}</td>
                    <td className="px-4 py-4">
                      <input
                        className="w-full px-2 py-1 text-sm border rounded"
                        value={lead.email || ""}
                        onChange={(e) =>
                          updateLead(lead.id, "email", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-4">{lead.phone}</td>
                    <td className="px-4 py-4">{lead.source}</td>
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-4">{lead.notes}</td>
                    <td className="px-4 py-4">
                      {lead.created
                        ? new Date(lead.created).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-4">
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

      {/* Create Modal */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadCreated={fetchLeads} // ✅ refresh table after add
      />
    </div>
  );
}
