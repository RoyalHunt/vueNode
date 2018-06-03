<template>
<div class="wrapper">
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="info"
        :to="{ name: 'Add New Parent'}">Add Parent</v-btn>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="parents"
      hide-actions
      class="elevation-1">
      <template slot="items"
        slot-scope="props">
					<td class="text-xs-left">{{ props.item.name }}</td>
					<td class="text-xs-left">{{ props.item.email }}</td>
					<td class="text-xs-left">{{ props.item.familyId }}</td>
					<td class="text-xs-left">{{ address(props) }}</td>
			</template>
    </v-data-table>
  </v-card>
</div>
</template>

<script>
import { getParents } from '@/api'

export default {
  data: () => ({
    parents: [],
    amountOfRows: [10, 25, 50],
    search: '',
    headers: [
      {
        sortable: false,
        value: 'photoId',
        width: '100'
      },
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
        text: 'Family ID',
        value: 'familyId',
        align: 'left'
      },
      {
        text: 'Address',
        value: 'address',
        align: 'left'
      }
    ]
  }),
  async mounted() {
    this.parents = await getParents(this.$communityId)
    console.log(this.parents)
  },
  methods: {
    colorGenerator(name) {
      let num = 0
      for (let i = 0; i < name.length; i++) {
        num += name.charCodeAt(i)
      }
      const color = num % 10 + 1
      return 'avatar-color-' + color + '-data-v-31082d85321'
    },
    toParent(item) {
      this.$router.push(`/admin/parents/${item.memberId}`)
    },
    address(props) {
      return props.item.address && props.item.address.geoLocation
        ? props.item.address.geoLocation.address
        : ''
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 20px

</style>
