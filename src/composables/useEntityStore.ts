import { computed } from "vue";
import { useRoute } from "vue-router";

// ──────────────────────────────────────────────────────────────
//  LLAMA A TODAS TUS STORES AQUÍ (auto-import las trae automáticamente)
// ──────────────────────────────────────────────────────────────

// const busStore = useBusStore();
// const asientoStore = useAsientoStore();
// const clienteStore = useClienteStore();
// const boletoStore = useBoletoStore();
// const salidaStore = useSalidaStore();
// const ventaStore = useVentaStore();
// const pilotoStore = usePilotoStore();
// const empresaStore = useEmpresaStore();
// ... agrega aquí el resto de entidades que tengas (agencia, estacion, parada, etc.)

let storeMap = ref({}) as const;

export const initStore = (store) => {
  // const metadata = useMetadataStore(store);
  const userStore = useUserStore(store);
  const roleStore = useRoleStore(store);
  const permisoStore = usePermisoStore(store);
  const localidadStore = useLocalidadStore(store);
  const menuStore = useMenuStore(store);
  const iconStore = useIconStore(store);

  storeMap = {
    metadata: metadata,
    user: userStore,
    role: roleStore,
    permiso: permisoStore,
    localidad: localidadStore,
    menu: menuStore,
    icon: iconStore,
    // bus: busStore,
    // asiento: asientoStore,
    // cliente: clienteStore,
    // boleto: boletoStore,
    // salida: salidaStore,
    // venta: ventaStore,
    // piloto: pilotoStore,
    // empresa: empresaStore,
    // agrega el resto aquí
  };
};
export const useCurrentEntityStore = () => {
  const route = useRoute();
  const entity = computed(() => (route.params.entity as string).toLowerCase());
  return computed(() => {
    // si tu ruta a veces viene en plural (ej. /list/users), descomenta la siguiente línea:
    // const key = entity.value.replace(/s$/, '')
    const key = entity.value;

    return storeMap[key as keyof typeof storeMap] ?? null;
  });
};

export const getStore = (key) => {
  return storeMap[key.toLowerCase() as keyof typeof storeMap] ?? null;
};
