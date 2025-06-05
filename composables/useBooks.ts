// composables/useBooks.ts
export const useBooks = () => {
  const booksData = {
    "books": [
      {
        "id": "book-001",
        "title": "Vue.js入門ガイド",
        "image": "/images/vue-guide.jpg",
        "catchphrase": "初心者から上級者まで！Vue.jsの全てがここに",
        "description": "Vue.jsの基礎から応用まで、実践的なサンプルコードと共に詳しく解説しています。フロントエンド開発者必読の一冊です。",
        "category": ["プログラミング", "Vue.js", "JavaScript"],
        "author": "山田太郎",
        "price": 2800,
        "isbn": "978-4-12345-001-0",
        "sectionhead1": "Vue.jsの基本",
        "sectiontext1": "Vue.jsの基本的な概念と構文を学び、コンポーネントベースの開発手法を理解します。",
        "sectionhead2": "実践的なアプリケーション開発",
        "sectiontext2": "実際のアプリケーションを作成しながら、Vue.jsの応用技術を習得します。",
        "sectionhead3": "パフォーマンス最適化",
        "sectiontext3": "Vue.jsアプリケーションのパフォーマンスを向上させるためのテクニックとベストプラクティスを紹介します。",
        "sectionlink1": "/books/vue-guide#basic",
        "sectionimage1": "/images/vue-basics.jpg",
      },
      {
        "id": "book-002",
        "title": "デザインパターン実践",
        "image": "/images/design-patterns.jpg",
        "catchphrase": "美しいコードを書くための設計思想",
        "description": "ソフトウェア開発において重要なデザインパターンを、具体的な例とともに分かりやすく説明します。",
        "category": ["プログラミング", "設計", "オブジェクト指向"],
        "author": "佐藤花子",
        "price": 3200,
        "isbn": "978-4-12345-002-7",
        "sectionhead1": "デザインパターンの基礎",
        "sectiontext1": "デザインパターンの基本概念と、代表的なパターンの紹介を行います。",
        "sectionhead2": "実践的な適用方法",
        "sectiontext2": "実際のプロジェクトでのデザインパターンの適用方法と、その効果を解説します。",
        "sectionhead3": "",
        "sectiontext3": "",
        "sectionlink1": "/books/design-patterns#basics",
        "sectionlink2": "/books/design-patterns#application",
        "sectionimage1": "/images/design-patterns-basics.jpg",
        "sectionimage2": "/images/design-patterns-application.jpg"
      },
      {
        "id": "book-003",
        "title": "UI/UXデザインの教科書",
        "image": "/images/ui-ux-design.jpg",
        "catchphrase": "ユーザーを魅了するインターフェース設計",
        "description": "優れたUI/UXデザインの原則から実践的な手法まで、デザイナー必携の知識を網羅した一冊です。",
        "category": ["デザイン", "UI/UX", "Webデザイン"],
        "author": "田中一郎",
        "price": 2600,
        "isbn": "978-4-12345-003-4",
        "sectionhead1": "UI/UXの基本原則",
        "sectiontext1": "ユーザー中心のデザインの重要性と、基本的な原則を学びます。",
        "sectionhead2": "実践的なデザイン手法",
        "sectiontext2": "プロトタイピングやユーザーテストなど、実際のデザインプロセスを詳しく解説します。",
        "sectionhead3": "最新のトレンドと技術",
        "sectiontext3": "現在のUI/UXデザインのトレンドと、最新技術の活用方法について紹介します。",
        "sectionlink1": "/books/ui-ux-design#principles",
        "sectionlink2": "/books/ui-ux-design#practical",
        "sectionlink3": "/books/ui-ux-design#trends",
        "sectionimage1": "/images/ui-ux-principles.jpg",
        "sectionimage2": "/images/ui-ux-practical.jpg",
        "sectionimage3": "/images/ui-ux-trends.jpg"
      },
      {
        "id": "book-004",
        "title": "効率的な学習法",
        "image": "/images/learning-method.jpg",
        "catchphrase": "最短で成果を出すための勉強術",
        "description": "科学的根拠に基づいた効果的な学習方法を紹介。記憶定着率を高め、短時間で最大の成果を得るテクニックが満載です。",
        "category": ["自己啓発", "学習法", "心理学"],
        "author": "鈴木美香",
        "price": 1800,
        "isbn": "978-4-12345-004-1"
      }
    ],
    "categories": [
      {
        "id": "programming",
        "name": "プログラミング",
        "description": "ソフトウェア開発・プログラミングに関する書籍",
        "icon": {
          "type": "svg",
          "path": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          "className": "w-12 h-12 text-blue-500"
        }
      },
      {
        "id": "design",
        "name": "デザイン",
        "description": "UI/UX・グラフィックデザインに関する書籍",
        "icon": {
          "type": "svg",
          "path": "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v12a2 2 0 104 0V3z",
          "className": "w-12 h-12 text-pink-500"
        }
      },
      {
        "id": "self-improvement",
        "name": "自己啓発",
        "description": "スキルアップ・学習法に関する書籍",
        "icon": {
          "type": "emoji",
          "content": "📈",
          "className": "text-5xl"
        }
      },
      {
        "id": "javascript",
        "name": "JavaScript",
        "description": "JavaScript・フロントエンド開発に関する書籍",
        "icon": {
          "type": "svg",
          "path": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
          "className": "w-12 h-12 text-yellow-500"
        }
      },
      {
        "id": "vue",
        "name": "Vue.js",
        "description": "Vue.js・フレームワークに関する書籍",
        "icon": {
          "type": "svg",
          "path": "M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z",
          "className": "w-12 h-12 text-green-500"
        }
      },
      {
        "id": "design-patterns",
        "name": "設計",
        "description": "ソフトウェア設計・アーキテクチャに関する書籍",
        "icon": {
          "type": "svg",
          "path": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
          "className": "w-12 h-12 text-purple-500"
        }
      },
      {
        "id": "ui-ux",
        "name": "UI/UX",
        "description": "ユーザーインターフェース・体験設計に関する書籍",
        "icon": {
          "type": "svg",
          "path": "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
          "className": "w-12 h-12 text-indigo-500"
        }
      },
      {
        "id": "learning",
        "name": "学習法",
        "description": "効率的な学習・勉強法に関する書籍",
        "icon": {
          "type": "emoji",
          "content": "🧠",
          "className": "text-5xl"
        }
      },
      {
        "id": "psychology",
        "name": "心理学",
        "description": "心理学・行動科学に関する書籍",
        "icon": {
          "type": "svg",
          "path": "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
          "className": "w-12 h-12 text-orange-500"
        }
      }
    ]
  }

  // カテゴリー別の書籍を取得するヘルパー関数
  const getBooksByCategory = (categoryName) => {
    return booksData.books.filter(book =>
      Array.isArray(book.category)
        ? book.category.includes(categoryName)
        : book.category === categoryName
    )
  }

  // カテゴリー別の書籍数を取得するヘルパー関数
  const getBookCountByCategory = (categoryName) => {
    return getBooksByCategory(categoryName).length
  }

  // カテゴリーアイコンを取得するヘルパー関数
  const getCategoryIcon = (categoryName) => {
    const category = booksData.categories.find(c => c.name === categoryName)
    return category?.icon || {
      type: "emoji",
      content: "📖",
      className: "text-5xl"
    }
  }

  return {
    books: booksData.books,
    categories: booksData.categories,
    data: booksData,
    getBooksByCategory,
    getBookCountByCategory,
    getCategoryIcon
  }
}
