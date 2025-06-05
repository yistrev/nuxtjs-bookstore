<template>
  <div v-if="category">
    <!-- パンくずナビ -->
    <nav class="mb-6 text-sm">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">ホーム</NuxtLink>
      <span class="mx-2 text-gray-500">></span>
      <NuxtLink to="/categories" class="text-blue-600 hover:text-blue-700">カテゴリー一覧</NuxtLink>
      <span class="mx-2 text-gray-500">></span>
      <span class="text-gray-500">{{ category.name }}</span>
    </nav>

    <!-- カテゴリーヘッダー -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
      <div class="text-center">
        <!-- 柔軟なアイコン表示 -->
        <div class="mb-4 flex justify-center">
          <component
            v-if="categoryIcon.type === 'svg'"
            :is="'svg'"
            :class="categoryIcon.className"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="categoryIcon.path"></path>
          </component>
          <div v-else :class="categoryIcon.className">{{ categoryIcon.content }}</div>
        </div>
        <h1 class="text-3xl font-bold mb-2">{{ category.name }}</h1>
        <p class="text-blue-100 mb-4">{{ category.description }}</p>
        <div class="text-lg">
          <span class="bg-white/20 px-4 py-2 rounded-full">
            {{ categoryBooks.length }}冊の本があります
          </span>
        </div>
      </div>
    </div>

    <!-- ソート・フィルター -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <div class="grid md:grid-cols-2 gap-4">
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

        <!-- ソート -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">並び順</label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">タイトル順</option>
            <option value="author">著者順</option>
            <option value="price">価格順（安い順）</option>
            <option value="price-desc">価格順（高い順）</option>
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
          </div>

          <!-- 本の情報 -->
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ book.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
            <p class="text-sm text-gray-700 line-clamp-2 mb-3">{{ book.catchphrase }}</p>

            <!-- カテゴリータグ -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="cat in book.category"
                :key="cat"
                class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
              >
                {{ cat }}
              </span>
            </div>

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

    <!-- カテゴリー統計 -->
    <div class="mt-12 bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-bold text-gray-800 mb-4">📊 このカテゴリーの統計</h3>
      <div class="grid md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ categoryBooks.length }}</div>
          <div class="text-sm text-gray-600">総書籍数</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">¥{{ averagePrice }}</div>
          <div class="text-sm text-gray-600">平均価格</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">¥{{ minPrice }}</div>
          <div class="text-sm text-gray-600">最安値</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-600">¥{{ maxPrice }}</div>
          <div class="text-sm text-gray-600">最高値</div>
        </div>
      </div>
    </div>

    <!-- 他のカテゴリー -->
    <div class="mt-12">
      <h3 class="text-xl font-bold text-gray-800 mb-6">🏷️ 他のカテゴリーも見る</h3>
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="otherCategory in otherCategories"
          :key="otherCategory.id"
          :to="`/categories/${otherCategory.id}`"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
        >
          <!-- 柔軟なアイコン表示 -->
          <div class="mb-2 flex justify-center">
            <component
              v-if="otherCategory.icon.type === 'svg'"
              :is="'svg'"
              :class="otherCategory.icon.className"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="otherCategory.icon.path"></path>
            </component>
            <div v-else :class="otherCategory.icon.className">{{ otherCategory.icon.content }}</div>
          </div>
          <div class="font-medium text-sm">{{ otherCategory.name }}</div>
          <div class="text-xs text-gray-500">{{ getBookCountByCategory(otherCategory.name) }}冊</div>
        </NuxtLink>
      </div>
    </div>

    <!-- ナビゲーション -->
    <div class="flex justify-between items-center mt-12 pt-8 border-t">
      <NuxtLink to="/categories" class="text-blue-600 hover:text-blue-700">
        ← カテゴリー一覧に戻る
      </NuxtLink>
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">
        ホームに戻る →
      </NuxtLink>
    </div>
  </div>

  <!-- カテゴリーが見つからない場合 -->
  <div v-else class="text-center py-12">
    <div class="text-6xl mb-4">😕</div>
    <h2 class="text-2xl font-bold text-gray-600 mb-4">お探しのカテゴリーが見つかりません</h2>
    <p class="text-gray-500 mb-8">指定されたカテゴリーは存在しないか、削除されています。</p>
    <NuxtLink to="/categories" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
      カテゴリー一覧を見る
    </NuxtLink>
  </div>
</template>

<script setup>
// ルートパラメータからカテゴリーIDを取得
const route = useRoute()
const categoryId = route.params.id

// composablesを使用してデータを取得
const { books, categories, getBooksByCategory, getBookCountByCategory, getCategoryIcon } = useBooks()

// 該当カテゴリーを検索
const category = categories.find(c => c.id === categoryId)

// カテゴリーアイコンを取得
const categoryIcon = computed(() => {
  return category ? getCategoryIcon(category.name) : { type: "emoji", content: "📖", className: "text-5xl" }
})

// このカテゴリーの書籍（配列対応）
const categoryBooks = computed(() => {
  if (!category) return []
  return getBooksByCategory(category.name)
})

// 他のカテゴリー
const otherCategories = computed(() => {
  return categories.filter(c => c.id !== categoryId)
})

// リアクティブな状態
const searchQuery = ref('')
const sortBy = ref('title')

// フィルタリングとソート
const filteredBooks = computed(() => {
  let result = [...categoryBooks.value]

  // 検索フィルター
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    )
  }

  // ソート
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'author':
        return a.author.localeCompare(b.author, 'ja')
      case 'price':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      default: // title
        return a.title.localeCompare(b.title, 'ja')
    }
  })

  return result
})

// 統計データ
const averagePrice = computed(() => {
  if (categoryBooks.value.length === 0) return 0
  const total = categoryBooks.value.reduce((sum, book) => sum + book.price, 0)
  return Math.round(total / categoryBooks.value.length).toLocaleString()
})

const minPrice = computed(() => {
  if (categoryBooks.value.length === 0) return 0
  return Math.min(...categoryBooks.value.map(book => book.price)).toLocaleString()
})

const maxPrice = computed(() => {
  if (categoryBooks.value.length === 0) return 0
  return Math.max(...categoryBooks.value.map(book => book.price)).toLocaleString()
})

// 404エラーハンドリング
if (!category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'カテゴリーが見つかりません'
  })
}

// SEO設定
useHead({
  title: `${category.name} | 本屋索引システム`,
  meta: [
    { name: 'description', content: `${category.description} - ${categoryBooks.value.length}冊の本があります` }
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
