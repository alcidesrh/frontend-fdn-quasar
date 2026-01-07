import gql from 'graphql-tag'

export const DataUser = gql`
    fragment DataUser on User {
        _id
        id
        username
        telefono
        roles
        createdAt
        status
    }
`
export const columnsCollection = gql`
    query columnsCollection($entity: String) {
        columnsMetadataResource(entity: $entity) {
            columns
        }
    }
`
export const users = gql`
    query users($page: Int, $id: Int, $itemsPerPage: Int, $fullName: String, $username: String, $createdAt: [UserFilter_createdAt], $order: [UserFilter_order]) {
        users(page: $page, id: $id, itemsPerPage: $itemsPerPage, fullName: $fullName, username: $username, createdAt: $createdAt, order: $order) {
            collection {
                ...DataUser
                fullName
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
    ${DataUser}
`
export const pilotos = gql`
    query pilotos($page: Int, $id: Int, $itemsPerPage: Int, $fullName: String, $telefono: String, $licencia: String, $createdAt: [PilotoFilter_createdAt], $order: [PilotoFilter_order]) {
        pilotos(page: $page, id: $id, itemsPerPage: $itemsPerPage, fullName: $fullName, telefono: $telefono, licencia: $licencia, createdAt: $createdAt, order: $order) {
            collection {
                _id
                id
                fullName
                nit
                email
                telefono
                licencia
                createdAt
                status
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
`
export const buses = gql`
    query buses($page: Int, $id: Int, $itemsPerPage: Int, $marca: String, $placa: String, $createdAt: [BusFilter_createdAt], $order: [BusFilter_order]) {
        buses(page: $page, id: $id, itemsPerPage: $itemsPerPage, marca: $marca, placa: $placa, createdAt: $createdAt, order: $order) {
            collection {
                _id
                id
                codigo
                marca
                placa
                createdAt
                status
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
`
export const estacions = gql`
    query estacions($page: Int, $id: Int, $itemsPerPage: Int, $nombre: String, $alias: String, $order: [EstacionFilter_order]) {
        estacions(page: $page, id: $id, itemsPerPage: $itemsPerPage, nombre: $nombre, alias: $alias, order: $order) {
            collection {
                id
                _id
                nombre
                alias
                status
                direccion
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
`
export const updateUser = gql`
    mutation updateUser($input: updateUserInput!) {
        updateUser(input: $input) {
            user {
                id
            }
        }
    }
`
