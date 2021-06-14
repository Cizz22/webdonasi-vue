<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto p-3 grid grid-cols-1 sm:w-full md:w-5/12">

            <form method="POST" @submit.prevent="updateProfile" enctype="multipart/form-data">

                <div class="p-5 bg-white rounded-md shadow-md">
                    <div class="flex flex-col justify-center items-center relative">
                        <div>
                            <img :src="profile.avatar" class="rounded-full w-28 h-28 object-cover">
                        </div>
                        <div class="mt-4">
                            <input @change="onFileChange" type="file" class="rounded bg-gray-300 p-2 w-full shadow-sm">
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div class="bg-white rounded-md shadow-md p-3">
                        <div class="grid grid-cols-1 gap-4">
                            <div class="mb-2">
                            <label class="mt-2">Nama Lengkap</label>
                            <input type="text"
                                class="mt-2 appearance-none w-full bg-gray-200 rounded h-7 shadow-sm placeholder-gray-700 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600 p-5"
                                placeholder="Nama Lengkap" v-model="profile.name">
                        </div>

                        <div class="mb-2">
                            <label class="mt-2">Alamat Email</label>
                            <input type="email"
                                class="mt-2 appearance-none w-full bg-gray-200 opacity-70 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-gray-300 focus-within:text-gray-600 p-5"
                            v-model="profile.email" placeholder="Alamat Email" disabled>
                        </div>

                        <div>
                            <button type="submit" class="mt-3 bg-gray-700 text-white p-2 w-full rounded-md shadow-md focus:outline-none">
                                UPDATE PROFILE
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
import {onMounted, computed, ref} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"

export default {
    
    setup(){
        const store = useStore()
        const router = useRouter()
        const toast = useToast()
        const validation = ref([])
        const imageAvatar = ref(null)

        onMounted(() => {
            store.dispatch('profile/getProfile')
        })

        const profile = computed(() => {
            return store.state.profile.profile
        })
    
        function onFileChange(e){
            imageAvatar.value = e.target.files[0]

               if (!imageAvatar.value.type.match('image.*')) {

                    //if fileType not allowed, then clear value and set null
                    e.target.value = ''
                    imageAvatar.value = null

                    //show toastr error
                    toast.error("Extensi File Tidak Diizinkan!")

                }
        }

        async function updateProfile(){
            let formdata = new FormData()

            formdata.append('avatar', imageAvatar.value)
            formdata.append('name', profile.value.name)

            try {
                store.dispatch('profile/updateProfile', formdata)

                router.push({
                    name: 'dashboard'
                })
                toast.success("Profile Berhasil Diupdate!")

                //set imageAvatar to null
                imageAvatar.value = null
            } catch (error) {
                //assign validaation message
                    validation.value = error

                    //show validation name with toast
                    if(validation.value.name) {
                        toast.error(`${validation.value.name[0]}`)
                    }
            }
        }

        return{
            profile,
            onFileChange,
            toast,
            updateProfile,
            validation
        }
    }


}
</script>