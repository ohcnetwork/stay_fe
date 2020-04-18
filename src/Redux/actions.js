import { fireRequest, actions } from './fireRequest';

export const postRegister = (form) => {
    return fireRequest('register', [], form);
};
export const postLogin = (form) => {
    return fireRequest('login', [], form);
};
export const postAddHotel = (id,form) => {
    return fireRequest('addFacility', [], form);
};
export const postAddRooms = (id, form) => {
    return fireRequest('addRooms', [id], form);
};
export const getCurrentUser = () => {
    return fireRequest('currentUser');
};
