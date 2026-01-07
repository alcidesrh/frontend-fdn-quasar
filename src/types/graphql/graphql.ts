/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** The `Iterable` scalar type represents an array or a Traversable with any kind of data. */
    Iterable: { input: any; output: any };
};

export type Agencia = Node & {
    __typename?: 'Agencia';
    _id: Scalars['Int']['output'];
    alias: Scalars['String']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    localidad?: Maybe<Localidad>;
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    users?: Maybe<UserPageConnection>;
};

export type AgenciaUsersArgs = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    apellido_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    createdAt?: InputMaybe<Array<InputMaybe<UserFilter_CreatedAt>>>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombre_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<UserFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    username?: InputMaybe<Scalars['String']['input']>;
    username_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Cursor connection for Agencia. */
export type AgenciaCursorConnection = {
    __typename?: 'AgenciaCursorConnection';
    edges?: Maybe<Array<Maybe<AgenciaEdge>>>;
    pageInfo: AgenciaPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Agencia. */
export type AgenciaEdge = {
    __typename?: 'AgenciaEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Agencia>;
};

/** Information about the current page. */
export type AgenciaPageInfo = {
    __typename?: 'AgenciaPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Asiento = Node & {
    __typename?: 'Asiento';
    _id: Scalars['Int']['output'];
    bus: Bus;
    clase?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    numero: Scalars['Int']['output'];
};

/** Cursor connection for Asiento. */
export type AsientoCursorConnection = {
    __typename?: 'AsientoCursorConnection';
    edges?: Maybe<Array<Maybe<AsientoEdge>>>;
    pageInfo: AsientoPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Asiento. */
export type AsientoEdge = {
    __typename?: 'AsientoEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Asiento>;
};

/** Information about the current page. */
export type AsientoPageInfo = {
    __typename?: 'AsientoPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Boleto = Node & {
    __typename?: 'Boleto';
    _id: Scalars['Int']['output'];
    asiento: Asiento;
    boletoLogs?: Maybe<BoletoLogCursorConnection>;
    cliente: Cliente;
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    precio?: Maybe<Scalars['Float']['output']>;
    salida: Salida;
    status?: Maybe<Status>;
    updatedAt: Scalars['String']['output'];
};

export type BoletoBoletoLogsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Boleto. */
export type BoletoCursorConnection = {
    __typename?: 'BoletoCursorConnection';
    edges?: Maybe<Array<Maybe<BoletoEdge>>>;
    pageInfo: BoletoPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Boleto. */
export type BoletoEdge = {
    __typename?: 'BoletoEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Boleto>;
};

export type BoletoLog = Node & {
    __typename?: 'BoletoLog';
    _id: Scalars['Int']['output'];
    boleto: Boleto;
    createdAt: Scalars['String']['output'];
    descripcion?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    tipo?: Maybe<Scalars['Int']['output']>;
    updatedAt: Scalars['String']['output'];
    user?: Maybe<User>;
};

/** Cursor connection for BoletoLog. */
export type BoletoLogCursorConnection = {
    __typename?: 'BoletoLogCursorConnection';
    edges?: Maybe<Array<Maybe<BoletoLogEdge>>>;
    pageInfo: BoletoLogPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of BoletoLog. */
export type BoletoLogEdge = {
    __typename?: 'BoletoLogEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<BoletoLog>;
};

/** Information about the current page. */
export type BoletoLogPageInfo = {
    __typename?: 'BoletoLogPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Information about the current page. */
export type BoletoPageInfo = {
    __typename?: 'BoletoPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Bus = Node & {
    __typename?: 'Bus';
    _id: Scalars['Int']['output'];
    asientos?: Maybe<AsientoCursorConnection>;
    codigo?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    empresa?: Maybe<Empresa>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    marca?: Maybe<Scalars['String']['output']>;
    piloto?: Maybe<Piloto>;
    placa?: Maybe<Scalars['String']['output']>;
    precioVariacionAsientoA?: Maybe<Scalars['Float']['output']>;
    precioVariacionAsientoB?: Maybe<Scalars['Float']['output']>;
    status?: Maybe<Status>;
    updatedAt: Scalars['String']['output'];
};

export type BusAsientosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type BusFilter_CreatedAt = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    strictly_after?: InputMaybe<Scalars['String']['input']>;
    strictly_before?: InputMaybe<Scalars['String']['input']>;
};

export type BusFilter_Order = {
    createdAt?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    marca?: InputMaybe<Scalars['String']['input']>;
    placa?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
};

/** Page connection for Bus. */
export type BusPageConnection = {
    __typename?: 'BusPageConnection';
    collection?: Maybe<Array<Maybe<Bus>>>;
    paginationInfo: BusPaginationInfo;
};

/** Information about the pagination. */
export type BusPaginationInfo = {
    __typename?: 'BusPaginationInfo';
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    lastPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
};

export type Cliente = Node & {
    __typename?: 'Cliente';
    _id: Scalars['Int']['output'];
    apellido?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    dpi?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    localidad?: Maybe<Localidad>;
    nit?: Maybe<Scalars['String']['output']>;
    nombre: Scalars['String']['output'];
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['String']['output'];
};

/** Cursor connection for Cliente. */
export type ClienteCursorConnection = {
    __typename?: 'ClienteCursorConnection';
    edges?: Maybe<Array<Maybe<ClienteEdge>>>;
    pageInfo: ClientePageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Cliente. */
export type ClienteEdge = {
    __typename?: 'ClienteEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Cliente>;
};

/** Information about the current page. */
export type ClientePageInfo = {
    __typename?: 'ClientePageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type ColumnFieldsResource = Node & {
    __typename?: 'ColumnFieldsResource';
    id: Scalars['ID']['output'];
};

/** Cursor connection for ColumnFieldsResource. */
export type ColumnFieldsResourceCursorConnection = {
    __typename?: 'ColumnFieldsResourceCursorConnection';
    edges?: Maybe<Array<Maybe<ColumnFieldsResourceEdge>>>;
    pageInfo: ColumnFieldsResourcePageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of ColumnFieldsResource. */
export type ColumnFieldsResourceEdge = {
    __typename?: 'ColumnFieldsResourceEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<ColumnFieldsResource>;
};

/** Information about the current page. */
export type ColumnFieldsResourcePageInfo = {
    __typename?: 'ColumnFieldsResourcePageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Empresa = Node & {
    __typename?: 'Empresa';
    _id: Scalars['Int']['output'];
    alias?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    denominacionSocial?: Maybe<Scalars['String']['output']>;
    direccion?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    localidad?: Maybe<Localidad>;
    nit?: Maybe<Scalars['String']['output']>;
    nombre: Scalars['String']['output'];
    nombreComercial?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['String']['output'];
};

/** Page connection for Empresa. */
export type EmpresaPageConnection = {
    __typename?: 'EmpresaPageConnection';
    collection?: Maybe<Array<Maybe<Empresa>>>;
    paginationInfo: EmpresaPaginationInfo;
};

/** Information about the pagination. */
export type EmpresaPaginationInfo = {
    __typename?: 'EmpresaPaginationInfo';
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    lastPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
};

export type Enclave = Node & {
    __typename?: 'Enclave';
    _id: Scalars['Int']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    localidad?: Maybe<Localidad>;
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
};

/** Cursor connection for Enclave. */
export type EnclaveCursorConnection = {
    __typename?: 'EnclaveCursorConnection';
    edges?: Maybe<Array<Maybe<EnclaveEdge>>>;
    pageInfo: EnclavePageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Enclave. */
export type EnclaveEdge = {
    __typename?: 'EnclaveEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Enclave>;
};

/** Information about the current page. */
export type EnclavePageInfo = {
    __typename?: 'EnclavePageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Estacion = Node & {
    __typename?: 'Estacion';
    _id: Scalars['Int']['output'];
    alias: Scalars['String']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    localidad?: Maybe<Localidad>;
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    slug?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    users?: Maybe<UserPageConnection>;
};

export type EstacionUsersArgs = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    apellido_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    createdAt?: InputMaybe<Array<InputMaybe<UserFilter_CreatedAt>>>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombre_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<UserFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    username?: InputMaybe<Scalars['String']['input']>;
    username_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EstacionFilter_Order = {
    alias?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
};

/** Page connection for Estacion. */
export type EstacionPageConnection = {
    __typename?: 'EstacionPageConnection';
    collection?: Maybe<Array<Maybe<Estacion>>>;
    paginationInfo: EstacionPaginationInfo;
};

/** Information about the pagination. */
export type EstacionPaginationInfo = {
    __typename?: 'EstacionPaginationInfo';
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    lastPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
};

export type Fdn = Node & {
    __typename?: 'FDN';
    _id: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
};

/** Cursor connection for FDN. */
export type FdnCursorConnection = {
    __typename?: 'FDNCursorConnection';
    edges?: Maybe<Array<Maybe<FdnEdge>>>;
    pageInfo: FdnPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of FDN. */
export type FdnEdge = {
    __typename?: 'FDNEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Fdn>;
};

/** Information about the current page. */
export type FdnPageInfo = {
    __typename?: 'FDNPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Factura = Node & {
    __typename?: 'Factura';
    _id: Scalars['Int']['output'];
    createdAt: Scalars['String']['output'];
    dte?: Maybe<Scalars['String']['output']>;
    fecha?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    serie?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    updatedAt: Scalars['String']['output'];
    uuid?: Maybe<Scalars['String']['output']>;
    venta?: Maybe<Venta>;
};

/** Cursor connection for Factura. */
export type FacturaCursorConnection = {
    __typename?: 'FacturaCursorConnection';
    edges?: Maybe<Array<Maybe<FacturaEdge>>>;
    pageInfo: FacturaPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Factura. */
export type FacturaEdge = {
    __typename?: 'FacturaEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Factura>;
};

/** Information about the current page. */
export type FacturaPageInfo = {
    __typename?: 'FacturaPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Localidad = Node & {
    __typename?: 'Localidad';
    _id: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    nombre: Scalars['String']['output'];
    pais?: Maybe<Pais>;
};

/** Cursor connection for Localidad. */
export type LocalidadCursorConnection = {
    __typename?: 'LocalidadCursorConnection';
    edges?: Maybe<Array<Maybe<LocalidadEdge>>>;
    pageInfo: LocalidadPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Localidad. */
export type LocalidadEdge = {
    __typename?: 'LocalidadEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Localidad>;
};

/** Information about the current page. */
export type LocalidadPageInfo = {
    __typename?: 'LocalidadPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Menu = Node & {
    __typename?: 'Menu';
    _id: Scalars['Int']['output'];
    children?: Maybe<TaxonCursorConnection>;
    id: Scalars['ID']['output'];
    link?: Maybe<Scalars['String']['output']>;
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    parent?: Maybe<Taxon>;
    posicion?: Maybe<Scalars['Int']['output']>;
    status?: Maybe<Status>;
    tipo?: Maybe<Scalars['String']['output']>;
};

export type MenuChildrenArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Menu. */
export type MenuCursorConnection = {
    __typename?: 'MenuCursorConnection';
    edges?: Maybe<Array<Maybe<MenuEdge>>>;
    pageInfo: MenuPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Menu. */
export type MenuEdge = {
    __typename?: 'MenuEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Menu>;
};

/** Information about the current page. */
export type MenuPageInfo = {
    __typename?: 'MenuPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type MetadataResource = Node & {
    __typename?: 'MetadataResource';
    _id: Scalars['String']['output'];
    columns?: Maybe<Scalars['Iterable']['output']>;
    data: Scalars['Iterable']['output'];
    id: Scalars['ID']['output'];
    status?: Maybe<Scalars['Iterable']['output']>;
};

export type MultipleResource = Node & {
    __typename?: 'MultipleResource';
    id: Scalars['ID']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    /** Creates a Agencia. */
    createAgencia?: Maybe<CreateAgenciaPayload>;
    /** Creates a Asiento. */
    createAsiento?: Maybe<CreateAsientoPayload>;
    /** Creates a Boleto. */
    createBoleto?: Maybe<CreateBoletoPayload>;
    /** Creates a BoletoLog. */
    createBoletoLog?: Maybe<CreateBoletoLogPayload>;
    /** Creates a Cliente. */
    createCliente?: Maybe<CreateClientePayload>;
    /** Creates a ColumnFieldsResource. */
    createColumnFieldsResource?: Maybe<CreateColumnFieldsResourcePayload>;
    /** Creates a Empresa. */
    createEmpresa?: Maybe<CreateEmpresaPayload>;
    /** Creates a Enclave. */
    createEnclave?: Maybe<CreateEnclavePayload>;
    /** Creates a Estacion. */
    createEstacion?: Maybe<CreateEstacionPayload>;
    /** Creates a FDN. */
    createFDN?: Maybe<CreateFdnPayload>;
    /** Creates a Factura. */
    createFactura?: Maybe<CreateFacturaPayload>;
    /** Creates a Localidad. */
    createLocalidad?: Maybe<CreateLocalidadPayload>;
    /** Creates a Menu. */
    createMenu?: Maybe<CreateMenuPayload>;
    /** Creates a Pais. */
    createPais?: Maybe<CreatePaisPayload>;
    /** Creates a Parada. */
    createParada?: Maybe<CreateParadaPayload>;
    /** Creates a Permiso. */
    createPermiso?: Maybe<CreatePermisoPayload>;
    /** Creates a Recorrido. */
    createRecorrido?: Maybe<CreateRecorridoPayload>;
    /** Creates a RecorridoAsientoPrecio. */
    createRecorridoAsientoPrecio?: Maybe<CreateRecorridoAsientoPrecioPayload>;
    /** Creates a Salida. */
    createSalida?: Maybe<CreateSalidaPayload>;
    /** Creates a SalidaLog. */
    createSalidaLog?: Maybe<CreateSalidaLogPayload>;
    /** Creates a Taxon. */
    createTaxon?: Maybe<CreateTaxonPayload>;
    /** Creates a User. */
    createUser?: Maybe<CreateUserPayload>;
    /** Creates a Venta. */
    createVenta?: Maybe<CreateVentaPayload>;
    /** Creates a create_form. */
    createcreate_form?: Maybe<CreateCreate_FormPayload>;
    /** Deletes a Agencia. */
    deleteAgencia?: Maybe<DeleteAgenciaPayload>;
    /** Deletes a Asiento. */
    deleteAsiento?: Maybe<DeleteAsientoPayload>;
    /** Deletes a Boleto. */
    deleteBoleto?: Maybe<DeleteBoletoPayload>;
    /** Deletes a BoletoLog. */
    deleteBoletoLog?: Maybe<DeleteBoletoLogPayload>;
    /** Deletes a Cliente. */
    deleteCliente?: Maybe<DeleteClientePayload>;
    /** Deletes a ColumnFieldsResource. */
    deleteColumnFieldsResource?: Maybe<DeleteColumnFieldsResourcePayload>;
    /** Deletes a Empresa. */
    deleteEmpresa?: Maybe<DeleteEmpresaPayload>;
    /** Deletes a Enclave. */
    deleteEnclave?: Maybe<DeleteEnclavePayload>;
    /** Deletes a Estacion. */
    deleteEstacion?: Maybe<DeleteEstacionPayload>;
    /** Deletes a FDN. */
    deleteFDN?: Maybe<DeleteFdnPayload>;
    /** Deletes a Factura. */
    deleteFactura?: Maybe<DeleteFacturaPayload>;
    /** Deletes a Localidad. */
    deleteLocalidad?: Maybe<DeleteLocalidadPayload>;
    /** Deletes a Menu. */
    deleteMenu?: Maybe<DeleteMenuPayload>;
    /** Deletes a MultipleResource. */
    deleteMultipleResource?: Maybe<DeleteMultipleResourcePayload>;
    /** Deletes a Pais. */
    deletePais?: Maybe<DeletePaisPayload>;
    /** Deletes a Parada. */
    deleteParada?: Maybe<DeleteParadaPayload>;
    /** Deletes a Permiso. */
    deletePermiso?: Maybe<DeletePermisoPayload>;
    /** Deletes a Recorrido. */
    deleteRecorrido?: Maybe<DeleteRecorridoPayload>;
    /** Deletes a RecorridoAsientoPrecio. */
    deleteRecorridoAsientoPrecio?: Maybe<DeleteRecorridoAsientoPrecioPayload>;
    /** Deletes a Salida. */
    deleteSalida?: Maybe<DeleteSalidaPayload>;
    /** Deletes a SalidaLog. */
    deleteSalidaLog?: Maybe<DeleteSalidaLogPayload>;
    /** Deletes a Taxon. */
    deleteTaxon?: Maybe<DeleteTaxonPayload>;
    /** Deletes a User. */
    deleteUser?: Maybe<DeleteUserPayload>;
    /** Deletes a Venta. */
    deleteVenta?: Maybe<DeleteVentaPayload>;
    /** Deletes a create_form. */
    deletecreate_form?: Maybe<DeleteCreate_FormPayload>;
    /** Updates a Agencia. */
    updateAgencia?: Maybe<UpdateAgenciaPayload>;
    /** Updates a Asiento. */
    updateAsiento?: Maybe<UpdateAsientoPayload>;
    /** Updates a Boleto. */
    updateBoleto?: Maybe<UpdateBoletoPayload>;
    /** Updates a BoletoLog. */
    updateBoletoLog?: Maybe<UpdateBoletoLogPayload>;
    /** Updates a Cliente. */
    updateCliente?: Maybe<UpdateClientePayload>;
    /** Updates a ColumnFieldsResource. */
    updateColumnFieldsResource?: Maybe<UpdateColumnFieldsResourcePayload>;
    /** Updates a Empresa. */
    updateEmpresa?: Maybe<UpdateEmpresaPayload>;
    /** Updates a Enclave. */
    updateEnclave?: Maybe<UpdateEnclavePayload>;
    /** Updates a Estacion. */
    updateEstacion?: Maybe<UpdateEstacionPayload>;
    /** Updates a FDN. */
    updateFDN?: Maybe<UpdateFdnPayload>;
    /** Updates a Factura. */
    updateFactura?: Maybe<UpdateFacturaPayload>;
    /** Updates a Localidad. */
    updateLocalidad?: Maybe<UpdateLocalidadPayload>;
    /** Updates a Menu. */
    updateMenu?: Maybe<UpdateMenuPayload>;
    /** Updates a Pais. */
    updatePais?: Maybe<UpdatePaisPayload>;
    /** Updates a Parada. */
    updateParada?: Maybe<UpdateParadaPayload>;
    /** Updates a Permiso. */
    updatePermiso?: Maybe<UpdatePermisoPayload>;
    /** Updates a Recorrido. */
    updateRecorrido?: Maybe<UpdateRecorridoPayload>;
    /** Updates a RecorridoAsientoPrecio. */
    updateRecorridoAsientoPrecio?: Maybe<UpdateRecorridoAsientoPrecioPayload>;
    /** Updates a Salida. */
    updateSalida?: Maybe<UpdateSalidaPayload>;
    /** Updates a SalidaLog. */
    updateSalidaLog?: Maybe<UpdateSalidaLogPayload>;
    /** Updates a Taxon. */
    updateTaxon?: Maybe<UpdateTaxonPayload>;
    /** Updates a User. */
    updateUser?: Maybe<UpdateUserPayload>;
    /** Updates a Venta. */
    updateVenta?: Maybe<UpdateVentaPayload>;
    /** Updates a create_form. */
    updatecreate_form?: Maybe<UpdateCreate_FormPayload>;
};

export type MutationCreateAgenciaArgs = {
    input: CreateAgenciaInput;
};

export type MutationCreateAsientoArgs = {
    input: CreateAsientoInput;
};

export type MutationCreateBoletoArgs = {
    input: CreateBoletoInput;
};

export type MutationCreateBoletoLogArgs = {
    input: CreateBoletoLogInput;
};

export type MutationCreateClienteArgs = {
    input: CreateClienteInput;
};

export type MutationCreateColumnFieldsResourceArgs = {
    input: CreateColumnFieldsResourceInput;
};

export type MutationCreateEmpresaArgs = {
    input: CreateEmpresaInput;
};

export type MutationCreateEnclaveArgs = {
    input: CreateEnclaveInput;
};

export type MutationCreateEstacionArgs = {
    input: CreateEstacionInput;
};

export type MutationCreateFdnArgs = {
    input: CreateFdnInput;
};

export type MutationCreateFacturaArgs = {
    input: CreateFacturaInput;
};

export type MutationCreateLocalidadArgs = {
    input: CreateLocalidadInput;
};

export type MutationCreateMenuArgs = {
    input: CreateMenuInput;
};

export type MutationCreatePaisArgs = {
    input: CreatePaisInput;
};

export type MutationCreateParadaArgs = {
    input: CreateParadaInput;
};

export type MutationCreatePermisoArgs = {
    input: CreatePermisoInput;
};

export type MutationCreateRecorridoArgs = {
    input: CreateRecorridoInput;
};

export type MutationCreateRecorridoAsientoPrecioArgs = {
    input: CreateRecorridoAsientoPrecioInput;
};

export type MutationCreateSalidaArgs = {
    input: CreateSalidaInput;
};

export type MutationCreateSalidaLogArgs = {
    input: CreateSalidaLogInput;
};

export type MutationCreateTaxonArgs = {
    input: CreateTaxonInput;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type MutationCreateVentaArgs = {
    input: CreateVentaInput;
};

export type MutationCreatecreate_FormArgs = {
    input: CreateCreate_FormInput;
};

export type MutationDeleteAgenciaArgs = {
    input: DeleteAgenciaInput;
};

export type MutationDeleteAsientoArgs = {
    input: DeleteAsientoInput;
};

export type MutationDeleteBoletoArgs = {
    input: DeleteBoletoInput;
};

export type MutationDeleteBoletoLogArgs = {
    input: DeleteBoletoLogInput;
};

export type MutationDeleteClienteArgs = {
    input: DeleteClienteInput;
};

export type MutationDeleteColumnFieldsResourceArgs = {
    input: DeleteColumnFieldsResourceInput;
};

export type MutationDeleteEmpresaArgs = {
    input: DeleteEmpresaInput;
};

export type MutationDeleteEnclaveArgs = {
    input: DeleteEnclaveInput;
};

export type MutationDeleteEstacionArgs = {
    input: DeleteEstacionInput;
};

export type MutationDeleteFdnArgs = {
    input: DeleteFdnInput;
};

export type MutationDeleteFacturaArgs = {
    input: DeleteFacturaInput;
};

export type MutationDeleteLocalidadArgs = {
    input: DeleteLocalidadInput;
};

export type MutationDeleteMenuArgs = {
    input: DeleteMenuInput;
};

export type MutationDeleteMultipleResourceArgs = {
    input: DeleteMultipleResourceInput;
};

export type MutationDeletePaisArgs = {
    input: DeletePaisInput;
};

export type MutationDeleteParadaArgs = {
    input: DeleteParadaInput;
};

export type MutationDeletePermisoArgs = {
    input: DeletePermisoInput;
};

export type MutationDeleteRecorridoArgs = {
    input: DeleteRecorridoInput;
};

export type MutationDeleteRecorridoAsientoPrecioArgs = {
    input: DeleteRecorridoAsientoPrecioInput;
};

export type MutationDeleteSalidaArgs = {
    input: DeleteSalidaInput;
};

export type MutationDeleteSalidaLogArgs = {
    input: DeleteSalidaLogInput;
};

export type MutationDeleteTaxonArgs = {
    input: DeleteTaxonInput;
};

export type MutationDeleteUserArgs = {
    input: DeleteUserInput;
};

export type MutationDeleteVentaArgs = {
    input: DeleteVentaInput;
};

export type MutationDeletecreate_FormArgs = {
    input: DeleteCreate_FormInput;
};

export type MutationUpdateAgenciaArgs = {
    input: UpdateAgenciaInput;
};

export type MutationUpdateAsientoArgs = {
    input: UpdateAsientoInput;
};

export type MutationUpdateBoletoArgs = {
    input: UpdateBoletoInput;
};

export type MutationUpdateBoletoLogArgs = {
    input: UpdateBoletoLogInput;
};

export type MutationUpdateClienteArgs = {
    input: UpdateClienteInput;
};

export type MutationUpdateColumnFieldsResourceArgs = {
    input: UpdateColumnFieldsResourceInput;
};

export type MutationUpdateEmpresaArgs = {
    input: UpdateEmpresaInput;
};

export type MutationUpdateEnclaveArgs = {
    input: UpdateEnclaveInput;
};

export type MutationUpdateEstacionArgs = {
    input: UpdateEstacionInput;
};

export type MutationUpdateFdnArgs = {
    input: UpdateFdnInput;
};

export type MutationUpdateFacturaArgs = {
    input: UpdateFacturaInput;
};

export type MutationUpdateLocalidadArgs = {
    input: UpdateLocalidadInput;
};

export type MutationUpdateMenuArgs = {
    input: UpdateMenuInput;
};

export type MutationUpdatePaisArgs = {
    input: UpdatePaisInput;
};

export type MutationUpdateParadaArgs = {
    input: UpdateParadaInput;
};

export type MutationUpdatePermisoArgs = {
    input: UpdatePermisoInput;
};

export type MutationUpdateRecorridoArgs = {
    input: UpdateRecorridoInput;
};

export type MutationUpdateRecorridoAsientoPrecioArgs = {
    input: UpdateRecorridoAsientoPrecioInput;
};

export type MutationUpdateSalidaArgs = {
    input: UpdateSalidaInput;
};

export type MutationUpdateSalidaLogArgs = {
    input: UpdateSalidaLogInput;
};

export type MutationUpdateTaxonArgs = {
    input: UpdateTaxonInput;
};

export type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};

export type MutationUpdateVentaArgs = {
    input: UpdateVentaInput;
};

export type MutationUpdatecreate_FormArgs = {
    input: UpdateCreate_FormInput;
};

/** A node, according to the Relay specification. */
export type Node = {
    /** The id of this node. */
    id: Scalars['ID']['output'];
};

export type Pais = Node & {
    __typename?: 'Pais';
    _id: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    nombre: Scalars['String']['output'];
};

/** Cursor connection for Pais. */
export type PaisCursorConnection = {
    __typename?: 'PaisCursorConnection';
    edges?: Maybe<Array<Maybe<PaisEdge>>>;
    pageInfo: PaisPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Pais. */
export type PaisEdge = {
    __typename?: 'PaisEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Pais>;
};

/** Information about the current page. */
export type PaisPageInfo = {
    __typename?: 'PaisPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Parada = Node & {
    __typename?: 'Parada';
    _id: Scalars['Int']['output'];
    enclave?: Maybe<Enclave>;
    id: Scalars['ID']['output'];
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    recorridos?: Maybe<RecorridoCursorConnection>;
    status?: Maybe<Status>;
};

export type ParadaRecorridosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Parada. */
export type ParadaCursorConnection = {
    __typename?: 'ParadaCursorConnection';
    edges?: Maybe<Array<Maybe<ParadaEdge>>>;
    pageInfo: ParadaPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Parada. */
export type ParadaEdge = {
    __typename?: 'ParadaEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Parada>;
};

/** Information about the current page. */
export type ParadaPageInfo = {
    __typename?: 'ParadaPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Permiso = Node & {
    __typename?: 'Permiso';
    _id: Scalars['Int']['output'];
    hijos?: Maybe<PermisoCursorConnection>;
    id: Scalars['ID']['output'];
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    padre?: Maybe<Permiso>;
    status?: Maybe<Status>;
    usuarios?: Maybe<UserPageConnection>;
};

export type PermisoHijosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type PermisoUsuariosArgs = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    apellido_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    createdAt?: InputMaybe<Array<InputMaybe<UserFilter_CreatedAt>>>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombre_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<UserFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    username?: InputMaybe<Scalars['String']['input']>;
    username_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Cursor connection for Permiso. */
export type PermisoCursorConnection = {
    __typename?: 'PermisoCursorConnection';
    edges?: Maybe<Array<Maybe<PermisoEdge>>>;
    pageInfo: PermisoPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Permiso. */
export type PermisoEdge = {
    __typename?: 'PermisoEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Permiso>;
};

/** Information about the current page. */
export type PermisoPageInfo = {
    __typename?: 'PermisoPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Piloto = Node & {
    __typename?: 'Piloto';
    _id: Scalars['Int']['output'];
    apellido?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    dpi?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    fechaNacimiento?: Maybe<Scalars['String']['output']>;
    fullName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    licencia?: Maybe<Scalars['String']['output']>;
    licenciaVencimiento?: Maybe<Scalars['String']['output']>;
    localidad?: Maybe<Localidad>;
    nacionalidad?: Maybe<Scalars['String']['output']>;
    nit?: Maybe<Scalars['String']['output']>;
    nombre: Scalars['String']['output'];
    seguroSocial?: Maybe<Scalars['String']['output']>;
    sexo?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['String']['output'];
};

export type PilotoFilter_CreatedAt = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    strictly_after?: InputMaybe<Scalars['String']['input']>;
    strictly_before?: InputMaybe<Scalars['String']['input']>;
};

export type PilotoFilter_Order = {
    createdAt?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
};

/** Page connection for Piloto. */
export type PilotoPageConnection = {
    __typename?: 'PilotoPageConnection';
    collection?: Maybe<Array<Maybe<Piloto>>>;
    paginationInfo: PilotoPaginationInfo;
};

/** Information about the pagination. */
export type PilotoPaginationInfo = {
    __typename?: 'PilotoPaginationInfo';
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    lastPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
};

export type Query = {
    __typename?: 'Query';
    agencia?: Maybe<Agencia>;
    agencias?: Maybe<AgenciaCursorConnection>;
    asiento?: Maybe<Asiento>;
    asientos?: Maybe<AsientoCursorConnection>;
    boleto?: Maybe<Boleto>;
    boletoLog?: Maybe<BoletoLog>;
    boletoLogs?: Maybe<BoletoLogCursorConnection>;
    boletos?: Maybe<BoletoCursorConnection>;
    bus?: Maybe<Bus>;
    buses?: Maybe<BusPageConnection>;
    cliente?: Maybe<Cliente>;
    clientes?: Maybe<ClienteCursorConnection>;
    columnFieldsResource?: Maybe<ColumnFieldsResource>;
    columnFieldsResources?: Maybe<ColumnFieldsResourceCursorConnection>;
    columnsMetadataResource?: Maybe<MetadataResource>;
    create_form?: Maybe<Create_Form>;
    create_forms?: Maybe<Create_FormCursorConnection>;
    empresa?: Maybe<Empresa>;
    empresas?: Maybe<EmpresaPageConnection>;
    enclave?: Maybe<Enclave>;
    enclaves?: Maybe<EnclaveCursorConnection>;
    estacion?: Maybe<Estacion>;
    estacions?: Maybe<EstacionPageConnection>;
    fDN?: Maybe<Fdn>;
    fDNs?: Maybe<FdnCursorConnection>;
    factura?: Maybe<Factura>;
    facturas?: Maybe<FacturaCursorConnection>;
    getMetadataResource?: Maybe<MetadataResource>;
    getResource?: Maybe<Resource>;
    getUserByUsernameUser?: Maybe<User>;
    localidad?: Maybe<Localidad>;
    localidads?: Maybe<LocalidadCursorConnection>;
    menu?: Maybe<Menu>;
    menus?: Maybe<MenuCursorConnection>;
    node?: Maybe<Node>;
    pais?: Maybe<PaisCursorConnection>;
    parada?: Maybe<Parada>;
    paradas?: Maybe<ParadaCursorConnection>;
    permiso?: Maybe<Permiso>;
    permisos?: Maybe<PermisoCursorConnection>;
    piloto?: Maybe<Piloto>;
    pilotos?: Maybe<PilotoPageConnection>;
    recorrido?: Maybe<Recorrido>;
    recorridoAsientoPrecio?: Maybe<RecorridoAsientoPrecio>;
    recorridoAsientoPrecios?: Maybe<RecorridoAsientoPrecioCursorConnection>;
    recorridos?: Maybe<RecorridoCursorConnection>;
    salida?: Maybe<Salida>;
    salidaLog?: Maybe<SalidaLog>;
    salidaLogs?: Maybe<SalidaLogCursorConnection>;
    salidas?: Maybe<SalidaCursorConnection>;
    taxa?: Maybe<TaxonCursorConnection>;
    taxon?: Maybe<Taxon>;
    user?: Maybe<User>;
    users?: Maybe<UserPageConnection>;
    venta?: Maybe<Venta>;
    ventas?: Maybe<VentaCursorConnection>;
};

export type QueryAgenciaArgs = {
    id: Scalars['ID']['input'];
};

export type QueryAgenciasArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryAsientoArgs = {
    id: Scalars['ID']['input'];
};

export type QueryAsientosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryBoletoArgs = {
    id: Scalars['ID']['input'];
};

export type QueryBoletoLogArgs = {
    id: Scalars['ID']['input'];
};

export type QueryBoletoLogsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryBoletosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryBusArgs = {
    id: Scalars['ID']['input'];
};

export type QueryBusesArgs = {
    createdAt?: InputMaybe<Array<InputMaybe<BusFilter_CreatedAt>>>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    marca?: InputMaybe<Scalars['String']['input']>;
    marca_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<BusFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    placa?: InputMaybe<Scalars['String']['input']>;
    placa_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryClienteArgs = {
    id: Scalars['ID']['input'];
};

export type QueryClientesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryColumnFieldsResourceArgs = {
    id: Scalars['ID']['input'];
};

export type QueryColumnFieldsResourcesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryColumnsMetadataResourceArgs = {
    entity?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCreate_FormArgs = {
    id: Scalars['ID']['input'];
};

export type QueryCreate_FormsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEmpresaArgs = {
    id: Scalars['ID']['input'];
};

export type QueryEmpresasArgs = {
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEnclaveArgs = {
    id: Scalars['ID']['input'];
};

export type QueryEnclavesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEstacionArgs = {
    id: Scalars['ID']['input'];
};

export type QueryEstacionsArgs = {
    alias?: InputMaybe<Scalars['String']['input']>;
    alias_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombre_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<EstacionFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryFDnArgs = {
    id: Scalars['ID']['input'];
};

export type QueryFdNsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryFacturaArgs = {
    id: Scalars['ID']['input'];
};

export type QueryFacturasArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetMetadataResourceArgs = {
    entity?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetResourceArgs = {
    entity?: InputMaybe<Scalars['String']['input']>;
    field?: InputMaybe<Scalars['String']['input']>;
    value?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetUserByUsernameUserArgs = {
    username?: InputMaybe<Scalars['String']['input']>;
};

export type QueryLocalidadArgs = {
    id: Scalars['ID']['input'];
};

export type QueryLocalidadsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryMenuArgs = {
    id: Scalars['ID']['input'];
};

export type QueryMenusArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryNodeArgs = {
    id: Scalars['ID']['input'];
};

export type QueryPaisArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryParadaArgs = {
    id: Scalars['ID']['input'];
};

export type QueryParadasArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPermisoArgs = {
    id: Scalars['ID']['input'];
};

export type QueryPermisosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPilotoArgs = {
    id: Scalars['ID']['input'];
};

export type QueryPilotosArgs = {
    createdAt?: InputMaybe<Array<InputMaybe<PilotoFilter_CreatedAt>>>;
    email?: InputMaybe<Scalars['String']['input']>;
    email_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    fullName?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    licencia?: InputMaybe<Scalars['String']['input']>;
    licencia_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<PilotoFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    telefono_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryRecorridoArgs = {
    id: Scalars['ID']['input'];
};

export type QueryRecorridoAsientoPrecioArgs = {
    id: Scalars['ID']['input'];
};

export type QueryRecorridoAsientoPreciosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryRecorridosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySalidaArgs = {
    id: Scalars['ID']['input'];
};

export type QuerySalidaLogArgs = {
    id: Scalars['ID']['input'];
};

export type QuerySalidaLogsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySalidasArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTaxaArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTaxonArgs = {
    id: Scalars['ID']['input'];
};

export type QueryUserArgs = {
    id: Scalars['ID']['input'];
};

export type QueryUsersArgs = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    apellido_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    createdAt?: InputMaybe<Array<InputMaybe<UserFilter_CreatedAt>>>;
    fullName?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['Int']['input']>;
    id_list?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    itemsPerPage?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombre_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    order?: InputMaybe<Array<InputMaybe<UserFilter_Order>>>;
    page?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    username?: InputMaybe<Scalars['String']['input']>;
    username_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryVentaArgs = {
    id: Scalars['ID']['input'];
};

export type QueryVentasArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type Recorrido = Node & {
    __typename?: 'Recorrido';
    _id: Scalars['Int']['output'];
    distancia?: Maybe<Scalars['Float']['output']>;
    final?: Maybe<Parada>;
    id: Scalars['ID']['output'];
    inicio?: Maybe<Parada>;
    legacyId?: Maybe<Scalars['Int']['output']>;
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Status>;
    tiempo?: Maybe<Scalars['String']['output']>;
};

export type RecorridoAsientoPrecio = Node & {
    __typename?: 'RecorridoAsientoPrecio';
    _id: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    precioAsientoA?: Maybe<Scalars['Float']['output']>;
    precioAsientoB?: Maybe<Scalars['Float']['output']>;
    recorrido: Recorrido;
};

/** Cursor connection for RecorridoAsientoPrecio. */
export type RecorridoAsientoPrecioCursorConnection = {
    __typename?: 'RecorridoAsientoPrecioCursorConnection';
    edges?: Maybe<Array<Maybe<RecorridoAsientoPrecioEdge>>>;
    pageInfo: RecorridoAsientoPrecioPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of RecorridoAsientoPrecio. */
export type RecorridoAsientoPrecioEdge = {
    __typename?: 'RecorridoAsientoPrecioEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<RecorridoAsientoPrecio>;
};

/** Information about the current page. */
export type RecorridoAsientoPrecioPageInfo = {
    __typename?: 'RecorridoAsientoPrecioPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Cursor connection for Recorrido. */
export type RecorridoCursorConnection = {
    __typename?: 'RecorridoCursorConnection';
    edges?: Maybe<Array<Maybe<RecorridoEdge>>>;
    pageInfo: RecorridoPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Recorrido. */
export type RecorridoEdge = {
    __typename?: 'RecorridoEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Recorrido>;
};

/** Information about the current page. */
export type RecorridoPageInfo = {
    __typename?: 'RecorridoPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type Resource = Node & {
    __typename?: 'Resource';
    _id: Scalars['String']['output'];
    estacion?: Maybe<Estacion>;
    id: Scalars['ID']['output'];
    user?: Maybe<User>;
};

export type Salida = Node & {
    __typename?: 'Salida';
    _id: Scalars['Int']['output'];
    boletos?: Maybe<BoletoCursorConnection>;
    bus?: Maybe<Bus>;
    createdAt: Scalars['String']['output'];
    empresa?: Maybe<Empresa>;
    fecha?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    recorrido: Recorrido;
    salidaLogs?: Maybe<SalidaLogCursorConnection>;
    status?: Maybe<Status>;
    updatedAt: Scalars['String']['output'];
};

export type SalidaBoletosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type SalidaSalidaLogsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Salida. */
export type SalidaCursorConnection = {
    __typename?: 'SalidaCursorConnection';
    edges?: Maybe<Array<Maybe<SalidaEdge>>>;
    pageInfo: SalidaPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Salida. */
export type SalidaEdge = {
    __typename?: 'SalidaEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Salida>;
};

export type SalidaLog = Node & {
    __typename?: 'SalidaLog';
    _id: Scalars['Int']['output'];
    createdAt: Scalars['String']['output'];
    descripcion?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    salida: Salida;
    tipo?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['String']['output'];
    user?: Maybe<User>;
};

/** Cursor connection for SalidaLog. */
export type SalidaLogCursorConnection = {
    __typename?: 'SalidaLogCursorConnection';
    edges?: Maybe<Array<Maybe<SalidaLogEdge>>>;
    pageInfo: SalidaLogPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of SalidaLog. */
export type SalidaLogEdge = {
    __typename?: 'SalidaLogEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<SalidaLog>;
};

/** Information about the current page. */
export type SalidaLogPageInfo = {
    __typename?: 'SalidaLogPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Information about the current page. */
export type SalidaPageInfo = {
    __typename?: 'SalidaPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export enum Status {
    Activo = 'activo',
    Cancelado = 'cancelado',
    Confirmado = 'confirmado',
    Creado = 'creado',
    Error = 'error',
    Expirado = 'expirado',
    Finalizado = 'finalizado',
    Inactivo = 'inactivo',
    Pausa = 'pausa',
    Progreso = 'progreso',
    Reasignado = 'reasignado'
}

export type Taxon = Node & {
    __typename?: 'Taxon';
    _id: Scalars['Int']['output'];
    children?: Maybe<TaxonCursorConnection>;
    id: Scalars['ID']['output'];
    nombre?: Maybe<Scalars['String']['output']>;
    nota?: Maybe<Scalars['String']['output']>;
    parent?: Maybe<Taxon>;
    posicion?: Maybe<Scalars['Int']['output']>;
    status?: Maybe<Status>;
};

export type TaxonChildrenArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Taxon. */
export type TaxonCursorConnection = {
    __typename?: 'TaxonCursorConnection';
    edges?: Maybe<Array<Maybe<TaxonEdge>>>;
    pageInfo: TaxonPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Taxon. */
export type TaxonEdge = {
    __typename?: 'TaxonEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Taxon>;
};

/** Information about the current page. */
export type TaxonPageInfo = {
    __typename?: 'TaxonPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

export type User = Node & {
    __typename?: 'User';
    _id: Scalars['Int']['output'];
    apellido?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    direccion?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    fullName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    legacyId?: Maybe<Scalars['Int']['output']>;
    localidad?: Maybe<Localidad>;
    nit?: Maybe<Scalars['String']['output']>;
    nombre: Scalars['String']['output'];
    password?: Maybe<Scalars['String']['output']>;
    permisos?: Maybe<PermisoCursorConnection>;
    roles: Scalars['Iterable']['output'];
    status?: Maybe<Status>;
    telefono?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['String']['output'];
    userIdentifier: Scalars['String']['output'];
    username: Scalars['String']['output'];
    validTokenStrings: Scalars['Iterable']['output'];
};

export type UserPermisosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFilter_CreatedAt = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    strictly_after?: InputMaybe<Scalars['String']['input']>;
    strictly_before?: InputMaybe<Scalars['String']['input']>;
};

export type UserFilter_Order = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
    username?: InputMaybe<Scalars['String']['input']>;
};

/** Page connection for User. */
export type UserPageConnection = {
    __typename?: 'UserPageConnection';
    collection?: Maybe<Array<Maybe<User>>>;
    paginationInfo: UserPaginationInfo;
};

/** Information about the pagination. */
export type UserPaginationInfo = {
    __typename?: 'UserPaginationInfo';
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    lastPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
};

export type Venta = Node & {
    __typename?: 'Venta';
    _id: Scalars['Int']['output'];
    createdAt: Scalars['String']['output'];
    factura?: Maybe<Factura>;
    id: Scalars['ID']['output'];
    ida: Salida;
    precio?: Maybe<Scalars['Float']['output']>;
    regreso: Salida;
    status?: Maybe<Status>;
    updatedAt: Scalars['String']['output'];
    user: User;
};

/** Cursor connection for Venta. */
export type VentaCursorConnection = {
    __typename?: 'VentaCursorConnection';
    edges?: Maybe<Array<Maybe<VentaEdge>>>;
    pageInfo: VentaPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of Venta. */
export type VentaEdge = {
    __typename?: 'VentaEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Venta>;
};

/** Information about the current page. */
export type VentaPageInfo = {
    __typename?: 'VentaPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Creates a Agencia. */
export type CreateAgenciaInput = {
    alias: Scalars['String']['input'];
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Creates a Agencia. */
export type CreateAgenciaPayload = {
    __typename?: 'createAgenciaPayload';
    agencia?: Maybe<Agencia>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Creates a Asiento. */
export type CreateAsientoInput = {
    bus: Scalars['String']['input'];
    clase?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    numero: Scalars['Int']['input'];
};

/** Creates a Asiento. */
export type CreateAsientoPayload = {
    __typename?: 'createAsientoPayload';
    asiento?: Maybe<Asiento>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Creates a Boleto. */
export type CreateBoletoInput = {
    asiento: Scalars['String']['input'];
    boletoLogs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    cliente: Scalars['String']['input'];
    createdAt: Scalars['String']['input'];
    precio?: InputMaybe<Scalars['Float']['input']>;
    salida: Scalars['String']['input'];
    status?: InputMaybe<Status>;
    updatedAt: Scalars['String']['input'];
};

/** Creates a BoletoLog. */
export type CreateBoletoLogInput = {
    boleto: Scalars['String']['input'];
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    descripcion?: InputMaybe<Scalars['String']['input']>;
    tipo?: InputMaybe<Scalars['Int']['input']>;
    updatedAt: Scalars['String']['input'];
    user?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a BoletoLog. */
export type CreateBoletoLogPayload = {
    __typename?: 'createBoletoLogPayload';
    boletoLog?: Maybe<BoletoLog>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Creates a Boleto. */
export type CreateBoletoPayload = {
    __typename?: 'createBoletoPayload';
    boleto?: Maybe<Boleto>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Creates a Cliente. */
export type CreateClienteInput = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    direccion?: InputMaybe<Scalars['String']['input']>;
    dpi?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre: Scalars['String']['input'];
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt: Scalars['String']['input'];
};

/** Creates a Cliente. */
export type CreateClientePayload = {
    __typename?: 'createClientePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    cliente?: Maybe<Cliente>;
};

/** Creates a ColumnFieldsResource. */
export type CreateColumnFieldsResourceInput = {
    className: Scalars['String']['input'];
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a ColumnFieldsResource. */
export type CreateColumnFieldsResourcePayload = {
    __typename?: 'createColumnFieldsResourcePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    columnFieldsResource?: Maybe<ColumnFieldsResource>;
};

/** Creates a create_form. */
export type CreateCreate_FormInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a create_form. */
export type CreateCreate_FormPayload = {
    __typename?: 'createCreate_formPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    create_form?: Maybe<Create_Form>;
};

/** Creates a Empresa. */
export type CreateEmpresaInput = {
    alias?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    denominacionSocial?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre: Scalars['String']['input'];
    nombreComercial?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt: Scalars['String']['input'];
};

/** Creates a Empresa. */
export type CreateEmpresaPayload = {
    __typename?: 'createEmpresaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    empresa?: Maybe<Empresa>;
};

/** Creates a Enclave. */
export type CreateEnclaveInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Enclave. */
export type CreateEnclavePayload = {
    __typename?: 'createEnclavePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    enclave?: Maybe<Enclave>;
};

/** Creates a Estacion. */
export type CreateEstacionInput = {
    alias: Scalars['String']['input'];
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Creates a Estacion. */
export type CreateEstacionPayload = {
    __typename?: 'createEstacionPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    estacion?: Maybe<Estacion>;
};

/** Creates a FDN. */
export type CreateFdnInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a FDN. */
export type CreateFdnPayload = {
    __typename?: 'createFDNPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    fDN?: Maybe<Fdn>;
};

/** Creates a Factura. */
export type CreateFacturaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    dte?: InputMaybe<Scalars['String']['input']>;
    fecha?: InputMaybe<Scalars['String']['input']>;
    serie?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    updatedAt: Scalars['String']['input'];
    uuid?: InputMaybe<Scalars['String']['input']>;
    venta?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Factura. */
export type CreateFacturaPayload = {
    __typename?: 'createFacturaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    factura?: Maybe<Factura>;
};

/** Creates a Localidad. */
export type CreateLocalidadInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    nombre: Scalars['String']['input'];
    pais?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Localidad. */
export type CreateLocalidadPayload = {
    __typename?: 'createLocalidadPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    localidad?: Maybe<Localidad>;
};

/** Creates a Menu. */
export type CreateMenuInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    link?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    parent?: InputMaybe<Scalars['String']['input']>;
    posicion?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Status>;
    tipo?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Menu. */
export type CreateMenuPayload = {
    __typename?: 'createMenuPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    menu?: Maybe<Menu>;
};

/** Creates a Pais. */
export type CreatePaisInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    nombre: Scalars['String']['input'];
};

/** Creates a Pais. */
export type CreatePaisPayload = {
    __typename?: 'createPaisPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    pais?: Maybe<Pais>;
};

/** Creates a Parada. */
export type CreateParadaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    enclave?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    recorridos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    status?: InputMaybe<Status>;
};

/** Creates a Parada. */
export type CreateParadaPayload = {
    __typename?: 'createParadaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    parada?: Maybe<Parada>;
};

/** Creates a Permiso. */
export type CreatePermisoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    hijos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    padre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    usuarios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Creates a Permiso. */
export type CreatePermisoPayload = {
    __typename?: 'createPermisoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    permiso?: Maybe<Permiso>;
};

/** Creates a RecorridoAsientoPrecio. */
export type CreateRecorridoAsientoPrecioInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    precioAsientoA?: InputMaybe<Scalars['Float']['input']>;
    precioAsientoB?: InputMaybe<Scalars['Float']['input']>;
    recorrido: Scalars['String']['input'];
};

/** Creates a RecorridoAsientoPrecio. */
export type CreateRecorridoAsientoPrecioPayload = {
    __typename?: 'createRecorridoAsientoPrecioPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorridoAsientoPrecio?: Maybe<RecorridoAsientoPrecio>;
};

/** Creates a Recorrido. */
export type CreateRecorridoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    distancia?: InputMaybe<Scalars['Float']['input']>;
    final?: InputMaybe<Scalars['String']['input']>;
    inicio?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    tiempo?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Recorrido. */
export type CreateRecorridoPayload = {
    __typename?: 'createRecorridoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorrido?: Maybe<Recorrido>;
};

/** Creates a Salida. */
export type CreateSalidaInput = {
    boletos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    bus?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    empresa?: InputMaybe<Scalars['String']['input']>;
    fecha?: InputMaybe<Scalars['String']['input']>;
    recorrido: Scalars['String']['input'];
    salidaLogs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    status?: InputMaybe<Status>;
    updatedAt: Scalars['String']['input'];
};

/** Creates a SalidaLog. */
export type CreateSalidaLogInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    descripcion?: InputMaybe<Scalars['String']['input']>;
    salida: Scalars['String']['input'];
    tipo?: InputMaybe<Scalars['String']['input']>;
    updatedAt: Scalars['String']['input'];
    user?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a SalidaLog. */
export type CreateSalidaLogPayload = {
    __typename?: 'createSalidaLogPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salidaLog?: Maybe<SalidaLog>;
};

/** Creates a Salida. */
export type CreateSalidaPayload = {
    __typename?: 'createSalidaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salida?: Maybe<Salida>;
};

/** Creates a Taxon. */
export type CreateTaxonInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    parent?: InputMaybe<Scalars['String']['input']>;
    posicion?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Status>;
};

/** Creates a Taxon. */
export type CreateTaxonPayload = {
    __typename?: 'createTaxonPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    taxon?: Maybe<Taxon>;
};

/** Creates a User. */
export type CreateUserInput = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre: Scalars['String']['input'];
    password?: InputMaybe<Scalars['String']['input']>;
    permisos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    roles: Scalars['Iterable']['input'];
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

/** Creates a User. */
export type CreateUserPayload = {
    __typename?: 'createUserPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    user?: Maybe<User>;
};

/** Creates a Venta. */
export type CreateVentaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt: Scalars['String']['input'];
    factura?: InputMaybe<Scalars['String']['input']>;
    ida: Scalars['String']['input'];
    precio?: InputMaybe<Scalars['Float']['input']>;
    regreso: Scalars['String']['input'];
    status?: InputMaybe<Status>;
    updatedAt: Scalars['String']['input'];
    user: Scalars['String']['input'];
};

/** Creates a Venta. */
export type CreateVentaPayload = {
    __typename?: 'createVentaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    venta?: Maybe<Venta>;
};

export type Create_Form = Node & {
    __typename?: 'create_form';
    id: Scalars['ID']['output'];
};

/** Cursor connection for create_form. */
export type Create_FormCursorConnection = {
    __typename?: 'create_formCursorConnection';
    edges?: Maybe<Array<Maybe<Create_FormEdge>>>;
    pageInfo: Create_FormPageInfo;
    totalCount: Scalars['Int']['output'];
};

/** Edge of create_form. */
export type Create_FormEdge = {
    __typename?: 'create_formEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<Create_Form>;
};

/** Information about the current page. */
export type Create_FormPageInfo = {
    __typename?: 'create_formPageInfo';
    endCursor?: Maybe<Scalars['String']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
    hasPreviousPage: Scalars['Boolean']['output'];
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Deletes a Agencia. */
export type DeleteAgenciaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Agencia. */
export type DeleteAgenciaPayload = {
    __typename?: 'deleteAgenciaPayload';
    agencia?: Maybe<Agencia>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Deletes a Asiento. */
export type DeleteAsientoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Asiento. */
export type DeleteAsientoPayload = {
    __typename?: 'deleteAsientoPayload';
    asiento?: Maybe<Asiento>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Deletes a Boleto. */
export type DeleteBoletoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a BoletoLog. */
export type DeleteBoletoLogInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a BoletoLog. */
export type DeleteBoletoLogPayload = {
    __typename?: 'deleteBoletoLogPayload';
    boletoLog?: Maybe<BoletoLog>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Deletes a Boleto. */
export type DeleteBoletoPayload = {
    __typename?: 'deleteBoletoPayload';
    boleto?: Maybe<Boleto>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Deletes a Cliente. */
export type DeleteClienteInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Cliente. */
export type DeleteClientePayload = {
    __typename?: 'deleteClientePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    cliente?: Maybe<Cliente>;
};

/** Deletes a ColumnFieldsResource. */
export type DeleteColumnFieldsResourceInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a ColumnFieldsResource. */
export type DeleteColumnFieldsResourcePayload = {
    __typename?: 'deleteColumnFieldsResourcePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    columnFieldsResource?: Maybe<ColumnFieldsResource>;
};

/** Deletes a create_form. */
export type DeleteCreate_FormInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a create_form. */
export type DeleteCreate_FormPayload = {
    __typename?: 'deleteCreate_formPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    create_form?: Maybe<Create_Form>;
};

/** Deletes a Empresa. */
export type DeleteEmpresaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Empresa. */
export type DeleteEmpresaPayload = {
    __typename?: 'deleteEmpresaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    empresa?: Maybe<Empresa>;
};

/** Deletes a Enclave. */
export type DeleteEnclaveInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Enclave. */
export type DeleteEnclavePayload = {
    __typename?: 'deleteEnclavePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    enclave?: Maybe<Enclave>;
};

/** Deletes a Estacion. */
export type DeleteEstacionInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Estacion. */
export type DeleteEstacionPayload = {
    __typename?: 'deleteEstacionPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    estacion?: Maybe<Estacion>;
};

/** Deletes a FDN. */
export type DeleteFdnInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a FDN. */
export type DeleteFdnPayload = {
    __typename?: 'deleteFDNPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    fDN?: Maybe<Fdn>;
};

/** Deletes a Factura. */
export type DeleteFacturaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Factura. */
export type DeleteFacturaPayload = {
    __typename?: 'deleteFacturaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    factura?: Maybe<Factura>;
};

/** Deletes a Localidad. */
export type DeleteLocalidadInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Localidad. */
export type DeleteLocalidadPayload = {
    __typename?: 'deleteLocalidadPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    localidad?: Maybe<Localidad>;
};

/** Deletes a Menu. */
export type DeleteMenuInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Menu. */
export type DeleteMenuPayload = {
    __typename?: 'deleteMenuPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    menu?: Maybe<Menu>;
};

/** Deletes a MultipleResource. */
export type DeleteMultipleResourceInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    resource?: InputMaybe<Scalars['String']['input']>;
};

/** Deletes a MultipleResource. */
export type DeleteMultipleResourcePayload = {
    __typename?: 'deleteMultipleResourcePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    multipleResource?: Maybe<MultipleResource>;
};

/** Deletes a Pais. */
export type DeletePaisInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Pais. */
export type DeletePaisPayload = {
    __typename?: 'deletePaisPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    pais?: Maybe<Pais>;
};

/** Deletes a Parada. */
export type DeleteParadaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Parada. */
export type DeleteParadaPayload = {
    __typename?: 'deleteParadaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    parada?: Maybe<Parada>;
};

/** Deletes a Permiso. */
export type DeletePermisoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Permiso. */
export type DeletePermisoPayload = {
    __typename?: 'deletePermisoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    permiso?: Maybe<Permiso>;
};

/** Deletes a RecorridoAsientoPrecio. */
export type DeleteRecorridoAsientoPrecioInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a RecorridoAsientoPrecio. */
export type DeleteRecorridoAsientoPrecioPayload = {
    __typename?: 'deleteRecorridoAsientoPrecioPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorridoAsientoPrecio?: Maybe<RecorridoAsientoPrecio>;
};

/** Deletes a Recorrido. */
export type DeleteRecorridoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Recorrido. */
export type DeleteRecorridoPayload = {
    __typename?: 'deleteRecorridoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorrido?: Maybe<Recorrido>;
};

/** Deletes a Salida. */
export type DeleteSalidaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a SalidaLog. */
export type DeleteSalidaLogInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a SalidaLog. */
export type DeleteSalidaLogPayload = {
    __typename?: 'deleteSalidaLogPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salidaLog?: Maybe<SalidaLog>;
};

/** Deletes a Salida. */
export type DeleteSalidaPayload = {
    __typename?: 'deleteSalidaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salida?: Maybe<Salida>;
};

/** Deletes a Taxon. */
export type DeleteTaxonInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Taxon. */
export type DeleteTaxonPayload = {
    __typename?: 'deleteTaxonPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    taxon?: Maybe<Taxon>;
};

/** Deletes a User. */
export type DeleteUserInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a User. */
export type DeleteUserPayload = {
    __typename?: 'deleteUserPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    user?: Maybe<User>;
};

/** Deletes a Venta. */
export type DeleteVentaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Deletes a Venta. */
export type DeleteVentaPayload = {
    __typename?: 'deleteVentaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    venta?: Maybe<Venta>;
};

/** Updates a Agencia. */
export type UpdateAgenciaInput = {
    alias?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Updates a Agencia. */
export type UpdateAgenciaPayload = {
    __typename?: 'updateAgenciaPayload';
    agencia?: Maybe<Agencia>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Updates a Asiento. */
export type UpdateAsientoInput = {
    bus?: InputMaybe<Scalars['String']['input']>;
    clase?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    numero?: InputMaybe<Scalars['Int']['input']>;
};

/** Updates a Asiento. */
export type UpdateAsientoPayload = {
    __typename?: 'updateAsientoPayload';
    asiento?: Maybe<Asiento>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Updates a Boleto. */
export type UpdateBoletoInput = {
    asiento?: InputMaybe<Scalars['String']['input']>;
    boletoLogs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    cliente?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    precio?: InputMaybe<Scalars['Float']['input']>;
    salida?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a BoletoLog. */
export type UpdateBoletoLogInput = {
    boleto?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    descripcion?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    tipo?: InputMaybe<Scalars['Int']['input']>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
    user?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a BoletoLog. */
export type UpdateBoletoLogPayload = {
    __typename?: 'updateBoletoLogPayload';
    boletoLog?: Maybe<BoletoLog>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Updates a Boleto. */
export type UpdateBoletoPayload = {
    __typename?: 'updateBoletoPayload';
    boleto?: Maybe<Boleto>;
    clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Updates a Cliente. */
export type UpdateClienteInput = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    dpi?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Cliente. */
export type UpdateClientePayload = {
    __typename?: 'updateClientePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    cliente?: Maybe<Cliente>;
};

/** Updates a ColumnFieldsResource. */
export type UpdateColumnFieldsResourceInput = {
    className?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Updates a ColumnFieldsResource. */
export type UpdateColumnFieldsResourcePayload = {
    __typename?: 'updateColumnFieldsResourcePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    columnFieldsResource?: Maybe<ColumnFieldsResource>;
};

/** Updates a create_form. */
export type UpdateCreate_FormInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Updates a create_form. */
export type UpdateCreate_FormPayload = {
    __typename?: 'updateCreate_formPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    create_form?: Maybe<Create_Form>;
};

/** Updates a Empresa. */
export type UpdateEmpresaInput = {
    alias?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    denominacionSocial?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nombreComercial?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Empresa. */
export type UpdateEmpresaPayload = {
    __typename?: 'updateEmpresaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    empresa?: Maybe<Empresa>;
};

/** Updates a Enclave. */
export type UpdateEnclaveInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Enclave. */
export type UpdateEnclavePayload = {
    __typename?: 'updateEnclavePayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    enclave?: Maybe<Enclave>;
};

/** Updates a Estacion. */
export type UpdateEstacionInput = {
    alias?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Updates a Estacion. */
export type UpdateEstacionPayload = {
    __typename?: 'updateEstacionPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    estacion?: Maybe<Estacion>;
};

/** Updates a FDN. */
export type UpdateFdnInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
};

/** Updates a FDN. */
export type UpdateFdnPayload = {
    __typename?: 'updateFDNPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    fDN?: Maybe<Fdn>;
};

/** Updates a Factura. */
export type UpdateFacturaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    dte?: InputMaybe<Scalars['String']['input']>;
    fecha?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    serie?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
    uuid?: InputMaybe<Scalars['String']['input']>;
    venta?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Factura. */
export type UpdateFacturaPayload = {
    __typename?: 'updateFacturaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    factura?: Maybe<Factura>;
};

/** Updates a Localidad. */
export type UpdateLocalidadInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    nombre?: InputMaybe<Scalars['String']['input']>;
    pais?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Localidad. */
export type UpdateLocalidadPayload = {
    __typename?: 'updateLocalidadPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    localidad?: Maybe<Localidad>;
};

/** Updates a Menu. */
export type UpdateMenuInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    link?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    parent?: InputMaybe<Scalars['String']['input']>;
    posicion?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Status>;
    tipo?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Menu. */
export type UpdateMenuPayload = {
    __typename?: 'updateMenuPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    menu?: Maybe<Menu>;
};

/** Updates a Pais. */
export type UpdatePaisInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    nombre?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Pais. */
export type UpdatePaisPayload = {
    __typename?: 'updatePaisPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    pais?: Maybe<Pais>;
};

/** Updates a Parada. */
export type UpdateParadaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    enclave?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    recorridos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    status?: InputMaybe<Status>;
};

/** Updates a Parada. */
export type UpdateParadaPayload = {
    __typename?: 'updateParadaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    parada?: Maybe<Parada>;
};

/** Updates a Permiso. */
export type UpdatePermisoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    hijos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    id: Scalars['ID']['input'];
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    padre?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    usuarios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Updates a Permiso. */
export type UpdatePermisoPayload = {
    __typename?: 'updatePermisoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    permiso?: Maybe<Permiso>;
};

/** Updates a RecorridoAsientoPrecio. */
export type UpdateRecorridoAsientoPrecioInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    precioAsientoA?: InputMaybe<Scalars['Float']['input']>;
    precioAsientoB?: InputMaybe<Scalars['Float']['input']>;
    recorrido?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a RecorridoAsientoPrecio. */
export type UpdateRecorridoAsientoPrecioPayload = {
    __typename?: 'updateRecorridoAsientoPrecioPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorridoAsientoPrecio?: Maybe<RecorridoAsientoPrecio>;
};

/** Updates a Recorrido. */
export type UpdateRecorridoInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    distancia?: InputMaybe<Scalars['Float']['input']>;
    final?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    inicio?: InputMaybe<Scalars['String']['input']>;
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    tiempo?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Recorrido. */
export type UpdateRecorridoPayload = {
    __typename?: 'updateRecorridoPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    recorrido?: Maybe<Recorrido>;
};

/** Updates a Salida. */
export type UpdateSalidaInput = {
    boletos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    bus?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    empresa?: InputMaybe<Scalars['String']['input']>;
    fecha?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    recorrido?: InputMaybe<Scalars['String']['input']>;
    salidaLogs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    status?: InputMaybe<Status>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a SalidaLog. */
export type UpdateSalidaLogInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    descripcion?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    salida?: InputMaybe<Scalars['String']['input']>;
    tipo?: InputMaybe<Scalars['String']['input']>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
    user?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a SalidaLog. */
export type UpdateSalidaLogPayload = {
    __typename?: 'updateSalidaLogPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salidaLog?: Maybe<SalidaLog>;
};

/** Updates a Salida. */
export type UpdateSalidaPayload = {
    __typename?: 'updateSalidaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    salida?: Maybe<Salida>;
};

/** Updates a Taxon. */
export type UpdateTaxonInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    nombre?: InputMaybe<Scalars['String']['input']>;
    nota?: InputMaybe<Scalars['String']['input']>;
    parent?: InputMaybe<Scalars['String']['input']>;
    posicion?: InputMaybe<Scalars['Int']['input']>;
    status?: InputMaybe<Status>;
};

/** Updates a Taxon. */
export type UpdateTaxonPayload = {
    __typename?: 'updateTaxonPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    taxon?: Maybe<Taxon>;
};

/** Updates a User. */
export type UpdateUserInput = {
    apellido?: InputMaybe<Scalars['String']['input']>;
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    direccion?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    legacyId?: InputMaybe<Scalars['Int']['input']>;
    localidad?: InputMaybe<Scalars['String']['input']>;
    nit?: InputMaybe<Scalars['String']['input']>;
    nombre?: InputMaybe<Scalars['String']['input']>;
    password?: InputMaybe<Scalars['String']['input']>;
    permisos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    roles?: InputMaybe<Scalars['Iterable']['input']>;
    status?: InputMaybe<Status>;
    telefono?: InputMaybe<Scalars['String']['input']>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
    username?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a User. */
export type UpdateUserPayload = {
    __typename?: 'updateUserPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    user?: Maybe<User>;
};

/** Updates a Venta. */
export type UpdateVentaInput = {
    clientMutationId?: InputMaybe<Scalars['String']['input']>;
    createdAt?: InputMaybe<Scalars['String']['input']>;
    factura?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['ID']['input'];
    ida?: InputMaybe<Scalars['String']['input']>;
    precio?: InputMaybe<Scalars['Float']['input']>;
    regreso?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Status>;
    updatedAt?: InputMaybe<Scalars['String']['input']>;
    user?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Venta. */
export type UpdateVentaPayload = {
    __typename?: 'updateVentaPayload';
    clientMutationId?: Maybe<Scalars['String']['output']>;
    venta?: Maybe<Venta>;
};
