<template>
  <div class="text-center">
    <!-- ヒーローセクション -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        📖 本を探そう
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        お探しの本を簡単に見つけることができます
      </p>
    </div>

    <!-- メインナビゲーション -->
    <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
      <!-- 一覧から探すボタン -->
      <NuxtLink
        to="/books"
        class="bg-blue-500 hover:bg-blue-600 text-white p-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <div class="text-6xl mb-4">📚</div>
        <h2 class="text-2xl font-bold mb-2">一覧から探す</h2>
        <p class="text-blue-100">すべての本を一覧で見る</p>
      </NuxtLink>

      <!-- カテゴリーから探すボタン -->
      <NuxtLink
        to="/categories"
        class="bg-green-500 hover:bg-green-600 text-white p-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <div class="text-6xl mb-4">🏷️</div>
        <h2 class="text-2xl font-bold mb-2">カテゴリーから探す</h2>
        <p class="text-green-100">分野別に本を探す</p>
      </NuxtLink>
    </div>

    <!-- 統計情報 -->
    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-2xl font-bold text-blue-600">{{ totalBooks }}</div>
        <div class="text-sm text-gray-600">総書籍数</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-2xl font-bold text-green-600">{{ totalCategories }}</div>
        <div class="text-sm text-gray-600">カテゴリー数</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-2xl font-bold text-purple-600">NEW</div>
        <div class="text-sm text-gray-600">最新追加</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-2xl font-bold text-orange-600">QR</div>
        <div class="text-sm text-gray-600">対応済み</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// データの読み込み
const { data: booksData } = await $fetch('/data/books.json')

const totalBooks = computed(() => booksData.books.length)
const totalCategories = computed(() => booksData.categories.length)

// SEO設定
useHead({
  title: 'ホーム | 本屋索引システム',
  meta: [
    { name: 'description', content: '本を簡単に検索・発見できる索引システムのホームページ' }
  ]
})
</script>
