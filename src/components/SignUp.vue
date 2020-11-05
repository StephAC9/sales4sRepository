<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <h2 style="margin-bottom:20px">SIGN UP FORM</h2>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="User's Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Preferences:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.preference"
          :options="preferences"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-file
        v-model="picture"
        :state="Boolean(picture)"
        placeholder="Choose a picture for your profile..."
        drop-placeholder="Drop picture here..."
        ></b-form-file>
    <div class="mt-3">Selected file: {{ picture ? picture.name : '' }}</div>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          picture: 'user pic',
          preference: null,
          checked: []
        },
        preferences: [{ text: 'Select One', value: null }, 'Football', 'Movies', 'Travels'],
        show: true
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        const user = {
            name: this.name,
            email: this.email,
            picture: this.picture,
            preference: this.preference
        }
        console.log('USER OBJ: ',user)
        this.$store.dispatch('sendUser',
        {
            name: this.name,
            email: this.email,
            picture: this.picture,
            preference: this.preference
        }
        )
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.form.preference = null
        this.form.checked = []
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
