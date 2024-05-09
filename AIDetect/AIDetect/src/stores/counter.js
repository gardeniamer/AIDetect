import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUpload = defineStore('counter', () => {
  const count = ref(0)
  const count2 = ref(1)
  const changeWay = ref(0)
  const showArea = ref(0)

  return { count, count2, changeWay, showArea }
})

export const useFile = defineStore('file', () => {
  const file = ref([])

  const arr = ref([])

  return {file, arr}
}, {
  persist: true
})

