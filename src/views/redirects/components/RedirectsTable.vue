<template>
  <div class="int-table text-sm">
    <div class="int-table__inner">
      <table class="int-table__table">
        <thead class="int-table__header">
          <tr class="int-table__row">
            <th class="int-table__cell int-table__cell--th text-left">
              Request Url
            </th>
            
            <th class="int-table__cell int-table__cell--th">
              <span class="sr-only">Arrow Icon</span>
            </th>

            <th class="int-table__cell int-table__cell--th text-left">
              Destination Url
            </th>

            <th class="int-table__cell int-table__cell--th text-left">
              Group
            </th>

            <th class="int-table__cell int-table__cell--th text-left"></th>
          </tr>
        </thead>

        <tbody class="int-table__body">
          <tr 
            v-for="redirect in redirectStore.redirects"
            :key="redirect.id"
            class="int-table__row"
          >
            <!-- Requested Url -->
            <td class="int-table__cell max-width-xs">
              <AppInlineEditor :id="redirect.id" @updated="updateRequestedUrl" class="width-fit">{{ redirect.requested_url }}</AppInlineEditor>
            </td>
            
            <!-- Arrow icon -->
            <td class="int-table__cell max-width-xs">
              <IconArrowRight size="xs" class="color-contrast-medium color-opacity-60%"/>
            </td>
            
            <!-- Destination Url -->
            <td class="int-table__cell max-width-xs">
              <AppInlineEditor :id="redirect.id" @updated="updateDestinationUrl" class="width-fit">{{ redirect.destination_url }}</AppInlineEditor>
            </td>
            
            <!-- Group -->
            <td class="int-table__cell">
              <!-- TODO: Either use the AppChip, or delete it and create a chip class in app css -->
              <span class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">
                <AppInlineEditor :id="redirect.id" @updated="updateGroup" class="width-fit">{{ redirect.group }}</AppInlineEditor>
              </span>
            </td>
            
            <!-- Archive -->
            <td class="int-table__cell width-xxs">
              <button @click="destroy(redirect.id)" class="btn btn--sm btn--icon float-right">
                <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRedirectStore } from '@/domain/redirects/store/useRedirectStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconArrowRight from '@/app/components/base/icons/IconArrowRight.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const redirectStore = useRedirectStore()

function updateTitle(id, title) {
  redirectStore.update(id, {title: title})
}

function updateRequestedUrl(id, url) {
  redirectStore.update(id, {requested_url: url})
}

function updateDestinationUrl(id, url) {
  redirectStore.update(id, {destination_url: url})
}

function updateGroup(id, group) {
  redirectStore.update(id, {group: group})
}

function create() {
  redirectStore.store({title: 'New redirect'})
}

function destroy(id) {
  redirectStore.destroy(id)
}
</script>
