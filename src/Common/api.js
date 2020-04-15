export default {

    // Auth Endpoints
    login: {
        path: "/api/v1/auth/login/",
        method: "POST",
        noAuth: true,
    },

    register: {
        path: "/api/v1/auth/register/",
        method: "POST",
        noAuth: true,
    },

    getCurrentUser: {
        path: "/api/v1/auth/user",
        method: "GET",
        noAuth: false,
    },

}
