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
        <q-btn flat round dense icon="schedule" class="q-mr-xs" @click="activateBreakMode"/>
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
      bordered
    >
      <q-list>
        <q-item-label
          header
          v-if="essentialLinks.length > 0"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list>
        <q-item-label
          header
          v-if="pageList.length > 0"
        >
          Sezioni
        </q-item-label>

        <PageLink
          v-for="page in pageList"
          :key="page.title"
          v-bind="page"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import PageLink from 'components/PageLink.vue'

const linksList = [
  /* {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  } */
]

const pageList = [
  {
    title: 'Tabellone',
    caption: 'tabellone',
    icon: 'home',
    to: 'home'
  },
  {
    title: 'Statistiche',
    caption: 'statistiche',
    icon: 'insights',
    to: 'statistics'
  }
]

import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    PageLink
  },

  setup () {
    // const $q = useQuasar()
    const $store = useStore()

    const leftDrawerOpen = ref(false)
    const activateBreakMode = () => {
      // breakMode = !breakMode
      $store.commit('scoreboard/updateBreakMode', true)
    }
    return {
      essentialLinks: linksList,
      pageList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      activateBreakMode
    }
  }
})
</script>
