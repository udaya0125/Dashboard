import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

const Wrapper = ({children}) => {
    const [showResponsiveSidebar,setShowResponsiveSideBar]=useState(false)
  const [show,setShow]=useState(false)
    return (
        <div>
            <NavBar
                showResponsiveSidebar={showResponsiveSidebar}
                setShowResponsiveSideBar={setShowResponsiveSideBar}
                setShow={setShow}
            />
            {children}

            <SideBar
                showResponsiveSidebar={showResponsiveSidebar}
                setShowResponsiveSideBar={setShowResponsiveSideBar}
                show={show}
                setShow={setShow}
            />
            <Footer />
        </div>
    );
};

export default Wrapper;
