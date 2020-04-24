import React from "react";
import UserRegister from "./User_Register";
import FacilitatorRegister from "./Facilitator_Register";


export default function Register(usertype){
    
    if( usertype.id === "user"){
        return( <UserRegister/> );
    }
    else if ( usertype.id === "facilityowner"){
        return( <FacilitatorRegister/>);
    }
    else{
        return(
          <div className="h-screen flex justify-center py-16">
            Error 404: Page not found
          </div>
        )
    }
} 