<template>
  <div>
    <!-- ページヘッダー -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">📚 すべての本</h1>
      <p class="text-gray-600">{{ books.length }}冊の本が登録されています</p>
    </div>

    <!-- 検索・フィルター -->
    <div class="mb-8 bg-white p-4 rounded-lg shadow">
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
            <option value="price">価格順</option>
          </select>
        </div>
      </div>

      <!-- カテゴリーフィルター（複数選択対応） -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">カテゴリー（複数選択可）</label>
        <div class="flex flex-wrap gap-2">
          <label
            v-for="category in categories"
            :key="category.id"
            class="inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              :value="category.name"
              v-model="selectedCategories"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
          </label>
        </div>

        <!-- 選択中のカテゴリーを表示 -->
        <div v-if="selectedCategories.length > 0" class="mt-2">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="category in selectedCategories"
              :key="category"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {{ category }}
              <button
                @click="removeCategory(category)"
                class="ml-1 text-blue-600 hover:text-blue-800"
                type="button"
              >
                ×
              </button>
            </span>
          </div>
        </div>

        <!-- 全選択・全解除ボタン -->
        <div class="mt-2 flex gap-2">
          <button
            @click="selectAllCategories"
            class="text-xs text-blue-600 hover:text-blue-800 underline"
            type="button"
          >
            すべて選択
          </button>
          <button
            @click="clearAllCategories"
            class="text-xs text-gray-600 hover:text-gray-800 underline"
            type="button"
          >
            すべて解除
          </button>
        </div>
      </div>
    </div>

    <!-- フィルター結果の表示 -->
    <div class="mb-4 text-sm text-gray-600">
      <span v-if="selectedCategories.length === 0">
        全{{ books.length }}冊中 {{ filteredBooks.length }}冊を表示
      </span>
      <span v-else>
        {{ selectedCategories.join('、') }}カテゴリー: {{ filteredBooks.length }}冊を表示
      </span>
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

            <!-- 複数カテゴリーを表示 -->
            <div class="flex flex-wrap gap-1 mb-2">
              <span
                v-for="category in book.category"
                :key="category"
                class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {{ category }}
              </span>
            </div>

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
const selectedCategories = ref([])
const sortBy = ref('title')

// カテゴリー操作メソッド
const removeCategory = (categoryToRemove) => {
  selectedCategories.value = selectedCategories.value.filter(cat => cat !== categoryToRemove)
}

const selectAllCategories = () => {
  selectedCategories.value = categories.map(cat => cat.name)
}

const clearAllCategories = () => {
  selectedCategories.value = []
}

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

  // カテゴリーフィルター（複数カテゴリー対応）
  if (selectedCategories.value.length > 0) {
    result = result.filter(book =>
      // 選択されたカテゴリーのいずれかが本のカテゴリーに含まれているかチェック
      selectedCategories.value.some(selectedCat =>
        book.category.includes(selectedCat)
      )
    )
  }

  // ソート
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'author':
        return a.author.localeCompare(b.author, 'ja')
      case 'price':
        return a.price - b.price
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

/* チェックボックスのスタイリング */
.form-checkbox {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  transform: translateY(-0.075em);
}

.form-checkbox:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
}

.form-checkbox:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #3b82f6;
}
</style>
