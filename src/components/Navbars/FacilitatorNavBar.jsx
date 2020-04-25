import React from "react";
import NavBar from "./NavBar";

export default function FacilitatorNavBar() {
    const links = [
        {
            link: "/",
            title: "Home",
        },
        {
            link: "/edit",
            title: "Edit Profile",
        },
    ];
    return <NavBar links={links} logout={true} />;
}
