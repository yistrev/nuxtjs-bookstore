export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // 静的サイト生成の設定
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // 本の詳細ページを事前生成
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // books.jsonからIDを取得して動的ルートを生成
      const { books } = require('./data/books.json')
      const routes = books.map((book: any) => `/books/${book.id}`)
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes || []),
        ...routes
      ]
    }
  }
})
