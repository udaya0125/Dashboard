import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowDownUp, Eye, LoaderCircle, PenBoxIcon, Plus, Search, Trash, Upload } from 'lucide-react';
import { Link } from "@inertiajs/react";
import Wrapper from '../BarComponents/Wrapper';
import ContactForm from '@/AddFormComponemts/ContactForm';
import * as XLSX from "xlsx";
import EditContactForm from '@/EditFormComponents/EditContactForm ';

const ContactTable = () => {
    const [allContacts, setAllContacts] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [showContactForm, setShowContactForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(route("contacts.index"));
                setAllContacts(response.data || []);
            } catch (error) {
                console.error("fetching error", error);
                setAllContacts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        
        try {
            await axios.delete(route("contacts.destroy", { id }));
            setReloadTrigger(prev => !prev);
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            const response = await axios.post(
                route("contacts.update", { id }),
                formData
            );
            setReloadTrigger(prev => !prev);
            return response.data;
        } catch (error) {
            console.error("Error updating contact", error);
            throw error;
        }
    };

    const handleImportExport = () => {
        // Export functionality
        const dataToExport = filteredContacts.map((contact) => ({
            ID: contact.id || "",
            Name: contact.name || "",
            Email: contact.email || "",
            Tags: contact.tags || "",
            Project: contact.project || "",
            Status: contact.status || "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
        XLSX.writeFile(workbook, "contacts_data.xlsx");
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredContacts = allContacts
        .filter((contact) => {
            const name = contact.name ? contact.name.toLowerCase() : "";
            const email = contact.email ? contact.email.toLowerCase() : "";
            const tags = contact.tags ? contact.tags.toLowerCase() : "";
            const project = contact.project ? contact.project.toLowerCase() : "";
            const query = searchQuery.toLowerCase();

            return (
                name.includes(query) ||
                email.includes(query) ||
                tags.includes(query) ||
                project.includes(query)
            );
        })
        .sort((a, b) => {
            if (sortOption === "low") {
                return a.id - b.id;
            } else if (sortOption === "high") {
                return b.id - a.id;
            } else if (sortOption === "name-asc") {
                return (a.name || "").localeCompare(b.name || "");
            } else if (sortOption === "name-desc") {
                return (b.name || "").localeCompare(a.name || "");
            }
            return 0;
        });

    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28">
                <div className="">
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Contacts Information</h2>
                        <p className="text-lg text-gray-600">
                            Manage and organize all your contacts in one place
                        </p>
                    </div>

                    <ContactForm
                        showContactForm={showContactForm && !editingContact}
                        setShowContactForm={setShowContactForm}
                        editingContact={editingContact}
                        setEditingContact={setEditingContact}
                        setReloadTrigger={setReloadTrigger}
                        handleUpdate={handleUpdate}
                    />

                    <EditContactForm
                    showContactForm={showContactForm && editingContact}
                    setShowContactForm={setShowContactForm}
                    editingContact={editingContact}
                    setEditingContact={setEditingContact}
                    setReloadTrigger={setReloadTrigger}
                    handleUpdate={handleUpdate}
                />


                    <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:justify-between lg:items-center">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setReloadTrigger(prev => !prev)}
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <LoaderCircle className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-700">Refresh</span>
                            </button>

                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                                <ArrowDownUp className="h-4 w-4 text-gray-600" />
                                <select
                                    className="border-none focus:ring-0 bg-transparent text-sm text-gray-700 cursor-pointer"
                                    aria-label="Sort Options"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="">Sort By</option>
                                    <option value="low">ID Low to High</option>
                                    <option value="high">ID High to Low</option>
                                    <option value="name-asc">Name A-Z</option>
                                    <option value="name-desc">Name Z-A</option>
                                </select>
                            </div>
                        </div>

                        <form className="relative w-full sm:w-72">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search contacts..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>

                        <div className="flex flex-wrap gap-3 justify-start sm:justify-end">
                            <button
                                onClick={() => {
                                    setShowContactForm(true);
                                    setEditingContact(null);
                                }}
                                className="flex items-center gap-2 bg-[#7c3aed] text-white py-2.5 px-5 rounded-lg text-sm hover:bg-purple-700 transition-colors shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add New Contact
                            </button>
                            <button
                                onClick={handleImportExport}
                                className="flex items-center gap-2 bg-white py-2.5 px-5 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <Upload className="h-4 w-4" />
                                Import/Export
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="flex flex-col items-center">
                                    <LoaderCircle className="animate-spin h-10 w-10 text-purple-600 mb-3" />
                                    <p className="text-gray-600">Loading contacts...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr className="text-left text-gray-700">
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Image
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Tags
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Project
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredContacts.length > 0 ? (
                                            filteredContacts.map((contact) => (
                                                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {contact.id || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex justify-center">
                                                            {contact.image ? (
                                                                <img 
                                                                    src={`/images/${contact.image}`}
                                                                    alt={contact.name}
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null; 
                                                                        e.target.src = '/images/default-avatar.png';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-xs text-gray-500">No Image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {contact.name || "-"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {contact.email || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {contact.tags || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {contact.project || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                            contact.status === 'active' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : contact.status === 'inactive' 
                                                                    ? 'bg-red-100 text-red-800' 
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {contact.status?.toUpperCase() || "UNKNOWN"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingContact(contact);
                                                                    setShowContactForm(true);
                                                                }}
                                                                className="p-2 text-purple-600 hover:text-purple-900 rounded hover:bg-purple-50 transition-colors"
                                                                aria-label="Edit contact"
                                                            >
                                                                <PenBoxIcon className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => contact.id && handleDelete(contact.id)}
                                                                className="p-2 text-red-600 hover:text-red-900 rounded hover:bg-red-50 transition-colors"
                                                                aria-label="Delete contact"
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <Search className="h-12 w-12 mb-4 text-gray-300" />
                                                        <p className="text-lg font-medium mb-1">
                                                            No contacts found
                                                        </p>
                                                        <p className="text-sm">
                                                            Try adjusting your search or filter to find what you're looking for.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {filteredContacts.length > 0 && (
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <div>
                                Showing <span className="font-medium">1</span> to{" "}
                                <span className="font-medium">{filteredContacts.length}</span> of{" "}
                                <span className="font-medium">{filteredContacts.length}</span> results
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
                                    Previous
                                </button>
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default ContactTable;