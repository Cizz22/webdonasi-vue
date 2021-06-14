<template>
    <div>
       <div class="bg-white text-center fixed inset-x-0 bottom-0 z-10">
           <div class="container p-2 grid grid-cols-4 gap-4 mx-auto sm:w-full md:w-5/12">
                <div>
                    <a href="" class="w-full text-center inline-block">
                        <img src="../assets/images/home.png" class="inline-block mb-1 w-10 h-10">
                    </a>
                    <span class="block text-xs">Home</span>
                </div>
                <div>
                    <a href="" class="w-full text-center inline-block">
                        <img src="../assets/images/heart.png" class="inline-block mb-1 w-10 h-10">
                        <span class="block text-xs">Donation</span>
                    </a>
                </div>
                <div>
                    <a href="" class="w-full text-center inline-block">
                        <img src="../assets/images/flag.png" class="inline-block mb-1 w-10 h-10">
                        <span class="block text-xs">Campaign</span>
                    </a>
                </div>
                <div>
                    <router-link :to="{name: 'login'}" class="w-full text-center inline-block">
                        <img src="../assets/images/user.png" class="inline-block mb-1 w-10 h-10">
                        <span class="block text-xs">Account</span>
                    </router-link>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    
}
</script>