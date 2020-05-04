export const USER_TYPES = [
    { type: "customer", string: "Customer" },
    { type: "facilityowner", string: "Facility Owner" },
];

export const BOOKING_CHECKIN_STATUS = {
    PENDING: { type: "PENDING", string: "Pending", color: "orange-600" },
    CHECKEDIN: { type: "CHECKEDIN", string: "Checked In", color: "green-600" },
    CHECKEDOUT: {
        type: "CHECKEDOUT",
        string: "Checked Out",
        color: "gray-600",
    },
};
export const BOOKING_STATUS = {
    CANCELLED: { type: "CANCELLED", string: "Cancelled", color: "red-700" },
    BOOKED: { type: "BOOKED", string: "Booked", color: "green-600" },
};

export const DISTRICT_CHOICES = [
    { id: 1, text: "Thiruvananthapuram" },
    { id: 2, text: "Kollam" },
    { id: 3, text: "Pathanamthitta" },
    { id: 4, text: "Alappuzha" },
    { id: 5, text: "Kottayam" },
    { id: 6, text: "Idukki" },
    { id: 7, text: "Ernakulam" },
    { id: 8, text: "Thrissur" },
    { id: 9, text: "Palakkad" },
    { id: 10, text: "Malappuram" },
    { id: 11, text: "Kozhikode" },
    { id: 12, text: "Wayanad" },
    { id: 13, text: "Kannur" },
    { id: 14, text: "Kasaragod" },
];

export const HOTEL_STATUS = {
    ACTIVE: { type: "ACTIVE", string: "Active", color: "green-600" },
    NOT_AVAILABLE: {
        type: "NOT_AVAILABLE",
        string: "Not Available",
        color: "red-700",
    },
};

export const DEFAULT_IMAGE = {
    HOTEL: require("./images/no-image.png"),
    ROOM: require("./images/no-image.png"),
    USER: require("./images/userdefault.png"),
};

export const BOOKING_TERMS =
    "Your are booking a room for staying in quarantine. So, you are oblidged to stay to there untill the end of the time period. This is for your safety and the safety of the people around you";

export const GENDER = [
    { type: "MALE", text: "Male" },
    { type: "FEMALE", text: "Female" },
    { type: "OTHER", text: "Other" },
];
