import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import { toast } from "react-hot-toast";
import CreateLeadModal from "../components/CreateLeadModal";


export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created", { ascending: false }); // ✅ schema field
      if (error) throw error;
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
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
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
      const { error } = await supabase
        .from("leads")
        .update({ [field]: value })
        .eq("id", id);
      if (error) throw error;
      toast.success("Lead updated");
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
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
    <div className="p-6">
      {/* Header with Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leads Management</h2>
        <button
  onClick={() => setIsModalOpen(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  + Add Lead
</button>

      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="border p-2">{lead.company}</td>
                  <td className="border p-2">
                    <input
                      className="border rounded p-1 w-full"
                      value={lead.email || ""}
                      onChange={(e) =>
                        updateLead(lead.id, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">{lead.phone}</td>
                  <td className="border p-2">{lead.source}</td>
                  <td className="border p-2">{lead.status}</td>
                  <td className="border p-2">{lead.notes}</td>
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

      {/* Create Modal */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadCreated={fetchLeads} // ✅ refresh table after add
      />
    </div>
  );
}
