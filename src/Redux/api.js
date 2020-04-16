export default {

register: {
      path: '/api/v1/auth/register',
      method: 'POST',
  },

  login: {
      path: '/api/v1/auth/login',
      method: 'POST',
      noAuth: true
  },

}
