import Invitation from '@/views/invitations/Invitation.vue';

export default [
  {
    path: "/:organization/invitations/:invitation",
    name: "invitation",
    component: Invitation,
  },
]
