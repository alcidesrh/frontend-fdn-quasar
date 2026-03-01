
import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import persisted from 'pinia-plugin-persistedstate'

export default boot(({ app }) => {
  const pinia = createPinia()
  pinia.use(persisted)
  app.use(pinia)
})
