import React from 'react';
import { A, navigate } from 'hookrouter'

export default function NavBar(){
  return (
    <nav className="bg-indigo-700 py-2 px-8 pt-2 shadow-md">
     <div className="-mb-px flex max-w-6xl mx-auto">
       <img className="px-10" alt="Logo" />
       {[
         // {
         //   link: '/',
         //   title: 'Home'
         // },
         {
           link: '/',
           title: 'Home'
         },
       ].map(route=>(     
         <A className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
                  href={route.link}
          >
             {route.title}
         </A>
       ))}
        <A className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
           href='/logout'
           onClick={(e)=>{
              e.preventDefault()
              localStorage.setItem("stay_access_token","")
              navigate("/")
              window.location.reload()
           }}
        >
          LOGOUT
        </A>
     </div>
    </nav>
  )
}
