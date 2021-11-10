<template lang="html">
  <q-dialog
      v-model="openMode">
      <q-card>
        <q-card-section class="justify-center">
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="column items-center">
            <CountDown v-bind:time="seconds" @time-elapsed="onTimeEnd"/>
          </div>
        </q-card-section>
     </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

import CountDown from 'components/CountDown.vue'

export default defineComponent({
  name: 'MatchTime',
  components: {
    CountDown
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    }
  },
  emits: ['time-end'],
  setup (props, context) {
    const openMode = ref(props.isOpen)

    const onTimeEnd = () => {
      openMode.value = false
      context.emit('time-end')
    }

    return { openMode, onTimeEnd }
  }
})
</script>

<style lang="css" scoped>
</style>
