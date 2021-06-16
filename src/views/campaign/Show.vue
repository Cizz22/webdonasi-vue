<template>
    <div class="pb-20 pt-20"> 
        <div class="container grid grid-cols-1 mx-auto p-5 md:w-5/12 sm:w-full">
            
            <div class="bg-white rounded-md p-3 shadow-md">
                <img :src="campaign.image" alt="" srcset="" class="w-full rounded-md">

                <div class="mt-5">
                    <p class="font-semibold text-lg">{{campaign.title}}</p>
                </div>

                <div v-if="campaign.sum_donation.length > 0">
                                           <div v-for="donation in campaign.sum_donation" :key="donation">

                                               <div class="relative pt-1">
                                                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                                        <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                                    </div>
                                                </div>

                                                  <p class="text-xs text-gray-500">
                                                    <span class="font-bold text-blue-400">Rp. {{ formatPrice(donation.total) }} </span> terkumpul dari
                                                    <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                                </p>
                                           </div>
                                       </div>
                                       <div v-else>
                                           <div class="relative pt-1">
                                                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                                    <div :style="{width: percentage(0, campaign.target_donation) + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                                </div>
                                            </div>

                                            <p class="text-xs text-gray-500">
                                                <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                                                <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                            </p>
                                       </div>

            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router'


export default {
    
    setup(){
        const store =useStore()
        const router = useRoute()

        
       onMounted(() => {
            store.dispatch('campaign/showCampaign', router.params.slug)
        })

        const campaign = computed(() => {
            return store.state.campaign.campaign
        })

        return{
            campaign
        }
    }

}
</script>