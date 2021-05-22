<template>
    <div :key="task.id" v-for="task in Task">
        <EachTask @delete-task1="$emit('delete-task2',task.id)" :task="task" />
    </div>
</template>

<script>
import EachTask from './EachTask'
export default {
    name: 'Task',
    props: {
        Task : Array
    },
    components:{
        EachTask
    },
    emits: ['delete-task2'],
}
</script>