import React from "react";
import NavBar from "./NavBar";

export default function UserNavBar() {
    const links = [
        {
            link: '/login',
            title: 'Login'
        },
        {
            link: '/register',
            title: 'Register'
        },
        {
            link: '/browse',
            title: 'Browse'
        },
    ];
    return <NavBar links={links} />
}
