import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Folder,
    ShoppingCart,
    Bitcoin,
    Mail,
    FileText,
    Clipboard,
    File,
    Users,
    BookOpen,
    Briefcase,
    Lock,
    Settings,
    Grid,
    Edit,
    Table,
    PieChart,
    Rocket,
    MapPin,
    Layers,
} from "lucide-react";
import React, { useState } from "react";

const SideBar = () => {
    const [openDropdowns, setOpenDropdowns] = useState({
        dashboard: false,
        ecommerce: false,
        crypto: false,
        email: false,
        invoices: false,
        projects: false,
        tasks: false,
        contacts: false,
        blog: false,
        jobs: false,
        authentication: false,
        utility: false,
        uiElements: false,
        forms: false,
        tables: false,
        charts: false,
        icons: false,
        maps: false,
        multiLevel: false,
    });

    const toggleDropdown = (dropdown) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [dropdown]: !prev[dropdown],
        }));
    };

    return (
        <div className="lg:w-[18%] md:w-[90%]  hidden  md:block p-4 h-screen bg-white shadow-lg fixed top-0 left-0 z-20 overflow-y-auto">
            <div className="flex items-center mb-8 pl-8 bg-white pt-3">
                <div className="bg-gray-100 rounded-lg p-6 mr-3">
                    <img
                        src="../logo.png"
                        alt="Logo"
                        className="h-16 w-16 object-contain"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                {/* Menu Section */}
                <div className="text-sm text-gray-500 font-light px-4 mb-2">
                    Menu
                </div>
                <div>
                    <div
                        onClick={() => toggleDropdown("dashboard")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <LayoutDashboard
                                    size={20}
                                    className="text-gray-500"
                                />
                            </span>
                            <span className="text-base font-medium">
                                Dashboard
                            </span>
                        </div>
                        {openDropdowns.dashboard ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.dashboard && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/dashboard/analytics"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Analytics
                            </a>
                            <a
                                href="/dashboard/sales"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Sales
                            </a>
                            <a
                                href="/dashboard/crm"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                CRM
                            </a>
                        </div>
                    )}
                </div>

                {/* Apps Section */}
                <div className="text-sm text-gray-500 font-light px-4 mb-2 mt-4">
                    Apps
                </div>

                <a
                    href="/calendar"
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                            <Calendar size={20} className="text-gray-600" />
                        </span>
                        <span className="text-base font-medium">Calendar</span>
                    </div>
                </a>

                <a
                    href="/chat"
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                            <MessageSquare
                                size={20}
                                className="text-gray-600"
                            />
                        </span>
                        <span className="text-base font-medium">Chat</span>
                    </div>
                </a>

                {/* <a
                    href="/file-manager"
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                            <Folder size={20} />
                        </span>
                        <span className="text-base font-medium">File Manager</span>
                    </div>
                </a> */}

                <div>
                    <div
                        onClick={() => toggleDropdown("ecommerce")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <ShoppingCart
                                    size={20}
                                    className="text-gray-600"
                                />
                            </span>
                            <span className="text-base font-medium">
                                Ecommerce
                            </span>
                        </div>
                        {openDropdowns.ecommerce ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.ecommerce && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/ecommerce/products"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Products
                            </a>
                            {/* <a href="/ecommerces/orders" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Orders</a> */}
                            <a
                                href="/ecommerces/customers"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Customers
                            </a>
                            <a
                                href="/ecommerces/faq"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                FAQ
                            </a>
                        </div>
                    )}
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('crypto')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
                                <Bitcoin size={20} className="text-gray-600" />
                            </span>
                            <span className="text-base font-medium">Crypto</span>
                        </div>
                        {openDropdowns.crypto ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.crypto && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/crypto/wallet" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Wallet</a>
                            <a href="/crypto/transactions" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Transactions</a>
                            <a href="/crypto/exchange" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Exchange</a>
                        </div>
                    )}
                </div> */}

                {/* Additional Section */}
                <div className="text-sm text-gray-500 font-light px-4 mb-2 mt-4">
                    Additional
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('email')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Mail size={20} className="text-gray-600" />
                            </span>
                            <span className="text-base font-medium">Email</span>
                        </div>
                        {openDropdowns.email ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.email && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/email/inbox" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Inbox</a>
                            <a href="/email/compose" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Compose</a>
                            <a href="/email/templates" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Templates</a>
                        </div>
                    )}
                </div> */}

                <div>
                    <div
                        onClick={() => toggleDropdown("invoices")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <FileText size={20} />
                            </span>
                            <span className="text-base font-medium">
                                Invoices
                            </span>
                        </div>
                        {openDropdowns.invoices ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.invoices && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/invoices/list"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                List
                            </a>
                            <a
                                href="/invoices/details"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Details
                            </a>
                            <a
                                href="/invoices/create"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Create
                            </a>
                        </div>
                    )}
                </div>

                <div>
                    <div
                        onClick={() => toggleDropdown("projects")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Clipboard size={20} />
                            </span>
                            <span className="text-base font-medium">
                                Projects
                            </span>
                        </div>
                        {openDropdowns.projects ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.projects && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/projects/list"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                List
                            </a>
                            <a
                                href="/projects/details"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Details
                            </a>
                            <a
                                href="/projects/create"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Create
                            </a>
                        </div>
                    )}
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('tasks')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <File size={20} />
                            </span>
                            <span className="text-base font-medium">Tasks</span>
                        </div>
                        {openDropdowns.tasks ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.tasks && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/tasks/list" className="block py-2 text-sm text-gray-600 hover:text-blue-500">List</a>
                            <a href="/tasks/kanban" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Kanban</a>
                            <a href="/tasks/create" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Create</a>
                        </div>
                    )}
                </div> */}

                <div>
                    <div
                        onClick={() => toggleDropdown("contacts")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Users size={20} />
                            </span>
                            <span className="text-base font-medium">
                                Contacts
                            </span>
                        </div>
                        {openDropdowns.contacts ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.contacts && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/contacts/grid"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Grid View
                            </a>
                            <a
                                href="/contacts/list"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                List View
                            </a>
                            <a
                                href="/contacts/profile"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Profile
                            </a>
                        </div>
                    )}
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('blog')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <BookOpen size={20} />
                            </span>
                            <span className="text-base font-medium">Blog</span>
                        </div>
                        {openDropdowns.blog ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.blog && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/blog/list" className="block py-2 text-sm text-gray-600 hover:text-blue-500">List</a>
                            <a href="/blog/details" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Details</a>
                            <a href="/blog/create" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Create</a>
                        </div>
                    )}
                </div> */}

                <div>
                    <div
                        onClick={() => toggleDropdown("jobs")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Briefcase size={20} />
                            </span>
                            <span className="text-base font-medium">Jobs</span>
                        </div>
                        {openDropdowns.jobs ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.jobs && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/jobs/list"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                List
                            </a>
                            <a
                                href="/jobs/details"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Details
                            </a>
                            <a
                                href="/jobs/apply"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Apply
                            </a>
                        </div>
                    )}
                </div>

                {/* Authentication Section */}
                <div className="text-sm text-gray-500 font-light px-4 mb-2 mt-4">
                    Authentication
                </div>

                <div>
                    <div
                        onClick={() => toggleDropdown("authentication")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Lock size={20} />
                            </span>
                            <span className="text-base font-medium">
                                Authentication
                            </span>
                        </div>
                        {openDropdowns.authentication ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.authentication && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/auth/login"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Login
                            </a>
                            <a
                                href="/auth/register"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Register
                            </a>
                            <a
                                href="/auth/forgot-password"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Forgot Password
                            </a>
                        </div>
                    )}
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('utility')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Settings size={20} />
                            </span>
                            <span className="text-base font-medium">Utility</span>
                        </div>
                        {openDropdowns.utility ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.utility && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/utility/faq" className="block py-2 text-sm text-gray-600 hover:text-blue-500">FAQ</a>
                            <a href="/utility/pricing" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Pricing</a>
                            <a href="/utility/maintenance" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Maintenance</a>
                        </div>
                    )}
                </div> */}

                {/* Components Section */}

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('uiElements')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Grid size={20} />
                            </span>
                            <span className="text-base font-medium">UI Elements</span>
                        </div>
                        {openDropdowns.uiElements ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.uiElements && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/ui/alerts" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Alerts</a>
                            <a href="/ui/buttons" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Buttons</a>
                            <a href="/ui/cards" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Cards</a>
                        </div>
                    )}
                </div> */}

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('forms')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Edit size={20} />
                            </span>
                            <span className="text-base font-medium">Forms</span>
                        </div>
                        {openDropdowns.forms ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.forms && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/forms/basic" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Basic Elements</a>
                            <a href="/forms/advanced" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Advanced</a>
                            <a href="/forms/validation" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Validation</a>
                        </div>
                    )}
                </div> */}

                <div>
                    <div
                        onClick={() => toggleDropdown("tables")}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Table size={20} />
                            </span>
                            <span className="text-base font-medium">
                                Tables
                            </span>
                        </div>
                        {openDropdowns.tables ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={16} className="text-gray-500" />
                        )}
                    </div>
                    {openDropdowns.tables && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a
                                href="/tables/basic"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Basic Tables
                            </a>
                            <a
                                href="/tables/data"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Data Tables
                            </a>
                            <a
                                href="/tables/editable"
                                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
                            >
                                Editable Tables
                            </a>
                        </div>
                    )}
                </div>

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('charts')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <PieChart size={20} />
                            </span>
                            <span className="text-base font-medium">Charts</span>
                        </div>
                        {openDropdowns.charts ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.charts && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/charts/apex" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Apex Charts</a>
                            <a href="/charts/chartjs" className="block py-2 text-sm text-gray-600 hover:text-blue-500">ChartJS</a>
                            <a href="/charts/morris" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Morris Charts</a>
                        </div>
                    )}
                </div> */}

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('icons')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Rocket size={20} />
                            </span>
                            <span className="text-base font-medium">Icons</span>
                        </div>
                        {openDropdowns.icons ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.icons && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/icons/lucide" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Lucide</a>
                            <a href="/icons/font-awesome" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Font Awesome</a>
                            <a href="/icons/material" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Material Icons</a>
                        </div>
                    )}
                </div> */}

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('maps')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <MapPin size={20} />
                            </span>
                            <span className="text-base font-medium">Maps</span>
                        </div>
                        {openDropdowns.maps ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.maps && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/maps/google" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Google Maps</a>
                            <a href="/maps/vector" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Vector Maps</a>
                            <a href="/maps/leaflet" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Leaflet Maps</a>
                        </div>
                    )}
                </div> */}

                {/* <div>
                    <div 
                        onClick={() => toggleDropdown('multiLevel')}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg">
                                <Layers size={20} />
                            </span>
                            <span className="text-base font-medium">Multi Level</span>
                        </div>
                        {openDropdowns.multiLevel ? 
                            <ChevronDown size={16} className="text-gray-500" /> : 
                            <ChevronRight size={16} className="text-gray-500" />
                        }
                    </div>
                    {openDropdowns.multiLevel && (
                        <div className="ml-12 pl-2 py-1 space-y-2">
                            <a href="/multi/level1" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Level 1</a>
                            <a href="/multi/level2" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Level 2</a>
                            <a href="/multi/level3" className="block py-2 text-sm text-gray-600 hover:text-blue-500">Level 3</a>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default SideBar;
