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
         <v-flex xs12 sm6>
            <v-text-field label="Providers"
              v-model="providers"></v-text-field>
        </v-flex>
          <v-btn @click.native="$emit('handleModal', false)">
            Cancel
          </v-btn>
          <v-btn @click.prevent="submit"
            :disabled="!valid"
            color="info">
            Add Client
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-dialog>

</v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'

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
    providers: ''
  }),
  computed: {
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
      !this.$v.phone.isPhone && errors.push('Phone must be 10 digits long')
      !this.$v.phone.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      this.$emit('handleModal', false)
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 20px

</style>
