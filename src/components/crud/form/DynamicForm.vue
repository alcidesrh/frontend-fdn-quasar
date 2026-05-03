<template>
	<div class="h-full w-full @container">
		<!-- <pre>{{ formSchema }}</pre> -->
		<div v-if="store && store.formSchema.length" class="form-container">
			<FormKit id="form" ref="form" type="form" @submit="submit" v-model="defaultValue" :actions="false">
				<FormKitSchema :schema="store.formSchema" :data="store.formData" :library="library">
					<template #crudBtn>
						<div class="flex flex-wrap justify-end gap-5 align-middle">
							<slot name="CrudButton">
								<CrudButton
									:edit="!!store.item?.id"
									@submit="submit"
									@delete="store.remove()"
									@cancel="
										$router.push({
											name: 'list',
											params: {
												entity: store.nameDecapitalize,
											},
										})
									"
								/>
							</slot>
						</div>
					</template>
				</FormKitSchema>
			</FormKit>
		</div>
		<div v-else class="w-full">
			<FormPreload :cols="2" />
		</div>
	</div>
</template>
<script setup lang="ts">
	import { reset } from '@formkit/core'
	import { FormKitMessages } from '@formkit/vue'
	import { markRaw } from 'vue'
	import { useRouter } from 'vue-router'
	const route = useRouter()

	const store = ref()
	const defaultValue = ref()

	onBeforeMount(async () => {
		store.value = await getStore()

		defaultValue.value = store.value.item

		watch(
			() => store.item,
			(v) => {
				defaultValue.value = v
			},
		)
	})
	const library = markRaw({
		FormKitMessages: FormKitMessages,
	})

	const form = ref(null)

	const resetForm = ref(false)
	function submit(data) {
		if (data == 'reset') {
			resetForm.value = true
			form.value.node.submit()
			return
		}
		store
			.submit(data)
			.then((data) => {
				bus.emit('positive', getAlertText())

				if (resetForm.value) {
					resetForm.value = false
					if (router.currentRoute.value.name == entity.value.endpoints.create) {
						reset('form', {})
					} else {
						router.push({ name: entity.value.endpoints.create })
					}
					return
				}
				router.push({ name: entity.value.endpoints.collection })
			})
			.catch((e) => {})
		// form.value.node.submit();
	}
	// const tem = store.getFormData();
	// const data = ref({
	//   localidades: [], //items,
	//   parents: [],
	//   children: [],
	//   permisos: [],
	//   actions: [],
	//   roles: [],

	//   item: computed(() => store.item),
	//   // submit: (data) => store.submit(data),
	// });
	// onBeforeMount(() => {
	// 	const eventSource = new EventSource(
	// 		'http://localhost/.well-known/mercure?topic=form'
	// 	);

	// 	eventSource.onmessage = (event) => {
	// 		schema2.value = [JSON.parse(event.data).schema];
	// 	};

	// 	const eventSource2 = new EventSource(
	// 		'http://localhost/.well-known/mercure?topic=item'
	// 	);

	// 	eventSource.onmessage = (event) => {
	// 		schema2.value = [JSON.parse(event.data).schema];
	// 	}; });
</script>
