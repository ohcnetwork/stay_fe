import { fireRequest, actions } from './fireRequest';

export const postRegister = (form: object) => {
    return fireRequest('register', [], form);
};
export const postLogin = (form: object) => {
    return fireRequest('login', [], form);
};
export const postAddHotel = (form: object) => {
    return fireRequest('addFacility', [], form);
};
