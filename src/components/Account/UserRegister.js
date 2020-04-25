import React from "react";
import Register from "./Register";

function UserRegister() {
    return (
        <Register
            type={"user"}
            label={"REGISTER AS CUSTOMER"}
            othertype={"Hotel Owner"}
            otherlinkid={"1"}
        />
    );
}

export default UserRegister;
