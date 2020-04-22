import React from "react";
import EditPassword from "./EditPassword";
import EditDetails from "./EditDetails";

export default function UserEdit() {
    return (
        <div className="min-h-screen lg:flex sm:flex-column  items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <EditDetails/>
            <EditPassword/>
        </div>
    );
}