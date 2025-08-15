/*
 * @Author: Dhx
 * @Date: 2025-02-26 19:15:35
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\utils\message.ts
 */
import { ref } from 'vue'

export interface AlertInfo {
  id: string,
  type: string,
  message: string
}

export const newAlert = ref<AlertInfo>({
  id: 'alert' + 0,
  type: '',
  message: ''
})

export const alert = (type: string, message: string) => {
  newAlert.value.id = Math.random().toString()
  newAlert.value.type = type
  newAlert.value.message = message
}


export const errorAlert = (message: string) => {
  alert('error', message)
}

export const successAlert = (message: string) => {
  alert('success', message)
}

export const infoAlert = (message: string) => {
  alert('info', message)
}

export const warningAlert = (message: string) => {
  alert('warning', message)
}
export const message = {
  error: (message: string) => {
    alert('error', message)
  },
  success: (message: string) => {
    alert('success', message)
  },
  info: (message: string) => {
    alert('info', message)
  },
  warning: (message: string) => {
    alert('warning', message)
  }
}