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
      try {
        // public/data/books.jsonからIDを取得して動的ルートを生成
        const fs = await import('fs')
        const path = await import('path')

        const booksPath = path.resolve('./public/data/books.json')
        const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf-8'))
        const routes = booksData.books.map((book: any) => `/books/${book.id}`)

        nitroConfig.prerender = nitroConfig.prerender || {}
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes || []),
          ...routes
        ]
      } catch (error) {
        console.warn('books.jsonが見つかりません。動的ルートの事前生成をスキップします。')
      }
    }
  }
})
