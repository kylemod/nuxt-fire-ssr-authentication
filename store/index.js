const state = () => ({
  user: null
})

const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

const actions = {
  onAuthStateChanged({ commit }, { authUser, claims }) {
      if (!authUser) {
      // remove state
      commit('SET_USER', null)
      console.log('not authenticated')
    } else {
      const { uid, email } = authUser
      commit('SET_USER', {
        uid,
        email,
      })
      if(this.$router.path != '/') {
        this.$router.replace({
          path: '/',
        }).catch(()=>{})
        console.log('you are authenticated')
      }
    }
  },
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
 
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user
      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },
}

export default {
  state,
  actions,
  mutations,
}
