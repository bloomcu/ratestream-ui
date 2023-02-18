<template>
  <table class="cross-table">
    <tbody class="cross-table__body">
      <tr class="cross-table__row cross-table__row--w-full">
        <td class="cross-table__cell" style="width: 18%;">Unique Id</td>
        <td class="cross-table__cell" style="width: 28%;">Group</td>
        <td class="cross-table__cell" style="width: 18%;">Rate</td>
        <td class="cross-table__cell" style="width: 18%;">Term</td>
        <td class="cross-table__cell" style="width: 18%;">Year Low</td>
        <td class="cross-table__cell" style="width: 18%;">Year High</td>
      </tr>

      <tr v-for="(rate, index) in rates" :key="index" class="cross-table__row">
        <td class="cross-table__cell">{{ rate.uid }}</td>
        <td class="cross-table__cell">{{ rate.group }}</td>
        <td class="cross-table__cell">{{ rate.columns['rate'] }}</td>
        <td class="cross-table__cell">{{ rate.columns['term'] }}</td>
        <td class="cross-table__cell">{{ rate.columns['year_low'] }}</td>
        <td class="cross-table__cell">{{ rate.columns['year_high'] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  rates: { 
    type: Array
  }
})
</script>
