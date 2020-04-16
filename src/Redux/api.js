export default {

register: {
      path: '/api/v1/auth/register',
      method: 'POST',
  },
addFacility:{
    path:"/api/v1/facility/add-facility",
    method:"POST",
    noAuth: false
},
}
