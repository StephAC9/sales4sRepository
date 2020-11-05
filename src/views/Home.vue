<template>
  <div>
    <SignUp class="sign-up"></SignUp>
  </div>
</template>

<script>
import SignUp from '../components/SignUp'
export default {
  components:{
    SignUp
  }
}
</script>
<style scoped>
  .sign-up{
    max-width: 500px;
    border-radius: 10px;
    background: rgb(233, 229, 229);
    margin: 0 auto;
    margin-top: 50px;
    padding: 15px;
  }
</style>
