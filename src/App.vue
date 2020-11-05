<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <input v-model="name" type="text">
      <button @click="postToDE">Send data to DE</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios' 
  export default {
    data() {
      return {
        name: null,
        token: null
      }
    },
    created () {
      this.initAuth();
    },
    methods: {
      initAuth() {
        const authUrl = "http://localhost:3000/auth"
        axios.get(authUrl)
        .then((response) => {
          if(response.data.token)
            this.token = response.data.token.access_token
          else
            console.log("something went wrong...")
        })
      },
      postToDE() {
        const postUrl = "http://localhost:3000/post"
        axios.post(postUrl, {token: this.token, form: {name: this.name}}, {contentType: "application/json"})
          .then(console.log)
      }
    },
  }
</script>


<style lang="scss">
</style>
