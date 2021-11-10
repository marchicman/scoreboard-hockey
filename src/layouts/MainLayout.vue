<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ScoreBoard Hockey
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div>-->
        <q-btn flat round dense icon="settings_brightness" class="q-mr-xs" @click="$q.dark.toggle()"/>
        <q-btn flat round dense icon="schedule" class="q-mr-xs" @click="breakMode = !breakMode"/>
        <q-btn
            flat
            dense
            round
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            aria-label="Fullscreen"
          />
          <div class="text-caption">Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog
      v-model="breakMode">
     <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="justify-center">
          <div class="text-h6">Intervallo</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="column items-center">
            <CountDown v-bind:time="600" @time-elapsed="onBreakEnd"/>
          </div>
        </q-card-section>
     </q-card>
  </q-dialog>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import CountDown from 'components/CountDown.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    CountDown
  },

  setup () {
    // const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const breakMode = ref(false)
    const onBreakEnd = () => {
      breakMode.value = false
    }

    return {
      breakMode,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      onBreakEnd
    }
  }
})
</script>
