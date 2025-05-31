<template>
  <div>
    <!-- ページヘッダー -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">📚 すべての本</h1>
      <p class="text-gray-600">{{ books.length }}冊の本が登録されています</p>
    </div>

    <!-- 検索・フィルター -->
    <div class="mb-8 bg-white p-4 rounded-lg shadow">
      <div class="grid md:grid-cols-3 gap-4">
        <!-- 検索ボックス -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">検索</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="タイトルや著者で検索..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- カテゴリーフィルター -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">カテゴリー</label>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">すべて</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- ソート -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">並び順</label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">タイトル順</option>
            <option value="author">著者順</option>
            <option value="price">価格順</option>
            <option value="category">カテゴリー順</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 書籍一覧 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <NuxtLink :to="`/books/${book.id}`">
          <!-- 本の画像 -->
          <div class="aspect-[3/4] bg-gray-200 flex items-center justify-center">
            <div class="text-4xl">📖</div>
            <!-- 実際の画像を使用する場合は <img :src="book.image" :alt="book.title"> -->
          </div>

          <!-- 本の情報 -->
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ book.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
            <p class="text-xs text-blue-600 mb-2">{{ book.category }}</p>
            <p class="text-sm text-gray-700 line-clamp-2 mb-3">{{ book.catchphrase }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-green-600">¥{{ book.price.toLocaleString() }}</span>
              <span class="text-xs text-gray-500">詳細を見る →</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- 結果がない場合 -->
    <div v-if="filteredBooks.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-gray-600 mb-2">該当する本が見つかりません</h3>
      <p class="text-gray-500">検索条件を変更してお試しください</p>
    </div>

    <!-- ページトップに戻る -->
    <div class="text-center mt-12">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">
        ← ホームに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// composablesを使用してデータを取得
const { books, categories } = useBooks()

// リアクティブな状態
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('title')

// フィルタリングとソート
const filteredBooks = computed(() => {
  let result = [...books]

  // 検索フィルター
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  }

  // カテゴリーフィルター
  if (selectedCategory.value) {
    result = result.filter(book => book.category === selectedCategory.value)
  }

  // ソート
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'author':
        return a.author.localeCompare(b.author, 'ja')
      case 'price':
        return a.price - b.price
      case 'category':
        return a.category.localeCompare(b.category, 'ja')
      default: // title
        return a.title.localeCompare(b.title, 'ja')
    }
  })

  return result
})

// SEO設定
useHead({
  title: '書籍一覧 | 本屋索引システム',
  meta: [
    { name: 'description', content: `${books.length}冊の本を一覧で表示。検索・フィルター機能付き` }
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
