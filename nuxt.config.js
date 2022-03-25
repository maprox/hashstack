import path from 'path';
import fs from 'fs';

const useHttps = process.env.USE_HTTPS;

const authRedirectUri = process.env.AUTH_REDIRECT_URI || 'https://app.hashstack.net';
const apiUri = process.env.API_URI || 'https://api2.hashstack.net';
const keycloak = {
  HOST: process.env.KEYCLOAK_HOST || 'https://auth.hashstack.net',
  REALM: process.env.KEYCLOAK_REALM || 'hashstack',
  CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'app-nuxt',
};

export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Hashstack',
    title: 'Hashstack',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  publicRuntimeConfig: {
    apiUri,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    },
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: false,
      watchLoggedIn: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${keycloak.HOST}/realms/${keycloak.REALM}/protocol/openid-connect/auth`,
          userInfo: `${keycloak.HOST}/realms/${keycloak.REALM}/protocol/openid-connect/userinfo`,
          token: `${keycloak.HOST}/realms/${keycloak.REALM}/protocol/openid-connect/token`,
          logout: `${keycloak.HOST}/realms/${keycloak.REALM}/protocol/openid-connect/logout?redirect_uri=` +
            encodeURIComponent(authRedirectUri),
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800000,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: keycloak.CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256',
      },
    },
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/callback',
      home: '/home',
    },
    plugins: [
      '@/plugins/auth',
    ],
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en-US.js' },
      { code: 'ru', file: 'ru-RU.js' },
    ],
    // lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ru',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ...
  },

  server: {
    host: '0.0.0.0',
    ...useHttps
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
          },
        }
      : {},
  },
};
