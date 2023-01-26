<script setup >
import {ref} from "vue";
import getUsers from "~~/src/api/getUsers";
import {useInfiniteScroll} from "@vueuse/core";

const listEl = ref(null);
const usersToShow = 5;
const usersList = ref(await getUsers(usersToShow, 0));
const fetchingData = ref(null);

const getUsersOnScroll = async ()=> {
    fetchingData.value = true;
    await new Promise((res) => setTimeout(res, 1000));
    const newUsers = await getUsers(
        usersToShow,
        usersList.value.length
    );
    fetchingData.value = null;
    usersList.value.push(...newUsers);
};


useInfiniteScroll(
    listEl,
    async () => {
        await getUsersOnScroll();
    },
    {distance: 10}
);

</script>


<template>
    <div>
       <ul ref="listEl" class="dark:bg-pink-400 m-8 mb-5">
        <li v-for="user in usersList">{{ user.firstName }}</li>
        <p v-show="fetchingData">Fetching more users...</p>
       </ul> 
    </div>
</template>

<style scoped>
ul {
    background-color: #a2adb8;
    list-style: none;
    max-height: 400px;
    width: 500px;
    overflow: scroll;
    padding: 12px 20px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),0 8px 10px -6px rgb(0 0 0/ 0.1);
}

li{
    padding: 12px 0;
    color: white;
    font-size: 18px;
}
</style>