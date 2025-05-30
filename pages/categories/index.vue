<template>
  <div>
    <!-- ページヘッダー -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">🏷️ カテゴリー一覧</h1>
      <p class="text-gray-600">{{ categories.length }}つのカテゴリーから本を探すことができます</p>
    </div>

    <!-- ソート機能 -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <div class="flex items-center space-x-4">
        <label class="text-sm font-medium text-gray-700">並び順:</label>
        <select
          v-model="sortBy"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">カテゴリー名順</option>
          <option value="bookCount">書籍数順</option>
        </select>
      </div>
    </div>

    <!-- カテゴリー一覧 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in sortedCategories"
        :key="category.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <NuxtLink :to="`/categories/${category.id}`" class="block p-6">
          <!-- カテゴリーアイコン -->
          <div class="text-center mb-4">
            <div class="text-5xl mb-2">{{ getCategoryIcon(category.name) }}</div>
            <h2 class="text-xl font-bold text-gray-800">{{ category.name }}</h2>
          </div>

          <!-- カテゴリー説明 -->
          <p class="text-gray-600 text-sm mb-4 text-center">{{ category.description }}</p>

          <!-- 書籍数 -->
          <div class="text-center">
            <span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {{ getBookCountByCategory(category.name) }}冊
            </span>
          </div>

          <!-- 最新の本（サンプル表示） -->
          <div class="mt-4 pt-4 border-t">
            <div class="text-xs text-gray-500 mb-2">最新の本:</div>
            <div v-if="getLatestBookByCategory(category.name)" class="text-sm">
              <div class="font-medium truncate">{{ getLatestBookByCategory(category.name).title }}</div>
              <div class="text-gray-500 text-xs">{{ getLatestBookByCategory(category.name).author }}</div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- 統計情報 -->
    <div class="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
      <h3 class="text-xl font-bold mb-4">📊 統計情報</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-3xl font-bold">{{ totalBooks }}</div>
          <div class="text-sm opacity-90">総書籍数</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">{{ categories.length }}</div>
          <div class="text-sm opacity-90">カテゴリー数</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">{{ mostPopularCategory?.name || 'N/A' }}</div>
          <div class="text-sm opacity-90">最多カテゴリー</div>
        </div>
      </div>
    </div>

    <!-- ナビゲーション -->
    <div class="text-center mt-12">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">
        ← ホームに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// データの読み込み
const { data: booksData } = await $fetch('/data/books.json')
const books = booksData.books
const categories = booksData.categories

// ソート状態
const sortBy = ref('name')

// カテゴリーアイコンを取得
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'プログラミング': '💻',
    'デザイン': '🎨',
    '自己啓発': '📈',
    'ビジネス': '💼',
    '小説': '📚',
    '歴史': '🏛️',
    '科学': '🔬',
    '料理': '👩‍🍳'
  }
  return iconMap[categoryName] || '📖'
}

// カテゴリー別書籍数を取得
const getBookCountByCategory = (categoryName) => {
  return books.filter(book => book.category === categoryName).length
}

// カテゴリー別最新書籍を取得
const getLatestBookByCategory = (categoryName) => {
  const categoryBooks = books.filter(book => book.category === categoryName)
  return categoryBooks[0] // 実際のアプリでは日付でソートする
}

// ソート済みカテゴリー
const sortedCategories = computed(() => {
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    bookCount: getBookCountByCategory(category.name)
  }))

  return categoriesWithCounts.sort((a, b) => {
    if (sortBy.value === 'bookCount') {
      return b.bookCount - a.bookCount
    }
    return a.name.localeCompare(b.name, 'ja')
  })
})

// 統計データ
const totalBooks = computed(() => books.length)
const mostPopularCategory = computed(() => {
  return sortedCategories.value.reduce((prev, current) =>
    (prev.bookCount > current.bookCount) ? prev : current
  )
})

// SEO設定
useHead({
  title: 'カテゴリー一覧 | 本屋索引システム',
  meta: [
    { name: 'description', content: `${categories.length}つのカテゴリーから本を探すことができます` }
  ]
})
</script>
