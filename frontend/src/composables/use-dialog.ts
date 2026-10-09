import { ref } from 'vue'

export interface DialogOptions<T = unknown> {
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  data?: T
}

export function useDialog<T = unknown>() {
  const showDialog = ref(false)
  const dialogOptions = ref<DialogOptions<T>>({} as DialogOptions<T>)

  function openDialog(opts: DialogOptions<T>) {
    dialogOptions.value = opts
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    dialogOptions.value = {} as DialogOptions<T>
  }

  return { showDialog, dialogOptions, openDialog, closeDialog }
}
