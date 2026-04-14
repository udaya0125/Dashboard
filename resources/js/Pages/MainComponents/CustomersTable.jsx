import axios from "axios";
import {
    ArrowDownUp,
    Delete,
    Edit,
    EllipsisVertical,
    LoaderCircle,
    Plus,
    Search,
    Trash,
    Upload,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Wrapper from "../BarComponents/Wrapper";
import CustomersForm from "@/AddFormComponemts/CustomersForm";
import EditForm from "@/EditFormComponents/EditForm";

const CustomersTable = () => {
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [allCustomers, setAllCustomers] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(route("customers.index"));
                setAllCustomers(response.data);
            } catch (error) {
                console.error("fetching error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?"))
            return;

        try {
            await axios.delete(route("customers.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowCustomerForm(true);
    };

    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            const response = await axios.post(
                route("customers.update", { id }),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            setReloadTrigger((prev) => !prev);
            return response.data;
        } catch (error) {
            console.error("Error updating customer", error);
            throw error;
        }
    };

    const handleImportExport = () => {
        // Export functionality
        const dataToExport = filteredCustomers.map((customer) => ({
            ID: customer.id,
            Name: customer.customer_name,
            "Phone Number": customer.phone,
            Email: customer.email,
            Address: customer.address,
            Status: customer.status,
            Image: customer.image,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, "customers_data.xlsx");
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredCustomers = allCustomers
        .filter(
            (customer) =>
                customer.customer_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                customer.phone
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                customer.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                customer.address
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        )
        .sort((a, b) => {
            if (sortOption === "low") {
                return a.id - b.id;
            } else if (sortOption === "high") {
                return b.id - a.id;
            } else if (sortOption === "name-asc") {
                return a.customer_name.localeCompare(b.customer_name);
            } else if (sortOption === "name-desc") {
                return b.customer_name.localeCompare(a.customer_name);
            }
            return 0;
        });

    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28">
                <div className="p-12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Customers Information
                        </h2>
                        <p className="text-lg font-light text-gray-600">
                            Manage customer information and details here.
                        </p>
                    </div>

                    <CustomersForm
                        showCustomerForm={showCustomerForm}
                        setShowCustomerForm={setShowCustomerForm}
                        editingCustomer={editingCustomer}
                        setEditingCustomer={setEditingCustomer}
                        reloadTrigger={reloadTrigger}
                        setReloadTrigger={setReloadTrigger}
                        handleUpdate={handleUpdate}
                    />

                    <EditForm
                        showForm={showCustomerForm && !!editingCustomer}
                        setShowForm={setShowCustomerForm}
                        editingCustomer={editingCustomer}
                        setEditingCustomer={setEditingCustomer}
                        setReloadTrigger={setReloadTrigger}
                        handleUpdate={handleUpdate}
                    />

                    <div className="flex flex-col gap-6 mt-10 lg:flex-row lg:justify-between">
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                            <button
                                onClick={() =>
                                    setReloadTrigger((prev) => !prev)
                                }
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <LoaderCircle className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-700">
                                    Refresh
                                </span>
                            </button>

                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                                <ArrowDownUp className="h-4 w-4 text-gray-600" />
                                <select
                                    className="border-none focus:ring-0 bg-transparent text-sm text-gray-700 cursor-pointer"
                                    aria-label="Sort Options"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="">Default</option>
                                    <option value="low">ID Low to High</option>
                                    <option value="high">ID High to Low</option>
                                    <option value="name-asc">Name A-Z</option>
                                    <option value="name-desc">Name Z-A</option>
                                </select>
                            </div>
                        </div>

                        <form className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search name, phone, email, address..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </form>

                        <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                            <button
                                onClick={() => {
                                    setShowCustomerForm(true);
                                    setEditingCustomer(null);
                                }}
                                className="flex items-center gap-2 bg-[#9960fa] text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors shadow-md"
                            >
                                <Plus className="h-4 w-4" />
                                Add new
                            </button>
                            <button
                                onClick={handleImportExport}
                                className="flex items-center gap-2 bg-white py-2 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors shadow-md"
                            >
                                <Upload className="h-4 w-4" />
                                Import/Export
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <LoaderCircle className="animate-spin h-12 w-12 text-purple-600" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Gender
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                DOB
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCustomers.length > 0 ? (
                                            filteredCustomers.map(
                                                (customer) => (
                                                    <tr
                                                        key={customer.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {customer.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                        src={`/storage/${customer.image}`}
                                                                        alt={
                                                                            customer.customer_name
                                                                        }
                                                                        onError={(
                                                                            e,
                                                                        ) => {
                                                                            e.target.onerror =
                                                                                null;
                                                                            e.target.src =
                                                                                "/default-avatar.png";
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {
                                                                            customer.customer_name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {customer.phone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {customer.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                                            {customer.address}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <span className="capitalize">
                                                                {
                                                                    customer.gender
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                                    customer.status ===
                                                                    "active"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : customer.status ===
                                                                            "inactive"
                                                                          ? "bg-red-100 text-red-800"
                                                                          : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                            >
                                                                {
                                                                    customer.status
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {
                                                                customer.date_of_birth
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-3">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            customer,
                                                                        )
                                                                    }
                                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                                >
                                                                    <Edit />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            customer.id,
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                                >
                                                                    <Trash />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="9"
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            No customers found
                                                        </h3>
                                                        <p className="text-gray-500 mt-1">
                                                            Try adjusting your
                                                            search or filter to
                                                            find what you're
                                                            looking for.
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
                </div>
            </div>
        </Wrapper>
    );
};

export default CustomersTable;
