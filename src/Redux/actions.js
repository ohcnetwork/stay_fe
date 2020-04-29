import { fireRequest, actions } from "./fireRequest";

export const postRegister = (form) => {
    return fireRequest("register", [], form);
};
export const postLogin = (form) => {
    return fireRequest("login", [], form);
};

export const postAddHotel = (form) => {
    return fireRequest("addFacility", [], form, "", true);
};
export const changePassword = (form) => {
    return fireRequest("changepassword", [], form);
};

export const getBookingHistory = () => {
    return fireRequest("bookingHistory");
};
export const postAddRooms = (id, form) => {
    return fireRequest("addRooms", [id], form, "", true);
};
export const getCurrentUser = () => {
    return fireRequest("currentUser");
};
export const getUserHotelList = (id) => {
    return fireRequest("userHotelList");
};
export const getHotelRoomList = (id) => {
    return fireRequest("hotelRoomList", [id]);
};
export const getHotelBookingList = (id) => {
    return fireRequest("hotelBookingList", [id]);
};
export const getHotelList = (params) => {
    return fireRequest("getHotelDetails", [], params);
};
export const getOptionlist = () => {
    return fireRequest("getOptionlistBackend");
};
export const getDistricts = () => {
    return fireRequest("getDistricts");
};

export const getRoomByHotelid = (id) => {
    return fireRequest("roomByHotelId", [id]);
};
export const getRoomByRoomid = (id) => {
    return fireRequest("roomByRoomId", [id]);
};
export const getHotelByRoomid = (id) => {
    return fireRequest("hotelByRoomId", [id]);
};
export const dopostBook = (body) => {
    return fireRequest("postBook", [], body);
};
export const changeRoomStatus = (roomid, status) => {
    return fireRequest("changeRoomStatus", [roomid], status);
};
export const deleteHotel = (id) => {
    return fireRequest("deleteHotel", [id]);
};
export const updateHotel = (pathParam, body) => {
    return fireRequest("updateHotel", pathParam, body);
};
export const deleteBooking = (id) => {
    return fireRequest("deleteBooking", [id]);
};
export const setCheckinStatus = (id, status) => {
    return fireRequest("setCheckinStatus", [id], status);
};
export const sendEmail = (form) => {
    return fireRequest("sendEmail", [], form);
};
export const resetPassword = (form) => {
    return fireRequest("resetPassword", [], form);
};
export const getHotelByHotelId = (id) => {
    return fireRequest("getHotelByHotelId", [id]);
};
