<template>
  <v-layout row justify-center>
  <v-dialog v-model="editModal" max-width="700"  transition="dialog-bottom-transition" persistent >
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>

      <div class="wrapper">
        <v-form>

          <v-text-field label="Name"
            v-model="name"
            :error-messages="nameErrors"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            ></v-text-field>

          <v-text-field label="E-mail"
            v-model="email"
            :error-messages="emailErrors"
            type="email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>

          <v-text-field label="Phone"
            v-model="phone"
            :error-messages="phoneErrors"
            type="tel"
            mask='phone'
            required
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Providers"
                  v-model="newProvider"
                  :error-messages="newProviderErrors"
                  @input="$v.newProvider.$touch()"
                  @blur="$v.newProvider.$touch()"
                  ></v-text-field>
              </v-flex>
              <v-flex xs12 offset-sm1 sm5>
                <v-btn block
                :disabled="this.$v.newProvider.$invalid || !this.$v.newProvider.$dirty"
                @click.prevent="addNewProvider">add provider</v-btn>
              </v-flex>
            </v-layout>


          <div class="providers" v-for="provider in sortedProviders" :key="provider.name">
            <v-layout row justify-center>
              <v-flex xs5 >
                <v-checkbox
                  hide-details
                  v-model="selectedProviders"
                  :label="normalizedLabel(provider.name)" :value="provider.id"/>
              </v-flex>
              <v-flex xs3 >
                <v-btn flat icon color="primary">
                  <v-icon>launch</v-icon>
                </v-btn>
                <v-btn flat icon color="red" @click.native="delProvider(provider.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>

          <v-layout row >
            <v-btn class="my-3" color="error" @click.native="delClient(clientInfo._id)">
              delete
            </v-btn>
            <v-spacer/>
            <v-btn class="my-3" @click.native="$emit('handleModal', false)">
              cancel
            </v-btn>
            <v-btn class="my-3" @click.prevent="submit"
              :disabled="this.$v.$invalid"
              color="info">
              save client
            </v-btn>
          </v-layout>

        </v-form>

      </div>
    </v-card>
  </v-dialog>

</v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, alphaNum } from 'vuelidate/lib/validators'
import sortBy from 'lodash/sortBy'
import capitalize from 'lodash/capitalize'

import { addProvider, deleteProvider, editClient, deleteClient } from '@/api'

const isPhone = value => /^\d{10}$/.test(value)

export default {
  props: {
    editModal: {
      type: Boolean,
      default: false,
      required: true
    },
    providers: {
      type: Array,
      default: [],
      required: true
    },
    clientInfo: {
      type: Object
    }
  },

  mixins: [validationMixin],

  validations: {
    name: { required, alphaNum, minLength: minLength(4) },
    email: { required, email },
    phone: { required, isPhone },
    newProvider: { alphaNum, minLength: minLength(4) }
  },

  data() {
    return {
      name: this.clientInfo.name,
      email: this.clientInfo.email,
      phone: this.clientInfo.phone,
      newProvider: '',
      selectedProviders: this.clientInfo.providers.map(item => item.id)
    }
  },
  computed: {
    sortedProviders() {
      return sortBy(this.providers, ['name'])
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push('Name must be at least 4 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone is required')
      !this.$v.phone.isPhone && errors.push('Phone must be 10 digits long')
      return errors
    },
    newProviderErrors() {
      const errors = []
      if (!this.$v.newProvider.$dirty) return errors
      !this.$v.newProvider.minLength && errors.push('Provider must be at least 4 characters long')
      return errors
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()
      const providers = this.selectedProviders.map(id => ({ id }))
      const client = {
        id: this.clientInfo._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers
      }
      const editedClient = await editClient(client)

      this.$emit('editClient', editedClient.data)
      this.$emit('handleModal', false)
    },
    async addNewProvider() {
      const name = this.newProvider.toLowerCase()
      const newProvider = await addProvider(name)
      this.$emit('addNewProvider', newProvider)
    },
    async delProvider(id) {
      const test = await deleteProvider(id)
      if (test.status === 200) {
        this.$emit('deleteProvider', id)
      }
    },
    async delClient(id) {
      const test = await deleteClient(id)
      this.$emit('deleteClient', test.data._id)
      this.$emit('handleModal', false)
    },
    normalizedLabel(string) {
      return capitalize(string)
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 0 5rem

.providers
  margin: 0 auto
</style>
