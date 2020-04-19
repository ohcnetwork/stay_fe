import React , {useEffect , useState } from "react";
import StarRatingComponent from 'react-star-rating-component';
import {  useSelector , useDispatch } from 'react-redux';

import {getBookingHistory} from "../../Redux/actions";

export default function ViewRoom() {


var item=[];
const state = useSelector(state => state);
const { currentUser } = state;
const user=currentUser.data.data;

const dispatch = useDispatch();

const [form, setForm] = useState({});

var defimg="https://www.galeriemagazine.com/wp-content/uploads/2018/07/Bulgari-Shanghai-Room-1366x768-2.jpg";
var i=0;

useEffect(() => {
    dispatch(getBookingHistory(user)).then(resp => 
      { 
       // const { status: statusCode } = resp;
        const { data: res } = resp;
        setForm(res.data);
      }  )
      
}, [dispatch, user]);

var count = form.length;
for(i=0;i<count;i++){
    if(form[i].image === null){
      form[i].image=defimg;
    }
    item=item.concat(form[count-1-i]);

}
console.log(item);
        if(count===0){
          return(
            <div className="py-10 bg-white min-h-full">
             <div className="text-center">
                <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                  Booking History
              </h2>
            </div>
            <div  className="w-2/6 bg-gray-300 p-10  my-8 mx-auto  text-center rounded overflow-hidden shadow-lg">
                <h3 className=" m-0 text-lg m-auto">No Booking History !</h3>
            </div>
            </div>
          );
        }
        

        else return(
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
                    <div  className="w-6/12 bg-gray-300 mx-auto my-8  rounded overflow-hidden shadow-lg">
                        <img className="w-full  h-30" src={value.image} alt="Room Picture"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{value.name}</div>
                                <p className="text-gray-700 text-base">
                                    <ul>
                                    <li>Room Type :  <span>
                                    <StarRatingComponent 
                                        className="text-lg"
                                        name="rate1" 
                                        starCount={5}
                                        value={value.category}
                                    /></span></li>
                                    <li>Checkin : {new Date(value.checkinDate).toLocaleString()}</li>
                                    <li>Checkout : {new Date(value.checkoutDate).toLocaleString()}</li>
                                    <li>Paid : Rs {value.cost}</li>
                                    </ul>
                                </p>
                            </div>
                    </div>
                        )})}
        </div>  
      </div>
    </div>)
}
