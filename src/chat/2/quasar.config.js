
import { defineConfig } from 'quasar'

export default defineConfig({
  boot: ['apollo', 'pinia'],
  build: {
    vueRouterMode: 'history'
  }
})
