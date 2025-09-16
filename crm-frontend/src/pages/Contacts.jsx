// src/pages/Contacts.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CreateContactModal from "../components/CreateContactModal";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Always fetch fresh contacts from backend
  const fetchContacts = async (search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = search
        ? `${API_URL}/contacts/?search=${encodeURIComponent(search)}`
  : `${API_URL}/contacts/`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update only email/phone → then refresh list
  const updateContact = async (id, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to update");
      toast.success("Contact updated");
      await fetchContacts(searchTerm); // ✅ re-fetch to maintain order
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed");
    }
  };

  // ✅ Delete then refresh list
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || "Failed to delete");
      toast.success("Contact deleted");
      await fetchContacts(searchTerm); // ✅ refresh to maintain order
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contacts
        </h1>
        <div className="flex items-center gap-2">
          <input
            className="border p-2 rounded w-64"
            placeholder="Search by first name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => fetchContacts(searchTerm)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Contact
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center">No contacts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Company / Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Email (editable)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Phone (editable)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {c.first_name} {c.last_name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {c.company || "-"} {c.job_title ? ` / ${c.job_title}` : ""}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={c.email || ""}
                        onChange={(e) =>
                          updateContact(c.id, "email", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={c.phone || ""}
                        onChange={(e) =>
                          updateContact(c.id, "phone", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {c.notes || "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {c.created
                        ? new Date(c.created).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
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

      {/* Create modal */}
      <CreateContactModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onContactCreated={async () => {
    await fetchContacts();  // ✅ always refresh full sorted list
  }}
/>

    </div>
  );
}
