<template>
  <div v-if="siteStore.site">
    <div class="margin-bottom-md">
      <p class="text-bold margin-bottom-xs">Notes</p>
      <div v-html="siteStore.launch.notes" class="content-component"></div>
    </div>
    
    <div class="flex flex-column gap-xs">
      <p class="text-bold">BloomCU Contacts</p>
      <div v-for="contact in bloomcuContacts" :key="contact.id">
        <UserCard :user="contact"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserCard from '@/domain/base/users/components/UserCard.vue'
import { useSiteStore } from '@/domain/base/sites/store/useSiteStore'

const siteStore = useSiteStore()

const bloomcuContacts = [
  {
    id: 0,
    avatar: '',
    name: 'Bryan Erwin',
    role: 'Lead Developer',
    organization: 'BloomCU',
    email: 'bryan@bloomcu.com',
    mobile: '(918) 645-1398',
    office: '(844) 334-3837',
  },
  {
    id: 1,
    avatar: '',
    name: 'Ryan Harmon',
    role: 'Director',
    organization: 'BloomCU',
    email: 'ryan@bloomcu.com',
    mobile: '(385) 207-5487',
    office: '(844) 334-3837',
  },
  // {
  //   id: 2,
  //   avatar: '',
  //   name: 'Devin Cuevas',
  //   role: 'Director',
  //   organization: 'Raiz',
  //   email: 'dcuevas@tfcu.coop',
  //   mobile: '(915) 543-1705',
  //   office: '(915) 926-3964',
  // },
  // {
  //   id: 3,
  //   avatar: '',
  //   name: 'Jason Vasquez',
  //   role: 'DNS',
  //   organization: 'Raiz',
  //   email: 'jvasquez@tfcu.coop',
  //   mobile: '(915) 422-5355',
  //   office: '(915) 926-2534',
  // },
]
</script>
