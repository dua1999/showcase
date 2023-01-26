<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePointerSwipe } from '@vueuse/core'
import type { SwipeDirection } from '@vueuse/core'
const target = ref(null)
const container = ref<HTMLElement | null>(null)
const containerWidth = computed(() => container.value?.offsetWidth)
const left = ref('0')
const opacity = ref(1)
const reset = () => {
  left.value = '0'
  opacity.value = 1
}
const { distanceX, isSwiping } = usePointerSwipe(target, {
  onSwipe(e: PointerEvent): void {
    if (containerWidth.value) {
      if (distanceX.value < 0) {
        const distance = Math.abs(distanceX.value)
        left.value = `${distance}px`
        opacity.value = 1.25 - distance / containerWidth.value
      }
      else {
        left.value = '0'
        opacity.value = 1
      }
    }
  },
  onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
    if (distanceX.value < 0 && containerWidth.value && (Math.abs(distanceX.value) / containerWidth.value) >= 0.5) {
      left.value = '100%'
      opacity.value = 0
    }
    else {
      left.value = '0'
      opacity.value = 1
    }
  },
})
</script>

<template>
  <div ref="container" class=" rounded relative w-full h-[80px] m-auto flex  text-white items-center justify-center overflow-hidden bg-slate-800 dark:bg-blue-400">
    <button @click="reset">
      Reset
    </button>
    <div
      ref="target"
      class="absolute w-full h-full top-0 left-0 bg-green-500 flex items-center justify-center dark:bg-lime-400"
      :class="{ 'transition-all duration-200 ease-linear': !isSwiping }"
      :style="{ left, opacity }"
    >
      <p class="flex text-white items-center">
        Swipe to the right! <mdi-arrow-right />
      </p>
    </div>
  </div>
</template>