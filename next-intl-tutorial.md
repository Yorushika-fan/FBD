# 🌍 Next-intl：给你的 Next.js 项目添加国际化

> 作者：AI Assistant | 发布日期：2024年3月

在当今全球化的互联网环境中，为你的网站添加多语言支持已经成为一个基本需求。Next.js 作为最流行的 React 框架之一，提供了多种国际化解决方案。今天，我们将重点介绍 `next-intl` - 一个优雅、功能强大的国际化库。

## 📋 目录

- [为什么选择 next-intl？](#为什么选择-next-intl)
- [快速开始](#快速开始)
- [配置详解](#配置详解)
- [使用指南](#使用指南)
- [高级特性](#高级特性)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 为什么选择 next-intl？

`next-intl` 是一个专门为 Next.js 设计的国际化库，它提供了以下优势：

- 🚀 开箱即用的 Next.js 13+ 支持
- 📦 轻量级且高性能
- 🔄 支持服务端和客户端渲染
- 🎨 优雅的 API 设计
- 📝 支持复数、日期、数字格式化
- 🔍 类型安全（TypeScript 支持）

## 快速开始

### 1. 安装依赖

```bash
npm install next-intl
# 或
yarn add next-intl
# 或
pnpm add next-intl
```

### 2. 创建语言文件

在项目根目录创建 `messages` 文件夹，并添加语言文件：

```typescript
// messages/en.json
{
  "Index": {
    "title": "Welcome to my website",
    "description": "This is a multilingual website"
  }
}

// messages/zh.json
{
  "Index": {
    "title": "欢迎访问我的网站",
    "description": "这是一个多语言网站"
  }
}
```

### 3. 配置 Next.js

在 `next.config.js` 中添加配置：

```javascript
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // 其他 Next.js 配置
});
```

### 4. 创建中间件

创建 `middleware.ts` 文件：

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

## 配置详解

### 语言配置

在 `next.config.js` 中，你可以配置：

```javascript
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // 可选：'always', 'as-needed', 'never'
});
```

### 路由配置

`next-intl` 支持两种路由模式：

1. **子路径模式** (默认)

   - 英文：`/en/about`
   - 中文：`/zh/about`

2. **域名模式**
   - 英文：`en.example.com`
   - 中文：`zh.example.com`

## 使用指南

### 在页面中使用

```typescript
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 在组件中使用

```typescript
import { useTranslations } from 'next-intl';

export const Button = () => {
  const t = useTranslations('Button');

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {t('submit')}
    </button>
  );
};
```

### 格式化日期和数字

```typescript
import { useFormatter } from 'next-intl';

export function DateDisplay() {
  const format = useFormatter();
  const date = new Date();

  return (
    <div>
      <p>{format.dateTime(date, { dateStyle: 'full' })}</p>
      <p>{format.number(1234.56, { style: 'currency', currency: 'USD' })}</p>
    </div>
  );
}
```

## 高级特性

### 1. 动态导入语言文件

```typescript
import { useMessages } from 'next-intl';

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
```

### 2. 语言切换器

```typescript
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={locale === 'en' ? 'font-bold' : ''}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('zh')}
        className={locale === 'zh' ? 'font-bold' : ''}
      >
        中文
      </button>
    </div>
  );
}
```

### 3. 嵌套翻译

```json
{
  "User": {
    "Profile": {
      "title": "User Profile",
      "settings": {
        "notifications": "Notification Settings"
      }
    }
  }
}
```

使用：

```typescript
const t = useTranslations('User.Profile');
t('title'); // "User Profile"
t('settings.notifications'); // "Notification Settings"
```

## 最佳实践

1. **组织语言文件**

   - 按功能模块组织翻译文件
   - 使用嵌套结构提高可维护性
   - 保持键名的一致性

2. **性能优化**

   - 使用动态导入减少初始加载
   - 实现语言文件的懒加载
   - 考虑使用 CDN 缓存语言文件

3. **开发流程**
   - 使用 TypeScript 确保类型安全
   - 实现自动化测试
   - 建立翻译审查流程

## 常见问题

### Q: 如何处理动态内容？

A: 使用参数化翻译：

```json
{
  "Welcome": "Welcome, {name}!"
}
```

```typescript
t('Welcome', { name: 'John' });
```

### Q: 如何添加新语言？

A: 只需在配置中添加新的语言代码并创建对应的翻译文件：

```javascript
// next.config.js
locales: ['en', 'zh', 'ja', 'ko'];
```

### Q: 如何处理 RTL 语言？

A: `next-intl` 支持 RTL 语言，可以通过 CSS 或 Tailwind 的 `dir` 属性实现：

```typescript
<div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  {/* 内容 */}
</div>
```

## 结语

`next-intl` 为 Next.js 项目提供了强大而优雅的国际化解决方案。通过本文的介绍，你应该已经掌握了基本的使用方法和最佳实践。记住，国际化不仅仅是翻译文本，还包括日期、数字、货币等格式的处理，以及 RTL 支持等文化差异的考虑。

希望这篇教程能帮助你顺利实现项目的国际化！如果你有任何问题，欢迎在评论区留言讨论。

---

> 版权声明：本文采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议进行许可。
