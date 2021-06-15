<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto p-3 grid grid-cols-1 sm:w-full md:w-5/12">
        
            <div class="grid grid-cols-1 bg-white rounded0md shadow-md p-1 text-sm">
                <Slider/>
            </div>

            <CategoryHome/>
        
        </div>
    </div>
</template>

<script>
import CategoryHome from '@/components/CategoryHome.vue'
import Slider from '@/components/Slider.vue'

export default {
    components:{
        CategoryHome,
        Slider
    }
}
</script>