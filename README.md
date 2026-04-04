# Event Admin 活動管理平台

一個以 Vue 3 + TypeScript 開發的活動管理後台系統，採用前端模擬 API 完整呈現活動管理流程，具備登入驗證、權限控管、活動列表、新增與編輯等功能。

🔗 **線上預覽**：[https://yanhuabcd820.github.io/event_admin/](https://yanhuabcd820.github.io/event_admin/)

---

## 🚀 技術棧

| 類別       | 技術               |
| ---------- | ------------------ |
| 前端框架   | Vue 3 + TypeScript |
| 路由管理   | Vue Router 4       |
| 狀態管理   | Pinia              |
| 建構工具   | Vite               |
| 樣式       | CSS / Sass         |
| 測試       | Vitest             |
| 程式碼規範 | ESLint             |

---

## 📁 專案結構

```
src/
├── app/              # App 根元件與入口
├── components/       # 共用元件（Header 等）
├── composables/      # 可重用邏輯
│   ├── useActivityCreate.ts
│   ├── useActivityEdit.ts
│   ├── useActivityForm.ts
│   ├── useActivityList.ts
│   ├── useDirty.ts
│   └── useUnsavedLeaveGuard.ts
├── pages/            # 頁面元件
│   ├── LoginView.vue
│   ├── ActivityView.vue
│   ├── ActivityUpsertView.vue
│   └── NotFoundView.vue
├── repositories/     # 資料存取層
├── router/           # 路由設定
├── services/         # 模擬 API 資料層
├── stores/           # Pinia 狀態管理
│   ├── activity.store.ts
│   └── auth.store.ts
├── styles/           # 全域樣式
└── types/            # TypeScript 型別定義
```

---

## 📋 頁面說明

| 路徑                 | 頁面     | 說明                             |
| -------------------- | -------- | -------------------------------- |
| `/login`             | 登入頁   | 帳號密碼登入，登入後導向活動列表 |
| `/activity`          | 活動列表 | 顯示活動清單，支援分頁與狀態管理 |
| `/activity/create`   | 新增活動 | 填寫表單建立新活動               |
| `/activity/:id/edit` | 編輯活動 | 依 ID 載入活動資料並編輯         |
| `*`                  | 404 頁面 | 未知路徑導向 NotFound 頁         |

---

## 🔐 路由守衛

- `requiresAuth`：未登入時自動導向 `/login`
- `ifLogin`：已登入時自動導向 `/activity`，避免重複進入登入頁

---

## ⚙️ 安裝與啟動

```sh
# 安裝依賴
npm install
```

```sh
# 啟動開發伺服器
npm run dev
```

```sh
# 型別檢查並建置正式版本
npm run build
```

```sh
# 執行單元測試
npm run test:unit
```

```sh
# 執行 ESLint 程式碼檢查
npm run lint
```

---

## 📝 備註

- 本專案目前使用前端模擬 API（`src/services/`），資料為靜態假資料
- 架構設計保留日後串接真實後端 RESTful API 的擴充彈性
- 登入驗證邏輯透過 Pinia（`auth.store`）統一管理
- 支援未儲存離開提示（`useUnsavedLeaveGuard`），提升使用者體驗

---

## 🛠️ 建議開發環境

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

---

## 👨‍💻 作者

- YanHua
- GitHub：[https://github.com/Yanhuabcd820](https://github.com/Yanhuabcd820)
