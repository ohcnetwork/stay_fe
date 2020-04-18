import { fireRequest, actions } from './fireRequest';

export const postRegister = (form) => {
    return fireRequest('register', [], form);
};
export const postLogin = (form) => {
    return fireRequest('login', [], form);
};
export const postAddHotel = (form) => {
    return fireRequest('addFacility', [], form);
};
export const getCurrentUser = () => {
    return fireRequest('currentUser');
};
export const getHotelList = (params) => {
    return fireRequest('getHotelDetails', [], params);
};
export const getOptionlist = () => {
    return fireRequest('getOptionlist');
};
export const getDistricts = () => {
    return fireRequest('getDistricts');
};