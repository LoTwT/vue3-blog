import { ref } from "vue"

const visible = ref(false)

export const useModal = () => ({
  visible,
  showModal: () => visible.value = true,
  hideModel: () => visible.value = false
})