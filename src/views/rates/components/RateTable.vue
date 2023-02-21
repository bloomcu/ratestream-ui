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
          <ButtonCopyToClipboard :value="elementToClipboardString(row.uid, column)">
            {{ row.columns[column] }}</ButtonCopyToClipboard>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ButtonCopyToClipboard from '../../../app/components/base/buttons/ButtonCopyToClipboard.vue'
const elementToClipboardString = (uid, col) => {
  return `<stream-cell uid="${uid}" col="${col}"></stream-cell>`
}
const props = defineProps({
  columns: {
    type: Array
  },
  rows: {
    type: Array
  }
})
</script>
