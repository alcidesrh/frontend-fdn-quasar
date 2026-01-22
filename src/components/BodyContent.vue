<template>
  <div :class="[sidebarStore.position, mode]">
    <div class="sidebar-wraper">
      <!-- <template #default> -->
      <div class="sidebar-control">

        <icon name="dock_to_right" fill :class="{ active: mode == modeStates.mini }"
          @click="sidebarStore.setMode(modeStates.mini)" />

        <icon name="left_panel_close" fill @click="sidebarStore.setMode(modeStates.close)"
          :class="{ active: mode == modeStates.close }" />
      </div>

      <aside id="sidebar-body" ref="sidebar">
        <slot name="content" :data="{ mode: sidebarStore.mode, modeStates: sidebarStore.modeStates }" />
      </aside>
      <!-- </template> -->
    </div>

    <q-page-container class="h-[100vh]">
      <div class=" h-full u-p-xs lg:u-px-m">
        <router-view />
      </div>
    </q-page-container>
  </div>

</template>
<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'

interface Props {
  position?: string
  classes?: string
  storeId: string
}
const { position = 'left', classes = '', storeId } = defineProps<Props>()

const sidebarStore = useSidebarStore(storeId, position)

const { mode, modeStates } = storeToRefs(sidebarStore)
const mini = computed(() => mode.value == modeStates.value.mini)
const open = ref(mode.value != modeStates.value.close)
const hoverFloatButton = ref(false)
const hoverSidebar = ref(false)
// const hoverScreenEdge = ref(false)

const openDialbtn = ref(false)
const { start, isPending, stop } = useTimeoutFn(
  () => {
    sidebarStore.setMode(modeStates.value.close)
  },
  300,
  { immediate: false },
)

watch(
  () => hoverFloatButton.value,
  (n) => {
    if (!n && mode.value == modeStates.value.onhover) {
      start()
    }
    else if (n && mode.value == modeStates.value.close) {
      if (isPending.value) {
        stop()
      }
      sidebarStore.setMode(modeStates.value.onhover)
    }
  },
)
// watch(
//   () => hoverScreenEdge.value,
//   (n) => {
//     if (n && mode.value == modeStates.value.close) {
//       mode.value = modeStates.value.onhover
//     }
//   },
// )
watch(
  () => hoverSidebar.value,
  (n) => {
    if (mode.value == modeStates.value.onhover) {
      if (!n) {
        start()
      }
      else if (n) {
        if (isPending.value) {
          stop()
        }
      }
    }
  },
)

watch(
  () => mode.value,
  (n, p) => {
    if (n == modeStates.value.close) {
      open.value = false

    }
    else {
      open.value = true
    }
  },
)


const items = ref([
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({
        severity: 'info',
        summary: 'Add',
        detail: 'Data Added',
        life: 3000,
      })
    },
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({
        severity: 'success',
        summary: 'Update',
        detail: 'Data Updated',
        life: 3000,
      })
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({
        severity: 'error',
        summary: 'Delete',
        detail: 'Data Deleted',
        life: 3000,
      })
    },
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      router.push('/fileupload')
    },
  }
])
</script>
