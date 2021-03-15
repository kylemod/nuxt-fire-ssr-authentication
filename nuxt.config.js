export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-fire-auth',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { href: "https://fonts.googleapis.com/css2?family=Quicksand&display=swap", rel:"stylesheet" }
    ],
    bodyAttrs: {
      class: 'antialiased'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/firebase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
  ],
  
 firebase: {
  config: {
    apiKey: "AIzaSyCJdHUy83V9A3P0_p5d1vojVdH2iyrz3yE",
    authDomain: "nuxt-fire-crud-composition.firebaseapp.com",
    projectId: "nuxt-fire-crud-composition",
    storageBucket: "nuxt-fire-crud-composition.appspot.com",
    messagingSenderId: "733968325751",
    appId: "1:733968325751:web:3cd3532a3b38ec87993a72"
  },
  services: {
    auth: {
      ssr: true,
      initialize: {
        onAuthStateChangedAction: 'onAuthStateChanged',
      },
    },
    firestore: {
      memoryOnly: false,
      enablePersistence: true,
    },
  }
},

pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  },

router: {
    middleware: ['isAuthenticated'],
},


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  generate: {
    // choose to suit your project
    interval: 2000,
  }
}
