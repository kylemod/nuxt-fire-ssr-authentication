<template>
  <div>
    Home secret page <br>
    <p>You cant access this page until you logged in</p>
    <button @click="logout" class="px-3 py-2 bg-yellow-500 text-white border-0 rounded hover:bg-yellow-600">Logout</button>
    <div class="mt-6">
      <h2>Firestore</h2>
      <input type="text" placeholder="Your text" class="transition-all duration-4 00 ease-in-out px-4 py-2 bg-gray-200 w-full md:w-1/2 lg:w-2/6 border-0 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-yellow-50 mb-6" v-model="messageText">
      <button @click="create" class="px-3 py-2 bg-white text-yellow-600 border border-solid border-yellow-500 rounded hover:bg-yellow-500 hover:text-white">Create to Firestore 🔥</button>
      <button @click="read" class="px-3 py-2 bg-white text-yellow-600 border border-solid border-yellow-500 rounded hover:bg-yellow-500 hover:text-white">Read from Firestore 🔥</button>
      <div>
        {{ doc }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $fire } = useContext()
    const router = useRouter()
    const messageRef = $fire.firestore
        .collection('message')
        .doc('message')
    
    const doc = ref()
    const messageText = ref('')
    
    const logout = async () => { 
      try {
        await $fire.auth.signOut()
        router.replace({ path:'/login' })
      } catch (e) {
        alert(e)
      }
    }
    
    const create = async () => {
      try {
        await messageRef.set({
          message: messageText.value
        })
      } catch (e) {
        console.log(e)
      }
    }
    
    const read = async () => {
      try {
        messageRef.get().then(res => {
          doc.value = res.data()
        })
        
      } catch (e) {
        console.log(e)
      }
    }
    
  return { logout, create, read, doc, messageRef, messageText }
  }
})
</script>