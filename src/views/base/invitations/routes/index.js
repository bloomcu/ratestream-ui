import Invitation from '@/views/base/invitations/Invitation.vue';

export default [
  {
    path: "/:organization/invitations/:invitation",
    name: "invitation",
    component: Invitation,
  },
]
