export default {

  register: {
      path: '/api/v1/auth/register',
      method: 'POST',
      noAuth: true
  },
  changepassword: {
    path: '/api/v1/auth/change-password',
    method: 'PUT',
    noAuth: false
},
  addFacility:{
    path:"/api/v1/facility/add-facility",
    method:"POST",
    noAuth: false
  },
  login: {
      path: '/api/v1/auth/login',
      method: 'POST',
      noAuth: true
  },

  currentUser: {
    path: '/api/v1/auth/user',
    noAuth: false
  },
}
