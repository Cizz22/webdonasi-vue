<template>
     <div v-show="showAddTask">
         <AddTask @add-task ="addTask"/>
     </div>
   
     <Task @delete-task2="deleteTask" :Task="tasks"></Task>
</template>

<script>
import Task from '../components/Task'
import AddTask from '../components/AddTask'

export default {
    name: 'Home',
    components: {
        Task,
        AddTask
    },
    data() {
    return{
      tasks: [],
    }
  },
  async created(){
    this.tasks = await this.fetchTasks()
  },
   methods: {
    async deleteTask(id){
      const res = await fetch(`api/tasks/${id}`, {
        method: 'DELETE',
      })

      res.status === 200 ? this.tasks = this.tasks.filter((task) => task.id !== id) : alert('error')
    },
    async addTask(task){

      const res = await fetch('api/tasks',{
      method: 'POST',
      headers: {
      'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    showTask(){
      this.showAddTask = !this.showAddTask
    },
    async fetchTasks(){
      const res = await fetch('api/tasks')

      const data = await res.json()

      return data
    },
    async fetchTask(id){
      const res = await fetch(`api/tasks/${id}`)

      const data = await res.json()

      return data
    }
  }
}
</script>