<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios' 
  export default {
    data() {
      return {
        name: null,
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
              this.$store.commit('SET_TOKEN', response.data.token.access_token)
            else
              console.log("something went wrong...")
          })
      }
    },
  }
</script>


<style lang="scss">
</style>
