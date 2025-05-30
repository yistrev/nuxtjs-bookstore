<template>
  <div class="min-h-screen bg-gray-50">
    <!-- ヘッダー -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
          📚 本屋索引システム
        </NuxtLink>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <!-- フッター -->
    <footer class="bg-gray-800 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="text-center">
          <p>&copy; 2025 本屋索引システム. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// SEO設定
useHead({
  title: '本屋索引システム',
  meta: [
    { name: 'description', content: '本を簡単に検索・発見できる索引システム' }
  ]
})
</script>
