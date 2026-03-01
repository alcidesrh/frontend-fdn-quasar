
import { defineConfig } from 'quasar'

export default defineConfig({
  boot: ['pinia', 'apollo', 'introspection'],
  build: {
    vueRouterMode: 'history'
  }
})
