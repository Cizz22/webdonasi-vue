<template>
    <div class="pb-20 pt-20">
        
        <div class="containe mx-auto p-5 grid grid-cols-1 sm:w-full md:w-5/12"> 
        
            <div v-if="campaigns.length > 0">
                <div class="mt-5 grid grid-cols-4 gap-4" v-for="campaign in campaigns" :key="campaign.id">
                    <div class="col-span-4">
                        <div class="p-2 rounded-md bg-white shadow-md">
                            <div class="md:flex rounded-xl md:p-0">
                               <img :src="campaign.image" srcset="" class="w-full h-34 rounded object-cover md:w-56"  width="384" height="512">
                               <div class="w-full pt-6 p-5 md:p-3 text-center md:text-left space-y-4">
                                   <router-link :to="{name: 'campaign.show', params:{slug: campaign.slug}}" >
                                       <p class="text-sm font-semibold hover:text-gray-700 text-gray-500">
                                           {{campaign.title}}
                                       </p>
                                   </router-link>
                                   <div class="font-medium">
                                       <p class="mt-3 text-gray-500 text-xs">
                                           {{campaign.user.name}}
                                       </p>

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
                                       <div class="mt-3 text-xs">
                                            <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi
                                        </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
             <div v-else>
                 <div v-for="index in 2" :key="index" class="grid grid-cols-1 bg-white rounded shadow-md p-3 text-sm mt-4 mb-4">
                    <FacebookLoader class="h-24"/>
                </div>    
            </div> 
            <div class="text-center mt-4 mb-4" v-show="nextExist">
                <a @click="loadMore" class="bg-gray-700 text-white cursor-pointer py-2 px-4 rounded-md shadow-md focus:outline-none">
                    LIHAT SELEBIHNYA <i class="fa fa-long-arrow-alt-right"></i>
                </a>
            </div>  
        </div>
    </div>    
</template>
<script>
import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {FacebookLoader} from 'vue-content-loader'

export default {
    components:{
        FacebookLoader
    },
    setup(){
        const store = useStore()

        onMounted(() => {
            store.dispatch('campaign/getCampaign')
        })

        const campaigns = computed(() => {
            return store.state.campaign.campaigns
        })

        const nextExist = computed(() => {
            return store.state.campaign.nextExist
        })
        const nextPage = computed(() => {
            return store.state.campaign.nextPage
        })

        function loadMore(){
            store.dispatch('campaign/loadMore', nextPage.value)
        }

        return{
            campaigns,
            nextExist,
            nextPage,
            loadMore
        }
    }
}
</script>