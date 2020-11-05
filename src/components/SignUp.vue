<template>
  <div>
    <b-form v-if="show">
        <h2 style="margin-bottom:20px">SIGN UP FORM</h2>
      <b-form-group
        label="Email address:"
        label-for="input-1"
        required
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="User's Name:" label-for="input-2">
        <b-form-input
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Preferences:" label-for="input-3">
        <b-form-select
          v-model="form.preference"
          :options="preferences"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Enter age:" label-for="input-2">
        <b-form-input
          v-model="form.age"
          required
          type="number"
          placeholder="Enter age"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Image URL:" label-for="input-2">
        <b-form-input
          v-model="form.photo_url"
          required
          placeholder="Enter image url"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox v-model="form.opt_in">I accept .........</b-form-checkbox>
      </b-form-group>

      <b-button @click="onSubmit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          age: 25,
          photo_url: null,
          preference: null,
          opt_in: false
        },
        preferences: [{ text: 'Select One', value: null }, 'Football', 'Movies', 'Travels'],
        show: true
      }
    },

    methods: {
      onSubmit() {
        const user = this.form
        console.log(user)
        const postUrl = "http://localhost:3000/post"
        axios.post(postUrl, {
          token: this.$store.getters.token, 
          user
        }, 
        {contentType: "application/json"})
        .then(console.log)
      },
      onReset() {
        this.form.email = ''
        this.form.name = ''
        this.form.preference = null
        this.form.opt_in = []
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
