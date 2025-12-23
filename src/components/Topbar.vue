<template>
	<q-header class="toolbar">
		<q-toolbar class=" full-height">
			<q-toolbar-title>
				<q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
				</q-avatar>
				Title
			</q-toolbar-title>
			<clock />
			<q-btn dense flat round icon="menu" />
		</q-toolbar>
	</q-header>
</template>
<script setup lang="ts">
const sidebarStore = useSidebarStore('sidebarLeft')
const { mode, modeStates } = storeToRefs(sidebarStore)
</script>
