<template>
<div class="wrapper">
  <v-card>
    <v-card-title>
      <h1>Clients</h1>
      <v-spacer></v-spacer>
      <v-btn color="info" @click.native.stop="newModal = true">new client</v-btn>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="normalizedClients"
      hide-actions
      class="elevation-1">
      <template slot="items"
        slot-scope="props">
					<td class="text-xs-left name">{{ props.item.name }}</td>
					<td class="text-xs-left">{{ props.item.email }}</td>
					<td class="text-xs-left">{{ phoneNormalized(props.item.phone) }}</td>
					<td class="text-xs-left">
            <span v-for="provider in props.item.providers" class="provider">{{provider.name}} </span>
          </td>
					<td class="text-xs-left">
            <button type="button" name="edit" class="edit" @click="getRowDataToModal(props.item)">edit</button>
          </td>
			</template>
    </v-data-table>
  </v-card>
  <ModalClientNew
    v-if="newModal"
    :newModal="newModal"
    :providers="providers"
    @handleModal="newModal = $event"
    @addNewProvider="addNewProvider"
    @deleteProvider="deleteProvider"
    @addNewClient="addNewClient"
  />
  <ModalClientEdit
    v-if="editModal"
    :editModal="editModal"
    :providers="providers"
    :clientInfo="clientInfo"
    @handleModal="editModal = $event"
    @addNewProvider="addNewProvider"
    @deleteProvider="deleteProvider"
    @deleteClient="deleteClient"
    @editClient="editClient"
  />
</div>
</template>

<script>
import { getClients } from '@/api'
import ModalClientNew from '@/components/clients/ModalClientNew'
import ModalClientEdit from '@/components/clients/ModalClientEdit'

export default {
  components: {
    ModalClientNew,
    ModalClientEdit
  },
  data: () => ({
    newModal: false,
    editModal: false,
    clientInfo: {},
    clients: [],
    providers: [],
    headers: [
      {
        text: 'Name',
        value: 'name',
        align: 'left'
      },
      {
        text: 'Email',
        value: 'email',
        align: 'left'
      },
      {
        text: 'Phone',
        value: 'phone',
        align: 'left'
      },
      {
        text: 'Providers',
        value: 'providers',
        align: 'left'
      },
      {
        sortable: false,
        value: 'edit',
        width: '100'
      }
    ]
  }),
  async mounted() {
    const data = await getClients()
    this.providers = data.providers
    this.clients = data.clients
  },
  computed: {
    normalizedClients() {
      const providersObj = this.providers.reduce((obj, item) => {
        obj[item.id] = item //eslint-disable-line
        return obj
      }, {})

      const clients = this.clients.map(client => ({
        ...client,
        providers: client.providers.map(provider => providersObj[provider.id])
      }))
      return clients
    }
  },
  methods: {
    getRowDataToModal(client) {
      this.clientInfo = client
      this.editModal = true
    },
    addNewClient(client) {
      this.clients.push(client)
    },
    editClient(client) {
      this.clients = this.clients.map(item => (item._id === client._id ? client : item))
    },
    deleteClient(id) {
      this.clients = this.clients.filter(item => item._id !== id)
    },
    addNewProvider(provider) {
      this.providers.push(provider)
    },
    deleteProvider(providerId) {
      this.providers = this.providers.filter(provider => provider.id !== providerId)
    },
    phoneNormalized(phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 20px

h1
  color: #3BA2F5

.provider
  text-transform: capitalize
  &:not(:last-child)::after
    content: ', '

.edit
  text-transform: capitalize
  text-decoration: underline
  color: #3BA2F5

.name
  text-transform: capitalize
</style>
