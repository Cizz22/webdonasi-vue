<template>
    <div class="pb-20 pt-20">
           <div class="container p-5 mx-auto grid grid-cols-1 sm:w-full md:w-5/12">
           
                <div v-if="campaignCategory.length > 0">
                    <h3> <i class="fa fa-list-ul"></i> KATEGORI <strong>{{ category.name.toUpperCase() }}</strong></h3>

                    <div class="grid grid-cols-4 gap-4 mt-5" v-for="campaign in campaignCategory" :key="campaign.id">
                        <div class="col-span-4">
                            <div class="bg-white rounded-md shadow-md p-3">
                                <div class="md:flex rounded-xl md:p-0">
                               <img :src="campaign.image" srcset="" class="w-full h-34 rounded object-cover md:w-56"  width="384" height="512">
                               <div class="w-full pt-6 p-5 md:p-3 text-center md:text-left space-y-4">
                                   <a href="">
                                       <p class="text-sm font-semibold">
                                           {{campaign.title}}
                                       </p>
                                   </a>
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
                    <div class="mb-3 bg-red-500 px-4 py-2 rounded-md text-white"><strong>BELUM TERSEDIA</strong></div>
                </div>

           </div>
    </div>
</template>

<script>
import {onMounted, computed} from 'vue'

import {useStore} from 'vuex'

import {useRoute} from 'vue-router'

export default {
    setup(){
        const store = useStore()
        const router = useRoute()

        onMounted(() => {
            store.dispatch('categoryHome/showCategory', router.params.slug)
        })

        const category = computed(() => {
            return store.state.categoryHome.category
        })

        const campaignCategory = computed(() => {
            return store.state.categoryHome.campaignCategory
        })

        return{
            campaignCategory,
            category
        }

        
    }

}
</script>