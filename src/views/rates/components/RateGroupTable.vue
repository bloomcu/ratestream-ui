<template>
  <table class="cross-table">
    <tbody class="cross-table__body">
      <tr class="cross-table__row cross-table__row--w-full">
        <td class="cross-table__cell" style="width: 28%;">{{ group.title }}</td>
        <td class="cross-table__cell" style="width: 18%;">Name</td>
        <td class="cross-table__cell" style="width: 18%;">Rate</td>
        <td class="cross-table__cell" style="width: 18%;">Term</td>
        <td class="cross-table__cell" style="width: 18%;">Year</td>
      </tr>

      <tr v-for="(rate, index) in group.rates" :key="index" class="cross-table__row">
        <td class="cross-table__cell"></td>
        <td class="cross-table__cell">{{ rate.name }}</td>
        <td class="cross-table__cell">{{ rate.rate }}</td>
        <td class="cross-table__cell">{{ rate.term }}</td>
        <td class="cross-table__cell">{{ rate.year_low }}-{{ rate.year_high }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  group: { 
    type: Object
  }
})
</script>
