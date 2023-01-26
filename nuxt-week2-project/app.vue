

<template>
    <div>
        <section>
            <DarkMode></DarkMode>
        </section>

        <section>
            <Suspense>
            <InfiniteScroll/>
            <template #fallback>
               <p>Loading...</p> 
            </template>
            </Suspense>
            
             
        </section>
        
        <section>
            <Swipe/>
        </section>
    </div>
</template>

<style>
html.dark{
    color-scheme: dark;
}

body{
    @apply bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50;
}
</style>