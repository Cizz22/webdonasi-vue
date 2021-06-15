<template>
      <div class="pb-20 pt-20">
        <div class="container mx-auto p-3 grid grid-cols-1 sm:w-full md:w-5/12">

            <form method="POST" @submit.prevent="updatePassword">
                <div class="mt-5">
                    <div class="bg-white rounded-md shadow-md p-3">
                        <div class="grid grid-cols-1 gap-4">
                            <div class="mb-2">
                            <label class="mt-2">Password Baru</label>
                            <input type="password"
                                class="mt-2 appearance-none w-full bg-gray-200 rounded h-7 shadow-sm placeholder-gray-700 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600 p-5"
                                placeholder="Password Baru" v-model="user.password">
                        </div>

                        <div class="mb-2">
                            <label class="mt-2">Konfirmasi password</label>
                            <input type="password"
                                class="mt-2 appearance-none w-full bg-gray-200 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600 p-5"
                             placeholder="Konfirmasi password" v-model="user.password_confirmation">
                        </div>

                        <div>
                            <button type="submit" class="mt-3 bg-gray-700 text-white p-2 w-full rounded-md shadow-md focus:outline-none">
                                UPDATE PASSWORD
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
export default {
    
    setup(){
        const store = useStore();

        const router = useRouter();

        const toast = useToast();

        const user = reactive({
            password : '',
            password_confirmation:''
        })

        const validation = ref([])

        async function updatePassword(){
            try {
                store.dispatch('profile/updatePassword', user)

                router.push({name: 'dashboard'})
                toast.success('Update password berhasil!!')
            } catch (error) {
                validation.value = error

                 //show validation name with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }

                    if(validation.value.password_confirmation) {
                        toast.error(`${validation.value.password_confirmation[0]}`)
                    }
            }
        }

        return{
            user,
            updatePassword,
            validation
        }

    }
}
</script>