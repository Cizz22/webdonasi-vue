<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-5 sm:w-full md:w-5/12">
        
            <form @submit.prevent="register">
                <div class="bg-white rounded-md shadow-md p-5">
                    <div class="text-xl text-center">
                        Register Akun
                    </div>
                    <hr class="mb-2 mt-3 border-2 border-gray-200">

                    <div class="mb-2">
                        <label for="" class="mt-2">
                            Nama Lengkap
                        </label>
                        <input v-model="user.name" type="text" class="appearance-none w-full rounded-md p-5 h-4 mt-2 bg-gray-200 border shadow-sm focus:bg-white focus:outline-none text-gray-500" >
                    </div>
                      <div class="mb-2">
                        <label for="" class="mt-2">
                            Alamat Email
                        </label>
                        <input v-model="user.email" type="text" class="appearance-none w-full rounded-md p-5 h-4 mt-2 bg-gray-200 border shadow-sm focus:bg-white focus:outline-none text-gray-500" >
                    </div>
                      <div class="mb-2">
                        <label for="" class="mt-2">
                            Password
                        </label>
                        <input v-model="user.password" type="text" class="appearance-none w-full rounded-md p-5 h-4 mt-2 bg-gray-200 border shadow-sm focus:bg-white focus:outline-none text-gray-500" >
                    </div>
                      <div class="mb-2">
                        <label for="" class="mt-2">
                            Konfirmasi Password
                        </label>
                        <input v-model="user.password_confirmation" type="text" class="appearance-none w-full rounded-md p-5 h-4 mt-2 bg-gray-200 border shadow-sm focus:bg-white focus:outline-none text-gray-500" >
                    </div>

                    <div class="mt-4">
                        <button class="w-full bg-gray-700 px-4 py-2 text-white rounded-md shadows-md inline-block focus:outline-none hover:bg-gray-900">Daftar</button>
                    </div>
                 <div class="text-center mt-5">
                Sudah punya akun ? <router-link :to="{name: 'login'}" class="underline text-blue-600">Masuk Disini
                    !</router-link>
            </div>
                </div>
            
            </form>
        </div>
    </div>
</template>

<script>
//hook vue
    import { ref, reactive } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"
export default {

setup(){

    const user= reactive({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })

         //validation state
    const validation = ref([])

        //store vuex
    const store = useStore()

        //route
    const router = useRouter()

        //same interface as this.$toast
    const toast = useToast()

    async function register(){
        
        try {   
        const dispatchRegister = await store.dispatch('auth/register', {
            name : user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        })
        router.push({name: 'dashboard'})
        toast.success("Register berhasil")
        } catch (error) {
            console.log(error)
             //show validaation message
                    validation.value = error

                    //show validation name with toast
                    if(validation.value.name) {
                        toast.error(`${validation.value.name[0]}`)
                    }

                    //show validation email with toast
                    if(validation.value.email) {
                        toast.error(`${validation.value.email[0]}`)
                    }

                    //show validation password with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }
        }
    }

return {
                user,           // <-- state user
                validation,     // <-- state validation
                register,       // <-- method register
                toast           // <-- hook toast
    }   
}
}
</script>