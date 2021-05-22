<template>
    <button @click="onClick()" :style="{ background: color}" class="btn">{{Text}}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        Text :String,
        color: String,
    },
    methods: {
        onClick(){
            this.$emit('show-addTask')
        }    
    }
}
</script>