import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as auth from './modules/auth'
import * as conversations from './modules/conversations'
import * as groups from './modules/groups'
import * as stores from './modules/stores'
import * as users from './modules/users'
import * as pickups from './modules/pickups'
import * as i18n from './modules/i18n'
import * as sidenav from './modules/sidenav'
import * as about from './modules/about'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const options = ({
  modules: {
    auth,
    conversations,
    groups,
    stores,
    users,
    pickups,
    i18n,
    sidenav,
    about
  },
  plugins: [createPersistedState({
    paths: ['i18n.locale']
  })],
  strict: debug
})

// Set all modules to be namespaces

for (let k of Object.keys(options.modules)) {
  let m = options.modules[k]

  // Enforce use of namespaced modules
  m.namespaced = true
}

export default new Vuex.Store(options)
