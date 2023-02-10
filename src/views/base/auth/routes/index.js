import ForgotPassword from '@/views/base/auth/ForgotPassword.vue';
import Login from '@/views/base/auth/Login.vue';
import Logout from '@/views/base/auth/Logout.vue';
import NotAuthorized from '@/views/base/auth/NotAuthorized.vue';
// import Register from '@/views/base/auth/Register.vue';

export default [
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: NotAuthorized,
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register,
  // },
]
