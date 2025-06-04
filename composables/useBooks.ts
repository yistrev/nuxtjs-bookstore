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
        "isbn": "978-4-12345-001-0"
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
        "isbn": "978-4-12345-002-7"
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
        "isbn": "978-4-12345-003-4"
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
        "description": "ソフトウェア開発・プログラミングに関する書籍"
      },
      {
        "id": "design",
        "name": "デザイン",
        "description": "UI/UX・グラフィックデザインに関する書籍"
      },
      {
        "id": "self-improvement",
        "name": "自己啓発",
        "description": "スキルアップ・学習法に関する書籍"
      },
      {
        "id": "javascript",
        "name": "JavaScript",
        "description": "JavaScript・フロントエンド開発に関する書籍"
      },
      {
        "id": "vue",
        "name": "Vue.js",
        "description": "Vue.js・フレームワークに関する書籍"
      },
      {
        "id": "design-patterns",
        "name": "設計",
        "description": "ソフトウェア設計・アーキテクチャに関する書籍"
      },
      {
        "id": "ui-ux",
        "name": "UI/UX",
        "description": "ユーザーインターフェース・体験設計に関する書籍"
      },
      {
        "id": "learning",
        "name": "学習法",
        "description": "効率的な学習・勉強法に関する書籍"
      },
      {
        "id": "psychology",
        "name": "心理学",
        "description": "心理学・行動科学に関する書籍"
      }
    ]
  }

  return {
    books: booksData.books,
    categories: booksData.categories,
    data: booksData
  }
}
