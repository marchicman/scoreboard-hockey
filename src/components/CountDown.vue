<template lang="html">
  <div class="row items-center">
    <div class="col" v-bind:style="{ fontFamily: 'clockicons', color: 'red', fontSize: digitSize }">
      {{ timePassed }}
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onBeforeUnmount, ref, computed } from 'vue'
import { formatTime, formatTimeDecimals } from '../utils/dateUtils'

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
      if (seconds.value === 60) {
        clearInterval(timer)
        timer = setInterval(updateDecimals, 100)
      } else if (props.isRunning) {
        seconds.value--
        context.emit('update:time', seconds.value)
      }
    }

    const updateDecimals = () => {
      if (seconds.value === 0) {
        clearInterval(timer)
        context.emit('time-elapsed')
      } else if (props.isRunning) {
        seconds.value = seconds.value - 0.01
        context.emit('update:time', seconds.value)
      }
    }

    const digitSize = computed(() => {
      return props.size + 'vh'
    })
    const seconds = ref(props.time)
    const timePassed = computed(() => {
      return seconds.value >= 60 ? formatTime(seconds.value) : formatTimeDecimals(seconds.value)
    })
    onBeforeMount(() => {
      timer = props.time > 60 ? setInterval(updateSeconds, 1000) : setInterval(updateDecimals, 100)
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
