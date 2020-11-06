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
        <b-form-input @change="checkImageForTags"
          v-model="form.Imageurl"
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
          Imageurl: null,
          preference: null,
          opt_in: false,
          userID: Date.now().toString()
        },
        preferences: [{ text: 'Select One', value: null }, 'sport', 'business', 'motorsport'],
        show: true
      }
    },

    methods: {
      onSubmit() {
        const postUrl = "http://localhost:3000/post"
        axios.post(postUrl, {
          token: this.$store.getters.token, 
          user: this.form
        }, 
        {contentType: "application/json"})
        .then(console.log)
      },
      checkImageForTags() {
        const imageCheckUrl = "http://localhost:3000/checkImage"
        if(this.isURL(this.form.Imageurl)){
          axios.post(imageCheckUrl, {
            url: this.form.Imageurl
          }, {
            contentType: "application/json"
          })
          .then(words => {
            const tags = words.data.result.tags
            const filteredTags = tags.map(tag => tag.tag.en)
            console.table(filteredTags) 
            const result = filteredTags.find(tag => (tag == 'sport' || tag == 'business' || tag == 'motorsport'))
            console.log(result)
            if(result){
              this.form.preference = result
            }
          })
        }
      },
      isURL(str) {
        var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        return str.match(regex) != null;
      }
    }
  }
</script>
