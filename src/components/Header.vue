<template>
    <header>
        <h1>{{title}}</h1>
        <Button v-show="homePage" @show-addTask ="$emit('show-addTask')" :color="showAddTask ? 'red' : 'green' " :Text="showAddTask ? 'Close' : 'Add Task'"
        />
    </header>
</template>

<script>
import Button from './Button'
export default {
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean
    },
    components: {
        Button
    },
    emits: ['show-addTask'],
    computed: {
        homePage(){
            if(this.$route.path == '/'){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-bottom: 20px;
    }
</style>
