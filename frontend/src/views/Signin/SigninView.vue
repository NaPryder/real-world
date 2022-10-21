<template>

  <form @submit.prevent="handleLogin" class="login-form">
    <span>Sign in</span>
    {{loginUrl}}
    <div class="input-area">
      <strong for="email">Email</strong>
      <input type="text" id="email" name="email" placeholder="Email" v-model="email">
    </div>
    <div class="input-area">
      <strong for="password">Password</strong>
      <input type="password" id="password" name="password" placeholder="Password" v-model="password">
    </div>
    <button type="submit">Sign in</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import {useStore} from "vuex";

  const store = useStore()
  const loginUrl = store.state.loginUrl
  
  const email = ref('')
  const password = ref('')  

  const handleLogin = async () => {
    console.log('login :>> ');
    console.log(email.value);
    console.log(password.value);
    const data = {
      user: {
        email: email.value,
        password: password.value,
      }
    }
    console.log('data :>> ', data);

    const requestOption = store.mutations.getRequestOption('POST', data)
    console.log('requestOption :>> ', requestOption);
    try {
      const res = await fetch(
        loginUrl,
        requestOption,
        // {
        //   method: 'POST',
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // }
      )
      console.log('res :>> ', res);
    } catch (error) {
      console.log('error :>> ', error);
    }
    // login 
    // axios.post(
    //   'http://localhost:3000/api/users/login',
    //   data
    // )
    
  }
</script>

<style lang="scss" scoped>

.login-form {
  // padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  span {
    font-weight: 600;
    font-size: 2rem;
  }
  .input-area {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;;
    width: 60%;
    justify-content: center;

    input {
      margin-top: .5rem;
      padding: 1rem;

      height: 2rem;
      border-radius: 5px;
      border: 1px solid var(--dark);
    }
    
  }
}

button {
  margin: 1rem 0;
  width: 60%;
  height: 2rem;
  border: 1px solid var(--dark);
  border-radius: 5px;
  background-color: var(--dark);
  color: var(--light);
  transition: var(--transition-02);
}
button:hover {
  font-size: 1.1rem;
  background-color: var(--dark-alt);
}
</style>