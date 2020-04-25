import React from "react";
import NavBar from "./NavBar";

export default function UserNavBar() {
    const links = [
        {
            link: "/",
            title: "Home",
        },
        {
            link: "/browse",
            title: "Browse",
        },
    ];
    return <NavBar links={links} logout={true} />;
}
