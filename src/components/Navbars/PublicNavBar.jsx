import React from 'react';
import { A } from 'hookrouter'

export default function PublicNavBar() {
  return (
    <nav className="bg-indigo-700 py-2 px-8 pt-2 shadow-md">
      <div className="-mb-px flex max-w-6xl mx-auto">
        <img className="px-10" alt="Logo" />
        {[
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
        ].map(route => (
          <A className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href={route.link}
            key={route.link}>
            {route.title}
          </A>
        ))}
      </div>
    </nav>
  )
}
