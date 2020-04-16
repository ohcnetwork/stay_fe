import { fireRequest, actions } from './fireRequest';

export const postRegister = (form) => {
    return fireRequest('register', [], form);
};
export const postLogin = (form) => {
    return fireRequest('login', [], form);
};
