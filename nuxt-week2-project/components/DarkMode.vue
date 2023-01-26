<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle( isDark)
</script>

<template>

    <div>
        
        <button @click="toggleDark()"
        class="px-4 py-2 m-8 mb-5 text-white bg-green-500 rounded dark:bg-purple-500 flex place-content-center">Unable Dark Mode</button>
    </div>
</template>