<template>
  <div v-if="book">
    <!-- パンくずナビ -->
    <nav class="mb-6 text-sm">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">ホーム</NuxtLink>
      <span class="mx-2 text-gray-500">></span>
      <NuxtLink to="/books" class="text-blue-600 hover:text-blue-700">書籍一覧</NuxtLink>
      <span class="mx-2 text-gray-500">></span>
      <span class="text-gray-500">{{ book.title }}</span>
    </nav>

    <!-- 書籍詳細 -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- 書籍画像 -->
        <div class="md:w-1/3">
          <div class="aspect-[3/4] bg-gray-200 flex items-center justify-center text-8xl">
            📖
            <!-- 実際の画像を使用する場合は <img :src="book.image" :alt="book.title" class="w-full h-full object-cover"> -->
          </div>
        </div>

        <!-- 書籍情報 -->
        <div class="md:w-2/3 p-8">
          <!-- カテゴリーバッジ -->
          <div class="mb-4">
            <span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {{ book.category }}
            </span>
          </div>

          <!-- タイトル -->
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ book.title }}</h1>

          <!-- キャッチコピー -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-blue-600 mb-2">✨ {{ book.catchphrase }}</h2>
          </div>

          <!-- 基本情報 -->
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <span class="text-sm font-medium text-gray-600">著者</span>
              <p class="text-lg">{{ book.author }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-600">価格</span>
              <p class="text-lg font-bold text-green-600">¥{{ book.price.toLocaleString() }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-600">ISBN</span>
              <p class="text-lg font-mono">{{ book.isbn }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-600">カテゴリー</span>
              <p class="text-lg">{{ book.category }}</p>
            </div>
          </div>

          <!-- 説明 -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">📝 この本について</h3>
            <p class="text-gray-700 leading-relaxed">{{ book.description }}</p>
          </div>

          <!-- アクション -->
          <div class="flex flex-wrap gap-4">
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              📍 書店で探す
            </button>
            <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              💝 お気に入り
            </button>
            <button
              @click="shareBook"
              class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📤 共有
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- QRコード用URL表示（開発用） -->
    <div class="mt-8 bg-gray-100 p-4 rounded-lg">
      <h3 class="font-semibold mb-2">🔗 QRコード用URL（開発用）</h3>
      <code class="text-sm bg-white px-2 py-1 rounded">{{ fullUrl }}</code>
      <p class="text-xs text-gray-600 mt-2">
        このURLをQRコード化して紙媒体に印刷してください
      </p>
    </div>

    <!-- 関連書籍 -->
    <div class="mt-12">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">📚 同じカテゴリーの本</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="relatedBook in relatedBooks"
          :key="relatedBook.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <NuxtLink :to="`/books/${relatedBook.id}`">
            <div class="aspect-[3/4] bg-gray-200 flex items-center justify-center text-4xl">
              📖
            </div>
            <div class="p-4">
              <h4 class="font-bold mb-2 line-clamp-2">{{ relatedBook.title }}</h4>
              <p class="text-sm text-gray-600">{{ relatedBook.author }}</p>
              <p class="text-lg font-bold text-green-600 mt-2">¥{{ relatedBook.price.toLocaleString() }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ナビゲーション -->
    <div class="flex justify-between items-center mt-12 pt-8 border-t">
      <NuxtLink to="/books" class="text-blue-600 hover:text-blue-700">
        ← 書籍一覧に戻る
      </NuxtLink>
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">
        ホームに戻る →
      </NuxtLink>
    </div>
  </div>

  <!-- 書籍が見つからない場合 -->
  <div v-else class="text-center py-12">
    <div class="text-6xl mb-4">😕</div>
    <h2 class="text-2xl font-bold text-gray-600 mb-4">お探しの本が見つかりません</h2>
    <p class="text-gray-500 mb-8">指定されたIDの書籍は存在しないか、削除されています。</p>
    <NuxtLink to="/books" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
      書籍一覧を見る
    </NuxtLink>
  </div>
</template>

<script setup>
// ルートパラメータから書籍IDを取得
const route = useRoute()
const bookId = route.params.id

// データの読み込み
const { data: booksData } = await $fetch('/data/books.json')
const books = booksData.books

// 該当書籍を検索
const book = books.find(b => b.id === bookId)

// 関連書籍（同じカテゴリーの他の本）
const relatedBooks = computed(() => {
  if (!book) return []
  return books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 3)
})

// 完全なURLを生成（QRコード用）
const { $config } = useNuxtApp()
const fullUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/books/${bookId}`
  }
  return `/books/${bookId}`
})

// 共有機能
const shareBook = () => {
  if (navigator.share && book) {
    navigator.share({
      title: book.title,
      text: book.catchphrase,
      url: `/books/${book.id}`
    })
  } else {
    // フォールバック：URLをクリップボードにコピー
    navigator.clipboard.writeText(fullUrl.value)
    alert('URLをクリップボードにコピーしました')
  }
}

// 404エラーハンドリング
if (!book) {
  throw createError({
    statusCode: 404,
    statusMessage: '書籍が見つかりません'
  })
}

// SEO設定
useHead({
  title: `${book.title} | 本屋索引システム`,
  meta: [
    { name: 'description', content: book.catchphrase },
    { property: 'og:title', content: book.title },
    { property: 'og:description', content: book.description },
    { property: 'og:type', content: 'book' },
    { name: 'book:author', content: book.author },
    { name: 'book:isbn', content: book.isbn }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
