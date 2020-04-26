import React from "react";
import NavBar from "./NavBar";

export default function UserNavBar() {
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
