export default {
    register: {
        path: "/api/v1/auth/register",
        method: "POST",
        noAuth: true,
    },
    changepassword: {
        path: "/api/v1/auth/change-password",
        method: "PUT",
        noAuth: false,
    },
    addFacility: {
        path: "/api/v1/facility/add-facility",
        method: "POST",
        noAuth: false,
    },
    addRooms: {
        path: "/api/v1/rooms",
        method: "POST",
        noAuth: false,
    },
    login: {
        path: "/api/v1/auth/login",
        method: "POST",
        noAuth: true,
    },

    currentUser: {
        path: "/api/v1/auth/user",
        noAuth: false,
    },
    bookingHistory: {
        path: "/api/v1/booking/UserDetails",
        method: "get",
        noAuth: false,
    },

    userHotelList: {
        path: "/api/v1/facility/userFacilities",
        noAuth: false,
    },

    hotelRoomList: {
        path: "/api/v1/rooms/hotel",
        noAuth: true,
    },

    hotelBookingList: {
        path: "/api/v1/booking/HotelDetails",
        noAuth: false,
    },
    getHotelDetails: {
        path: "/api/v1/rooms",
        method: "GET",
        noAuth: true,
    },
    getOptionlistBackend: {
        path: "api/v1/rooms/get/details",
        noAuth: true,
    },
    getDistricts: {
        path: "/api/v1/facility/get/districts",
        noAuth: true,
    },

    roomByHotelId: {
        path: "/api/v1/rooms/hotel",
        method: "GET",
        noAuth: true,
    },

    roomByRoomId: {
        path: "/api/v1/rooms",
        method: "GET",
        noAuth: true,
    },

    postBook: {
        path: "/api/v1/booking/createBooking",
        method: "POST",
        noAuth: false,
    },

    changeRoomStatus: {
        path: "/api/v1/rooms/status",
        method: "PATCH",
        noAuth: false,
    },

    deleteHotel: {
        path: "/api/v1/facility",
        method: "DELETE",
        noAuth: false,
    },

    updateHotel: {
        path: "/api/v1/facility",
        method: "PATCH",
        noAuth: false,
    },

    deleteBooking: {
        path: "/api/v1/booking",
        method: "DELETE",
        noAuth: false,
    },

    setCheckinStatus: {
        path: "/api/v1/booking/checkin",
        method: "PUT",
        noAuth: false,
    },
    sendEmail: {
        path: "/api/v1/auth/forget-password",
        method: "POST",
        noAuth: true,
    },
    resetPassword: {
        path: "/api/v1/auth/reset-password",
        method: "POST",
        noAuth: true,
    },
    hotelByHotelId: {
        path: "/api/v1/facility",
        method: "GET",
        noAuth: true,
    },
};
