<template>
  <table class="table table--expanded width-100%">
    <thead class="table__header">
      <tr class="table__row">
        <th class="table__cell font-semibold" scope="col">Unique ID</th>
        <th v-for="(column, index) in columns" :key="index" class="table__cell font-medium" scope="col">{{ column }}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="(row, index) in rows" :key="index" class="table__row">
        <td class="table__cell font-semibold">{{ row.uid }}</td>
        <td v-for="(column, index) in columns" :key="index" class="table__cell">
          <VMenu  placement="top" :delay="{
            hide: 50
          }">
            <span>
              {{ row.columns[column] }}
            </span>
            <template #popper>
              <div @click.prevent="copy(row.uid, column, index)" class="table-cell-inner">
                <IconEmbed v-if="!isCopied.includes(`${index}${column}${index}`)" size="md" />
                <span v-else>Copied!</span>
              </div>
            </template>
          </VMenu>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ButtonCopyToClipboard from '../../../app/components/base/buttons/ButtonCopyToClipboard.vue'
import IconEmbed from '../../../app/components/base/icons/IconEmbed.vue'
import useClipboard from '@/app/composables/base/useClipboard'
import { ref } from 'vue'
const props = defineProps({
  columns: {
    type: Array
  },
  rows: {
    type: Array
  }
})
const { copyToClipboard } = useClipboard()
const isCopied = ref([])
const copy = (uid, column, index) => {
  copyToClipboard(`<stream-cell uid=&quot;${uid}&quot; col=&quot;${column}&quot;></stream-cell>`)
  isCopied.value.push(`${index}${column}${index}`)
}
</script>

<style lang="scss" scoped>
.table__cell-embed-box {
  background-color: black;
  color: white;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>