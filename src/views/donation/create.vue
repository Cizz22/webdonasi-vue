<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-3 md:w-5/12 sm:w-full">
            
            <div class="bg-white rounded-md shadow-md p-5">
                <div class="text-xl">
                    MASUKKAN DONASI
                </div>
                <hr class="mt-2 mb-2 border-2">

                 <div class="mb-2">
                    <label class="mt-2 font-bold text-lg">Rp.</label>
                    <input type="number"
                        class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-15 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-2 text-right text-xl"
                        placeholder="0" v-model="donation.amount">
                </div>

                <div class="mb-2">
                    <label class="mt-2 font-bold text-lg">Do'a</label>
                    <textarea v-model="donation.pray" rows="3" 
                        class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5" >
                    </textarea>
                </div>
                <div class="mt-5">
                    <button @click="storeDonation" class="focus:outline-none focus:bg-yellow-600 px-5 py-3 bg-yellow-500 w-full rounded-md shadow-md text-lg">LANJUT PEMBAYARAN</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, computed } from "vue";

import { useStore } from "vuex";

import {useRouter, useRoute} from 'vue-router'

import {useToast} from 'vue-toastification'

export default {
    setup(){
        const store = useStore()

        const route = useRoute()

        const router = useRouter()

        const toast = useToast()

        let donation = reactive({
            amount:0,
            pray:'',
            campaignSlug: route.params.slug
        })

        async function storeDonation(){
            if(donation.amount < 10000){
                toast.error("Donasi Minimal Rp. 10.000")
                return false
            }
            try {
                let res = await store.dispatch('donation/storeDonation', donation)
                toast.success("Donasi Berhasil Dibuat")
                router.push({name: 'donation.index'})
            } catch (error) {
                console.log(error)
            }

        }
        return{
            storeDonation,
            donation
        }

    }
}
</script>