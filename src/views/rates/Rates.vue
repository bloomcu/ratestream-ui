<template>
  <LayoutDefault maxWidth="">
    <RatesSkeletonLoader v-if="rateStore.isLoading"/>

    <div v-else>

      <div v-if="!rateStore.isEditing" class="flex items-center justify-between margin-y-sm">
        <h3>Current rates</h3>
        <div class="flex gap-sm">
          
          
         
          <button v-if="activeGroupRevisions.length < 1 && rateStore.getActiveGroup.revision_of === null" v-on:click="rateStore.cloneRateGroup(rateStore.getActiveGroup.id)" class="btn btn--primary">
            Create Revision
          </button>
          <div v-else class="flex flex-col gap-xxs items-center">
            <label class="form-label" for="select-this">Select:</label>
            <div class="select">
              <select
                v-if="baseGroup"
                class="select__input btn btn--subtle"
                :value="rateStore.active_group_id"
                @change="onGroupSelect"
              >
                  <option :value="baseGroup.id">Live rates</option>
                  <option v-for="group in baseGroupRevisions" :key="group.id" :value="group.id">
                    Revision {{ group.id }}
                  </option>
              </select>
              <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16"><polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
            </div>
          </div>
            
          <button @click="rateStore.toggleIsEditing()" class="btn btn--subtle">Edit</button>
          <button @click="rateStore.export()" class="btn btn--subtle">Export</button>
          <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Import</router-link>
        </div>
      </div>

      <div v-else class="bg-primary-lighter bg-opacity-20% padding-y-xs padding-x-sm radius-lg margin-y-sm" role="alert">
        <div class="flex items-center justify-between">
          <p>{{editLabel}}</p>
          <div class="flex gap-xs">
            <button @click="rateStore.cancelEditing()" class="btn btn--subtle">Cancel</button>

            <!-- Publish -->
            <button @click="rateStore.toggleIsPublishPromptModal()" class="btn btn--primary">{{publishLabel}}</button>
            <button v-if="isRevision" @click="rateStore.toggleIsPublishNowPromptModal()" class="btn btn--primary">Publish Now</button>

          </div>
        </div>
      </div>

      <div v-if="errorStore.serverError" class="bg-error-lighter bg-opacity-20% padding-y-xs padding-x-sm radius-lg margin-y-sm" role="alert">
        <p>{{ errorStore.serverError }}</p>
      </div>
      
      <div :class="{'padding-left-md': rateStore.isEditing}">
        <RateTable/>
      </div>

      <PublishEditsModal/>
      <PublishNowModal/>
    </div>

    <!-- <div v-else class="text-component padding-md radius-lg bg-primary bg-opacity-5%">
      <h3>No rates</h3>
      <p>Let's import a CSV.</p>
      <router-link :to="{name: 'rates-import'}" class="btn btn--primary">Import CSV</router-link>
    </div> -->
  </LayoutDefault>
</template>

<script setup>
import moment from "moment"
import { ref, onMounted, computed } from 'vue'
import { useRateStore } from '@/domain/rates/store/useRateStore'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import RatesSkeletonLoader from '@/views/rates/loaders/RatesSkeletonLoader.vue'
import RateTable from '@/views/rates/components/RateTable.vue'
import PublishEditsModal from '@/views/rates/modals/PublishEditsModal.vue'
import PublishNowModal from '@/views/rates/modals/PublishNowModal.vue'

const rateStore = useRateStore()
const errorStore = useErrorStore()

onMounted(() => {
  rateStore.index()
})
const activeGroupRevisions = computed(()=>{
  // Instead of return true false, return the rate groups themselves
  return rateStore.groups.filter((group)=>{
    return rateStore.getActiveGroup.id === group.revision_of;
  })
  
})
const isRevision = computed(()=>{
  return rateStore.getActiveGroup.revision_of != null
})

const publishLabel = computed(()=>{
  return isRevision.value ? 'Save Revision' : 'Publish';
});

const editLabel = computed(()=>{
  return 'You are currently ' + (isRevision.value ? 'editing a revision' : 'editing live Rates');
});



const baseGroup = computed(() => {
  const activeGroup = rateStore.getActiveGroup
  if (!activeGroup || !activeGroup.id) return null
  if (activeGroup.revision_of == null) return activeGroup
  return rateStore.groups.find((group) => group.id === activeGroup.revision_of) || null
})

const baseGroupRevisions = computed(() => {
  const base = baseGroup.value
  if (!base) return []
  return rateStore.groups.filter((group) => group.revision_of === base.id)
})

const onGroupSelect = (event) => {
  const value = Number(event.target.value)
  rateStore.setActiveGroupId(value)
}

const activeGroupOrganization = computed(()=>{
  return organizationStore.organization
})
</script>

<style lang="scss">
.cross-table {
  position: relative;
  z-index: 1;
  width: 100%;

  .btn {
    width: 100%;
  }
}

.cross-table__icon { // e.g., checkbox icon
  --size: 20px;
}

// desktop only 👇
@include breakpoint(sm) {
  .cross-table {
    font-size: var(--text-sm);
  }

  .cross-table__row {
    .cross-table__cell:first-child {
      border-left-width: 0;
      // border-top-width: 0;
      width: 20%;
    }
  
    .cross-table__cell:last-child {
      border-right-width: 0;
    }
  }
  
  .cross-table__header {
    .cross-table__cell {
      border-top-width: 0;
    }
  }

  .cross-table__row--w-full { // row with cell spanning full width
    background-color: var(--color-bg-dark);
    
    .cross-table__cell {
      font-weight: 600;
    }
  }

  .cross-table__cell {
    border: 1px solid var(--color-bg-darker); // border style
    border-top-width: 0;
    padding: var(--space-xxs);
    // width: 25%;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  .cross-table__label { // inline copy of column headers (js-cross-table__label)
    display: none; // visible only in the card layout 👇
  }
}
/* -------------------------------- 

File#: _1_custom-select
Title: Custom Select
Descr: Custom Select Control
Usage: codyhouse.co/license

-------------------------------- */
:root {
  /* --default variation only 👇 */
  --select-icon-size: 16px;
  --select-icon-right-margin: var(--space-sm);
  /* icon margin right */
  --select-text-icon-gap: var(--space-xxxs);
  /* gap between text and icon */
}

.select {
  position: relative;
}

.select__input {
  width: 100%;
  height: 100%;
  padding-right: calc(var(--select-icon-size) + var(--select-icon-right-margin) + var(--select-text-icon-gap)) !important;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.select__icon {
  width: var(--select-icon-size);
  height: var(--select-icon-size);
  pointer-events: none;
  position: absolute;
  right: var(--select-icon-right-margin);
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}

/* --custom-dropdown */
:root {
  --select-dropdown-gap: 4px;
  /* distance between select control and custom dropdown */
}

.select__button {
  /* created in JS - custom select control */
  width: 100%;
}

.select__button[aria-expanded=true] {
  /* custom select control if dropdown = visible */
}

.select__dropdown {
  /* created in JS - custom select dropdown */
  position: absolute;
  left: 0;
  top: 100%;
  min-width: 200px;
  max-height: 1px;
  /* updated in JS */
  background-color: var(--color-bg-light);
  box-shadow: var(--inner-glow), var(--shadow-md);
  padding: var(--space-xxxs) 0;
  border-radius: var(--radius-md);
  z-index: var(--z-index-popover, 5);
  margin-top: var(--select-dropdown-gap);
  margin-bottom: var(--select-dropdown-gap);
  overflow: auto;
  /* use rem units */
  --space-unit: 1rem;
  --text-unit: 1rem;
  font-size: var(--text-unit);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s;
}

.select__dropdown--right {
  /* change dropdown position based on the available space */
  right: 0;
  left: auto;
}

.select__dropdown--up {
  bottom: 100%;
  top: auto;
}

.select__button[aria-expanded=true] + .select__dropdown {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.2s;
}

/* custom <optgroup> list - include all <option>s if no <optgroup> available  */
.select__list {
  list-style: none !important;
}

.select__list:not(:first-of-type) {
  padding-top: var(--space-xxs);
}

.select__list:not(:last-of-type) {
  border-bottom: 1px solid hsla(var(--color-contrast-higher-h), var(--color-contrast-higher-s), var(--color-contrast-higher-l), 0.1);
  padding-bottom: var(--space-xxs);
}

.select__item {
  /* single item inside .select__list */
  display: flex;
  align-items: center;
  padding: var(--space-xxs) var(--space-sm);
  color: var(--color-contrast-high);
  width: 100%;
  text-align: left;
  /* truncate text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select__item--optgroup {
  /* custom <optgroup> label */
  font-size: var(--text-sm);
  color: var(--color-contrast-medium);
}

.select__item--option {
  /* custom <option> label */
  cursor: pointer;
  transition: 0.2s;
}
.select__item--option:hover {
  background-color: hsla(var(--color-contrast-higher-h), var(--color-contrast-higher-s), var(--color-contrast-higher-l), 0.075);
}
.select__item--option:focus {
  outline: none;
  background-color: hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), 0.15);
}
.select__item--option[aria-selected=true] {
  /* selected option */
  background-color: var(--color-primary);
  color: var(--color-white);
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.select__item--option[aria-selected=true]::after {
  /* check icon next to the selected language */
  content: "";
  display: block;
  height: 1em;
  width: 1em;
  margin-left: auto;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpolyline stroke-width='2' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round' points='1,9 5,13 15,3 '/%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpolyline stroke-width='2' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round' points='1,9 5,13 15,3 '/%3E%3C/svg%3E");
}
.select__item--option[aria-selected=true]:focus {
  box-shadow: inset 0 0 0 2px var(--color-primary-dark);
}
.select__item--option[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}


</style>
