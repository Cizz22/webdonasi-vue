<template>
    <header>
        <h1>{{title}}</h1>
        <Button @show-addTask ="$emit('show-addTask')" :color="showAddTask ? 'red' : 'green' " :Text="showAddTask ? 'Close' : 'Add Task'"
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
    emits: ['show-addTask']
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
