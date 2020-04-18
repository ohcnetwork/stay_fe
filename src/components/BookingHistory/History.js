import React from "react";
import hisdata from "./hisdata";
export default function ViewRoom() {

const id_now="user1";var i=0;var history_now="";
var item=[];
for(i=0;i<hisdata.length;i++){
    if(hisdata[i].userid===id_now){
        history_now=hisdata[i];
    }
}
for(i=0;i<history_now.hotels.length;i++){
    item=item.concat(history_now.hotels[i]);
}
console.log(history_now.hotels[0]);
console.log(item);
        return(
    <div className="py-10 bg-white min-h-full">
      <div className="max-w-5xl  mx-auto   overflow-hidden  sm:rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Booking History
          </h2>
        </div>
        <div className="relative  content-center  m-8 lg:mx-8 lg:my-4 lg:max-w-5xl">
            {item.map((value,index) =>  {
                return (
                    <div id="" className="w-6/12 bg-gray-300 mx-auto my-8  rounded overflow-hidden shadow-lg">
                        <img className="w-full  h-30" src={value.image} alt="Sunset in the mountains"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{value.name}</div>
                                <p className="text-gray-700 text-base">
                                    <ul>
                                    <li>Room Type : {value.type}</li>
                                    <li>Booked : {value.booking_date}</li>
                                    <li>Status : {value.status}</li>
                                    <li>Paid : {value.paid}</li>
                                    </ul>
                                </p>
                            </div>
                    </div>
                        )})}
        </div>  
      </div>
    </div>)
}
