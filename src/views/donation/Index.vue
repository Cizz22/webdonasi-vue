<template>
        <div class="pb-20 pt-20">
            <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

                    <div class="bg-white rounded-md shadow-md p-5">
                        
                    <h2 class="text-center text-xl font-bold text-gray-700">Donation Page</h2>
                    
                    <div class="border-2 border-gray-200 mt-3 mb-2"></div>
                    
                    <div v-if="donations.length > 0">
                        <div class="mt-5 grid grid-cols-4 gap-4">
                            <div class="col-span-4" v-for="donation in donations" :key="donation.id">
                                <div class="bg-gray-200 rounded-md shadow-md p-2">
                                    <figure class="rounded-xl md:flex md:p-0"> 
                                        <img :src="donation.campaign.image" class="w-full h-34 md:w-48 rounded mx-auto object-cover" width="384" height="512">
                                        <div class="text-center p-5 w-full pt-6 md:text-left spaye-y-4">
                                            <router-link :to="{name: 'campaign.show'}" >
                                                <p class="text-sm font-semibold">{{donation.campaign.title}}</p>
                                            </router-link>
                                            <figcaption class="font-medium">
                                                <p class="text-xs text-gray-500 mt-5">
                                                    <span class="font-bold text-gray-500 mr-3">{{donation.created_at}}</span>
                                                    <span class="font-bold text-blue-900">{{formatPrice(donation.amount)}}</span>
                                                </p>
                                            </figcaption>
                                            <div v-if="donation.status == 'pending'">
                                                <button class="px-2 py-1 rounded-md w-full bg-yellow-600 shadow-md focus:outline-none">Bayar Sekarang</button>
                                            </div>
                                        </div>
                                        <div class="ml-auto text-sm text-gray-500 underline">
                                        <div v-if="donation.status == 'success'">
                                            <button class="bg-green-500 border-2 border-green-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Berhasil</button>
                                        </div>
                                        <div v-else-if="donation.status == 'pending'">
                                            <button class="bg-yellow-500 border-2 border-yellow-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Pending</button>
                                        </div>
                                        <div v-else-if="donation.status == 'expired'">
                                            <button class="bg-red-500 border-2 border-red-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Dibatalkan</button>
                                        </div>
                                        <div v-else-if="donation.status == 'failed'">
                                            <button class="bg-red-500 border-2 border-red-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Dibatalkan</button>
                                        </div>
                                    </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>

                    <div class="mb-3 bg-red-500 text-white p-4 rounded-md">
                        Anda Belum Memiliki Transaksi Donasi Saat ini!
                    </div>

                </div>
                    </div>
            </div>
        </div>
</template>

<script>
 //hook vue
    import { computed, onMounted } from 'vue'

    //hook vuex
    import { useStore } from 'vuex'

export default {
    setup(){

        const store = useStore()

          //onMounted akan menjalankan action "getDonation" di module "donation"
        onMounted(() => {
            store.dispatch('donation/getDonation')
        })

        const donations = computed(() => {
            return store.state.donation.donations
        })

        const nextExist = computed(() => {
            return store.state.donation.nextExist
        })

        const nextPage = computed(() => {
            return store.state.donation.nextPage
        })

        function loadMore(){
            store.dispatch('donation/getLoadMore', nextPage.value)
        }

        return{
            donations,
            nextExist,
            nextPage,
            loadMore
        }

    }
}
</script>