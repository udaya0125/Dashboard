import React from "react";

const Footer = () => {
    return (
        <footer className="py-4 w-full md:w-[82%] px-4 fixed bottom-0 right-0 bg-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm  mb-2 md:mb-0">2025 &copy; Skote.</p>
                <p className="text-sm  ">
                    Designed & Developed by{" "}
                    <span className="font-medium">SAIT SOLUTION</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
