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
					<td class="text-xs-left">{{ props.item.name }}</td>
					<td class="text-xs-left">{{ props.item.email }}</td>
					<td class="text-xs-left">{{ phoneNormalized(props.item.phone) }}</td>
					<td class="text-xs-left">
            <span v-for="provider in props.item.providers" class="provider">{{provider.name}} </span>
          </td>
					<td class="text-xs-left">
            <button type="button" name="edit" class="edit">edit</button>
          </td>
			</template>
    </v-data-table>
  </v-card>
  <NewClientModal
    v-bind:newModal="newModal"
    v-bind:providers="providers"
    @handleModal="newModal = $event"
    @update="updateFromChild"
    @addNewProvider="addNewProvider"
    @deleteProvider="deleteProvider"
    @addNewClient="addNewClient"
  />
</div>
</template>

<script>
import { getClients } from '@/api'
import NewClientModal from '@/components/clients/ModalClientNew'

export default {
  components: {
    NewClientModal
  },
  data: () => ({
    newModal: false,
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
    addNewClient(client) {
      this.clients.push(client)
    },
    addNewProvider(provider) {
      this.providers.push(provider)
    },
    deleteProvider(providerId) {
      this.providers = this.providers.filter(provider => provider.id !== providerId)
    },
    phoneNormalized(phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    },
    updateFromChild(client) {
      this.clients.push(client)
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
</style>
