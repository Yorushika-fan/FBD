export default {
  // 使用单引号代替双引号
  singleQuote: true,
  // 在对象或数组最后一个元素后面加逗号
  trailingComma: 'all',
  // 一行最大字符数，超过会自动换行
  printWidth: 120,
  // 缩进使用空格数
  tabWidth: 2,
  // 使用空格而不是制表符缩进
  useTabs: false,
  // 在语句末尾添加分号
  semi: true,
  // 在对象字面量中的括号之间打印空格
  bracketSpacing: true,
  // 箭头函数只有一个参数时是否使用括号
  arrowParens: 'always',
  // JSX 标签闭合位置
  jsxBracketSameLine: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 在对象属性中的引号之间打印空格
  quoteProps: 'as-needed',
  // 在 HTML、Vue 和 JSX 中强制每行使用一个属性
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
};
