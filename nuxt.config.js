module.exports = {
    mode: 'spa',
    head: {
      title: 'Chanpongram',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt.js project' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'
        }
      ]
    },
    plugins: [],
    css: [],
    srcDir: './src/',
    /*
     ** Build configuration
     */
    buildModules: [
      '@nuxt/typescript-build',
      '@nuxtjs/vuetify',
    ],
    build: {
      vendor: ["axios"],
      /*
       ** Run ESLint on save
       */
      extend(config, ctx) {
        if (ctx.dev && ctx.isClient) {
          config.module.rules.push({
            enforce: "pre",
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            exclude: /(node_modules)/
          });
        }
        config.module.rules = config.module.rules.map(rule => {
          if (rule.loader === "babel-loader") {
            rule.exclude = /node_modules/;
          }
          return rule;
        });
      }
    }
  };