<template>
  <q-drawer v-model="open" side="left" :mini="mini" class="wrap-sidebar" :width="sidebarStore.w">
    <template #default>
      <div class="sidebar-control" :class="[sidebarStore.position, mode]">
        <div class="flex items-center" :class="[sidebarStore.position, mode]">

          <div :class="{
            selected:
              !hoverMode && mode == modeStates.mini,
          }" @click="sidebarStore.setMode(modeStates.mini)">
          </div>
          <div :class="{
            selected:
              !hoverMode && mode == modeStates.large,
          }" @click="sidebarStore.setMode(modeStates.large)">
          </div>

        </div>
        <icon name="arrow_shape_up" fill size="25" class="z-50 cursor-pointer absolute toogle-sidebar"
          :class="[sidebarStore.position, mode]" @click="sidebarStore.setMode(modeStates.close)" />
        <Teleport to="#toogleLeftSidebar" defer>
          <Transition>
            <q-btn v-show="mode == modeStates.close" @click="sidebarStore.setMode(modeStates.prev)"
              :ripple="{ center: true }" outline flat>
              <icon name="arrow_shape_up" fill size="40" wght="500" class="toogle-sidebar ">
                <template #default></template>
              </icon>

            </q-btn>
          </Transition>

        </Teleport>
      </div>
      <aside id="layout-sidebar" ref="sidebar" class="layout-sidebar" :class="[mode]">
        <slot name="content" :data="{ mode: sidebarStore.mode, modeStates: sidebarStore.modeStates }" />
      </aside>
    </template>
  </q-drawer>
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
const hoverMode = ref(mode.value == modeStates.value.onhover)

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
      hoverMode.value = true
      open.value = false

    }
    else {
      open.value = true
      hoverMode.value = false
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
