<template>
  <div>
    <div class="h-screen flex flex-wrap content-center">
    <div class="mt-4 mx-auto w-5/6 md:w-3/6 lg:w-2/6">
      <div class="p-6 rounded-lg bg-gray-50 text-center">
        <h1 class="text-yellow-500">Log in</h1>
        <p class="text-left mt-2 mb-2">Log in with your email and password.</p>
        <p v-if="errors.length" class="text-left mb-4 mt-1 text-sm bg-red-50 text-red-500 rounded px-2 py-1 font-bold">
          <span v-for="error in errors" :key="error.id">{{ error  }}</span>
        </p>
        <form class="mb-4" @submit.prevent="login">
          <label class="float-left mb-2 font-semibold">Email :</label>
          <input type="text" placeholder="Email" class="transition-all duration-4 00 ease-in-out px-4 py-2 bg-gray-200 w-full border-0 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-yellow-50" v-model="email">
          <label class="float-left mb-2 mt-4 font-semibold">Password :</label>
          <input type="password" placeholder="Password" class="transition-all duration-4 00 ease-in-out px-4 py-2 bg-gray-200 w-full border-0 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-yellow-50" v-model="password">
          <button type="submit" class="px-2.5 py-2 bg-yellow-500 text-white rounded border-0 mt-6  w-full outline-none hover:bg-yellow-600">Login</button>
        </form>
        <div class="text-left">
          <p>
            Demo account:<br>
            nuxt-fire@demo.com<br>
            lmao123
          </p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template> 

<script>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $fire } = useContext ()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errors = ref([])
    
    const login = async () => {
      errors.value.splice(0, errors.value.length)
      
      // validate form
      if(email.value == '' || password.value == '') { 
        errors.value.push('Email or password is required!')
      } else {
        try {
          // create user
          await $fire.auth.signInWithEmailAndPassword(email.value, password.value)
          router.replace({ path:'/' })
        } catch (e) {
          errors.value.push(e.message)
        }
      }
    }
    
  return { email, password, login, errors }
  }
})
</script>