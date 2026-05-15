# Todo 打卡系统

一个简洁美观的任务打卡应用，使用 Next.js 14 和 TypeScript 构建，帮助你记录和追踪每日任务完成情况。

## 功能特点

- ✅ 添加新任务
- ✅ 点击复选框打卡完成任务
- ✅ 查看任务统计（总任务、已完成、待完成）
- ✅ 进度条可视化展示
- ✅ 记录任务创建和完成时间
- ✅ 删除任务
- ✅ 本地存储（localStorage），数据不会丢失

## 技术栈

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- LocalStorage 数据存储

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
npm run dev
```

应用将在 http://localhost:3000 打开

### 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

1. 在输入框中输入任务内容
2. 点击"添加"按钮或按回车键添加任务
3. 点击任务左侧的复选框完成打卡
4. 悬停在任务上可以看到删除按钮
5. 所有数据会自动保存到浏览器本地存储中

## 项目结构

```
smart-checkin-app/
├── public/
├── src/
│   └── app/
│       ├── globals.css       # 全局样式
│       ├── layout.tsx        # 根布局
│       └── page.tsx          # 主页面
├── package.json
├── tsconfig.json
└── README.md
```

## 特性说明

### TypeScript 类型安全
完整的类型定义，包括 Task 接口和所有函数参数类型

### Next.js App Router
使用最新的 Next.js 14 App Router 架构

### LocalStorage 持久化
数据自动保存到浏览器本地存储，刷新不丢失
