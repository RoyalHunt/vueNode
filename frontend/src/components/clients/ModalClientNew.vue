<template>
  <v-layout row justify-center>
  <v-dialog v-model="newModal" max-width="700"  transition="dialog-bottom-transition" persistent >
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>

      <div class="wrapper">
        <v-form v-model="valid">

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
              <v-text-field label="Providers"
                v-model="newProvider"></v-text-field>
            </v-flex>
            <v-flex xs12 offset-sm1 sm5>
              <v-btn block  @click.prevent="addNewProvider">add provider</v-btn>
            </v-flex>
          </v-layout>


          <div class="providers" v-for="provider in sortedProviders" :key="provider.name">
            <v-layout row justify-center>
              <v-flex xs5 >
                <v-checkbox
                  hide-details
                  v-model="selected"
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
            <v-btn class="my-3" color="error" @click.native="$emit('handleModal', false)">
              delete
            </v-btn>
            <v-spacer/>
            <v-btn class="my-3" @click.native="$emit('handleModal', false)">
              cancel
            </v-btn>
            <v-btn class="my-3" @click.prevent="submit"
              :disabled="!this.$v.$invalid"
              color="info">
              add client
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
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'
import sortBy from 'lodash/sortBy'
import capitalize from 'lodash/capitalize'

import { getProviders, addProvider, deleteProvider } from '@/api'

const isPhone = value => /^\d{10}$/.test(value)

export default {
  props: {
    newModal: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  mixins: [validationMixin],

  validations: {
    name: { required, alpha, minLength: minLength(4) },
    email: { required, email },
    phone: { required, isPhone }
  },

  data: () => ({
    valid: false,
    name: '',
    email: '',
    phone: '',
    providers: [],
    newProvider: '',
    selected: []
  }),
  async mounted() {
    this.providers = await getProviders()
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
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      this.$emit('handleModal', false)
    },
    async addNewProvider() {
      const name = this.newProvider.toLowerCase()
      const newProvider = await addProvider(name)
      this.providers.push(newProvider)
    },
    async delProvider(id) {
      const test = await deleteProvider(id)
      if (test.status === 200) {
        this.providers = this.providers.filter(provider => provider.id !== id)
      }
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
