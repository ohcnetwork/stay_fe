import React from "react";
import NavBar from "./NavBar";

export default function PublicNavBar() {
    const links = [
        {
            link: "/",
            title: "Home",
        },
        {
            link: "/login",
            title: "Login",
        },
    ];
    return <NavBar links={links} />;
}
