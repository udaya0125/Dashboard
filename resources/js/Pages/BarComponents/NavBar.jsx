import axios from "axios";
import {
    AlignJustify,
    Bell,
    ChevronDown,
    Grid2X2,
    Map,
    Search,
    Settings,
    Square,
    MessageSquare,
    ShoppingCart,
    Calendar,
    Mail,
    Star,
    Sliders,
    List,
    PieChart
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const NavBar = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const megaMenuRef = useRef(null);
    const profileMenuRef = useRef(null);
    const notificationRef = useRef(null);
    

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setIsMegaMenuOpen(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Sample notifications data
    const notifications = [
        { id: 1, icon: <MessageSquare size={16} />, text: "New message from Sarah", time: "2 min ago" },
        { id: 2, icon: <ShoppingCart size={16} />, text: "Your order has been shipped", time: "1 hour ago" },
        { id: 3, icon: <Bell size={16} />, text: "Reminder: Meeting at 3 PM", time: "3 hours ago" },
    ];
   const handleLogout =()=>{
    axios.post(route('logout')).then(response =>{
        console.log(response.data)
        if (response.data.redirect) {
            window.location.href = response.data.redirect
            
        } else {
            window.location.href = '/login'
            
        }
    })
    .catch(error=>{
        console.error('logout error:', error)
        toast.error('Failed to logout, Please try again')
    })
   }
   
    return (
        <div className="w-full px-4 md:px-6 lg:px-10 py-6 bg-white shadow-lg md:w-[82%] fixed top-0 right-0 z-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 max-w-xl">
                    <button 
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Toggle menu"
                    >
                        <AlignJustify className="w-5 h-5" />
                    </button>

                    <div className="relative w-72">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Search"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    <div className="relative" ref={megaMenuRef}>
                        <button 
                            className="flex items-center gap-1 text-gray-700 font-light cursor-pointer hover:text-blue-500"
                            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                            aria-expanded={isMegaMenuOpen}
                            aria-haspopup="true"
                        >
                            <span>Mega Menu</span>
                            <ChevronDown size={16} />
                        </button>
                        
                        {isMegaMenuOpen && (
                            <div className="absolute left-0 mt-2 w-[800px] bg-white rounded-md shadow-xl py-4 z-30 border border-gray-100">
                                <div className="grid grid-cols-4 gap-4 px-6">
                                    {/* Lightbox Column */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                            <Sliders size={16} /> Lightbox
                                        </h3>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Range Slider</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Sweet Alert</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Rating</a></li>
                                        </ul>
                                    </div>
                                    
                                    {/* Applications Column */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                            <List size={16} /> Applications
                                        </h3>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Ecommerce</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Calendar</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Email</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Projects</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Tasks</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Contacts</a></li>
                                        </ul>
                                    </div>
                                    
                                    {/* Extra Pages Column */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                            <Square size={16} /> Extra Pages
                                        </h3>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Light Sidebar</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Compact Sidebar</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Horizontal layout</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Maintenance</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Coming Soon</a></li>
                                        </ul>
                                    </div>
                                    
                                    {/* UI Components Column */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                            <PieChart size={16} /> UI Components
                                        </h3>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Forms</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Tables</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Charts</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Lightbox</a></li>
                                            <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 block py-1">Range Slider</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="hover:text-blue-500" aria-label="Map">
                        <Map className="w-5 h-5" />
                    </button>
                    <button className="hover:text-blue-500" aria-label="Grid">
                        <Grid2X2 className="w-5 h-5" />
                    </button>
                    <button className="hover:text-blue-500" aria-label="Square">
                        <Square className="w-5 h-5" />
                    </button>

                    {/* Notifications Dropdown */}
                    <div className="relative" ref={notificationRef}>
                        <button 
                            className="hover:text-blue-500 relative"
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            aria-label="Notifications"
                            aria-expanded={isNotificationOpen}
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl py-1 z-30 border border-gray-100">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <a 
                                            key={notification.id} 
                                            href="#" 
                                            className="flex items-start px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="flex-shrink-0 text-blue-500 mt-1">
                                                {notification.icon}
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <div className="px-4 py-2 text-center border-t border-gray-100">
                                    <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                                        View all notifications
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileMenuRef}>
                        <button 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            aria-expanded={isProfileMenuOpen}
                            aria-haspopup="true"
                        >
                            <img
                                src="/pic.png"
                                alt="User profile"
                                className="rounded-full h-10 w-10 object-cover"
                            />
                            <div className="flex items-center gap-1 text-gray-700 font-light hover:text-blue-500">
                                <span>admin</span>
                                <ChevronDown size={16} />
                            </div>
                        </button>
                        
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-30 border border-gray-100">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Your Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                                <div className="border-t border-gray-100"></div>
                                <button onClick={ handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</button>
                            </div>
                        )}
                    </div>

                    <button className="hover:text-blue-500" aria-label="Settings">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;