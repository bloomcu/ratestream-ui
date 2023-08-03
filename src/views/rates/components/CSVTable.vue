<template>
  <!-- <table class="table table--expanded width-100%">
    <thead class="table__header">
      <tr class="table__row">
        <th v-for="(column, index) in columns" :key="index" class="table__cell font-medium" scope="col">{{ column }}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="(row, index) in rows" :key="index" class="table__row">
        <td v-for="(column, index) in columns" :key="index" class="table__cell">{{ row[column] }}</td>
      </tr>
    </tbody>
  </table> -->

  <div class="radius-lg border shadow-sm width-100% height-100% margin-bottom-md">
    <div class="rate-table flex flex-row justify-between width-100% radius-lg">
      <table class="table table--expanded bg-light">
        <thead class="table__header table__header--sticky">
          <!-- Unique ID -->
          <tr class="table__row">
            <th class="table__cell font-semibold padding-xs">Unique ID</th>
            <th v-for="column in csvStore.columns" :key="column.id" class="table__cell padding-xxs color-contrast-low">{{ column.uid }}</th>
          </tr>
          
          <!-- Headers -->
          <tr class="table__row">
            <th class="table__cell font-semibold padding-xs"></th>

            <!-- Columns -->
            <th v-for="column in csvStore.columns" :key="column.id" class="table__cell font-medium padding-xxs">
              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody class="table__body">
          <!-- Rows -->
          <tr v-for="(row, rowIndex) in csvStore.rows" :key="rowIndex" class="table__row">
            <!-- Row uid -->
            <td class="table__cell padding-xxs color-contrast-low">
              {{ row.uid }}
            </td>

            <!-- Row cells -->
            <td v-for="(column, index) in csvStore.columns" :key="index" class="table__cell position-relative padding-xxs">
              {{ row.data[column.uid] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCSVStore } from '@/domain/csv/store/useCSVStore'
const csvStore = useCSVStore()
</script>
