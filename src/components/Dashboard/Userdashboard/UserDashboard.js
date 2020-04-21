import React from "react";
import { A } from "hookrouter";
import {  useSelector } from 'react-redux';
import { DEFAULT_IMAGE } from "../../../Common/constants";




function Home() {

    const defimage="https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg"
     
     //user=user[0];
    const state = useSelector(state => state);
    const { currentUser } = state;
    const user=currentUser.data.data;
    //console.log(user);
    console.log(user.image);
    if(user.image==null){
        user.image=DEFAULT_IMAGE.USER;
    }
  return (



<div className="mt-10 " >
  <div class="bg-gray-200 py-4 px-3 lg:w-1/2 w-3/4 m-0 m-auto sm:max-w-full max-w-md rounded overflow-hidden shadow-lg"> 
  <A href="/edit" class="bg-blue-500  hover:bg-blue-700 px-5 py-2 text-white font-bold h-2 w-full rounded-full">
  Edit data
</A>
        <div class="text-center p-6  border-b">
      <img class="h-40 w-40 rounded-full mx-auto" src={user.image} alt="Randy Robertson" />
      <p class="pt-2 text-xl font-semibold">
        {user.name}
      </p>
      <p class="text-lg text-gray-800">
      {user.email}
      </p>
      <p class="text-lg text-gray-800">
      {user.mobno}
      </p>
      <div class="mt-5">
        <A href="/history" class="bg-white hover:bg-blue-500 text-blue-700 font-semibold mt-6 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Booking history 
        </A>
      </div>
    </div>
  </div>
</div>

  );
}

export default Home;