<template>
    <div>
        <div v-if="sliders.length > 0">
            <vueper-slides slide-image-inside autoplay>
                <template v-slot:arrow-left>
                    <i class="icon icon-arrow-left"></i>
                </template>
                    <vueper-slide v-for="(slider, i) in sliders" :key="i" :image="slider.image"/>
                <template>
                    <i class="icon icon-arrow-right"></i>
                </template>
            </vueper-slides>
        </div>
        <div v-else>
            <ContentLoader/>        
        </div>
    </div>
</template>

<script>
import {onMounted, computed} from 'vue'

import { useStore } from 'vuex'

import { ContentLoader } from 'vue-content-loader'

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    components:{
        VueperSlides,
        VueperSlide,
        ContentLoader
    },

    setup(){

        const store = useStore()

        onMounted(() => {
            store.dispatch('slider/getSlider')
        })

        const sliders = computed(() => {
            return store.state.slider.sliders
        })

        return{
            sliders
        }

    }
}
</script>

<style scoped>
   .vueperslide__image {
        transform: scale(1.5) rotate(-10deg);
    }

    .vueperslide__title {
        font-size: 7em;
        opacity: 0.7;
    }
</style>