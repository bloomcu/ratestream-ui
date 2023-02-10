<template>
  <div class="grid gap-lg">
    <!-- Left -->
    <div class="col-6 padding-md radius-lg bg-white shadow-md">
      <p class="margin-bottom-sm"><span class="color-success text-bold">Do</span> this:</p>
      <div class="entry-repeater" data-repeater-input-name="user[n]">
        <input class="form-control bg-white width-100% margin-bottom-xs" type="text" v-model="newDo.body">
        <button @click="addDo()" class="btn btn--primary margin-bottom-sm width-100%" type="button">Add item</button>
        
        <ul class="grid gap-xs">
          <li v-for="item in organizationCommentsStore.filterByGroup(group + '-do')" :key="item.id">
            <div class="flex justify-between items-center border-bottom padding-bottom-xs">
              <span>{{ item.body }}</span>
              <button @click="organizationCommentsStore.destroy(item)" class="btn btn--subtle padding-x-xs" type="button">
                <svg class="icon" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><line x1="1" y1="5" x2="19" y2="5"/><path d="M7,5V2A1,1,0,0,1,8,1h4a1,1,0,0,1,1,1V5"/><path d="M16,8l-.835,9.181A2,2,0,0,1,13.174,19H6.826a2,2,0,0,1-1.991-1.819L4,8"/></g></svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Right -->
    <div class="col-6 padding-md radius-lg bbg-white shadow-md">
      <p class="margin-bottom-sm"><span class="color-error text-bold">Don't</span> do this:</p>
      <div class="entry-repeater" data-repeater-input-name="user[n]">
        <input class="form-control bg-white width-100% margin-bottom-xs" type="text" v-model="newDont.body">
        <button @click="addDont()" class="btn btn--primary margin-bottom-sm width-100%" type="button">Add item</button>
        
        <ul class="grid gap-xs">
          <li v-for="item in organizationCommentsStore.filterByGroup(group + '-dont')" :key="item.id">
            <div class="flex justify-between items-center border-bottom padding-bottom-xs">
              <span>{{ item.body }}</span>
              <button @click="organizationCommentsStore.destroy(item)" class="btn btn--subtle padding-x-xs" type="button">
                <svg class="icon" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><line x1="1" y1="5" x2="19" y2="5"/><path d="M7,5V2A1,1,0,0,1,8,1h4a1,1,0,0,1,1,1V5"/><path d="M16,8l-.835,9.181A2,2,0,0,1,13.174,19H6.826a2,2,0,0,1-1.991-1.819L4,8"/></g></svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useOrganizationCommentsStore } from '@/domain/base/organizations/store/useOrganizationCommentsStore'

const props = defineProps({
  group: { type: String }
})

const organizationCommentsStore = useOrganizationCommentsStore()

const newDo = ref({
  body: 'Do ',
  group: props.group + '-do',
})

const newDont = ref({
  body: 'Don\'t ',
  group: props.group + '-dont',
})

function addDo() {
  organizationCommentsStore.store(newDo.value)
    .then((response) => {
      newDo.value = {
        body: 'Do ',
        group: props.group + '-do',
      }
    })
}

function addDont() {
  organizationCommentsStore.store(newDont.value)
    .then((response) => {
      newDont.value = {
        body: 'Don\'t ',
        group: props.group + '-dont',
      }
    })
}

onMounted(() => {
    organizationCommentsStore.index()
})
</script>

<style lang="scss">
.rate-cont {}

.rate-cont__custom-input {
  display: inline-flex;
  align-items: center;

  background-color: alpha(var(--color-contrast-higher), 0.15);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius-md);

  color: var(--color-contrast-high);
  line-height: 1;
  user-select: none;

  cursor: pointer;

  transition: background .2s, color .2s, box-shadow .2s;

  &:hover {
    background-color: alpha(var(--color-contrast-higher), 0.2);
  }

  .rate-cont__native-input:checked + & {
    background-color: var(--color-contrast-higher);
    color: var(--color-bg);
  }

  .rate-cont__native-input:focus + & {
    box-shadow: 0 0 0 3px alpha(var(--color-contrast-higher), 0.2);
  }
}

.rate-cont__icon {
  margin-right: var(--space-xxs);

  .rate-cont__native-input:checked + .rate-cont__custom-input--yes &,
  .rate-cont__native-input:checked + .rate-cont__custom-input--no & {
    animation-duration: .6s;
    animation-fill-mode: forwards;
    will-change: transform;
    transform-origin: left center;
  }

  .rate-cont__native-input:checked + .rate-cont__custom-input--yes & {
    animation-name: rate-cont-anim-yes;
  }

  .rate-cont__native-input:checked + .rate-cont__custom-input--no & {
    animation-name: rate-cont-anim-no;
  }
}

@keyframes rate-cont-anim-yes {
  0% {
    transform: rotate(0) scale(1);
  }

  20% {
    transform: rotate(10deg) scale(1.1);
  }

  50% {
    transform: rotate(-25deg) scale(1.2);
  }

  80% {
    transform: rotate(5deg) scale(1.2);
  }

  100% {
    transform: rotate(0) scale(1.2);
  }
}

@keyframes rate-cont-anim-no {
  0% {
    transform: rotate(0) scale(1);
  }

  20% {
    transform: rotate(-10deg) scale(1.1);
  }

  50% {
    transform: rotate(25deg) scale(1.2);
  }

  80% {
    transform: rotate(-5deg) scale(1.2);
  }

  100% {
    transform: rotate(0) scale(1.2);
  }
}
</style>
