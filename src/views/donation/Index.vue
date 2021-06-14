<template>
        <div class="pb-20 pt-20">
            <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

                    <div class="bg-white rounded-md shadow-md p-5">
                        
                    <h2 class="text-center text-xl font-bold text-gray-700">Donation Page</h2>
                    
                    <div class="border-2 border-gray-200 mt-3 mb-2"></div>
                    
                    <div v-if="donations.length > 0">
                        <div class="mt-5 grid grid-cols-4 gap-4">
                            <div class="col-span-4">
                                <figure></figure>
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