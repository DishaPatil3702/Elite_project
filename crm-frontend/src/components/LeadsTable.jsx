import React, { useEffect, useState } from "react";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:8000/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  

  // Update lead
  const handleUpdate = async (id, updatedLead) => {
    try {
      await fetch(`http://localhost:8000/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedLead),
      });
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  // Delete lead
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeads();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Your Leads</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              {editingLead === lead.id ? (
                <>
                  <td className="px-4 py-2 border">
                    <input
                      defaultValue={lead.first_name}
                      onChange={(e) =>
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === lead.id ? { ...l, first_name: e.target.value } : l
                          )
                        )
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      defaultValue={lead.last_name}
                      onChange={(e) =>
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === lead.id ? { ...l, last_name: e.target.value } : l
                          )
                        )
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      defaultValue={lead.email}
                      onChange={(e) =>
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === lead.id ? { ...l, email: e.target.value } : l
                          )
                        )
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      defaultValue={lead.status}
                      onChange={(e) =>
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === lead.id ? { ...l, status: e.target.value } : l
                          )
                        )
                      }
                      className="border p-1 rounded"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() =>
                        handleUpdate(
                          lead.id,
                          leads.find((l) => l.id === lead.id)
                        )
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingLead(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border">{lead.first_name}</td>
                  <td className="px-4 py-2 border">{lead.last_name}</td>
                  <td className="px-4 py-2 border">{lead.email}</td>
                  <td className="px-4 py-2 border">{lead.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => setEditingLead(lead.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
