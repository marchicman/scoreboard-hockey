<template lang="html">
  <div class="row items-center">
    <div class="col" v-bind:style="{ fontFamily: 'clockicons', color: 'red', fontSize: digitSize }">
      {{ timePassed }}
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onBeforeUnmount, ref, computed } from 'vue'

export default defineComponent({
  name: 'CountDown',
  props: {
    time: {
      type: Number,
      required: true
    },
    isRunning: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 10
    }
  },
  emits: ['time-elapsed', 'update:time'],
  setup (props, context) {
    let timer
    const updateSeconds = () => {
      if (seconds.value === 0) {
        clearInterval(timer)
        context.emit('time-elapsed')
      } else if (props.isRunning) {
        seconds.value--
        context.emit('update:time', seconds.value)
      }
    }

    const digitSize = computed(() => {
      return props.size + 'vh'
    })
    const seconds = ref(props.time)
    const timePassed = computed(() => {
      const minutes = Math.round((seconds.value - 30) / 60)
      const remainingSeconds = (seconds.value % 60)
      return (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
    })
    onBeforeMount(() => {
      timer = setInterval(updateSeconds, 1000)
    })
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
    return {
      digitSize,
      timePassed
    }
  }
})
</script>
