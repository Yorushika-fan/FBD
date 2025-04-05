module.exports = {
  types: [
    { value: ':sparkles: feat', name: '✨ feat: 新功能' },
    { value: ':bug: fix', name: '🐛 fix: 修复 Bug' },
    { value: ':memo: docs', name: '📝 docs: 文档变更' },
    {
      value: ':art: style',
      name: '🎨 style: 代码格式（不影响功能，例如空白、格式化、缺少分号等）',
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: 代码重构（既不是修复错误也不是添加功能）',
    },
    { value: ':zap: perf', name: '⚡️ perf: 改善性能的代码变更' },
    { value: ':white_check_mark: test', name: '✅ test: 添加或修正测试' },
    {
      value: ':package: build',
      name: '📦️ build: 影响构建系统或外部依赖的变更（例如：gulp、npm）',
    },
    {
      value: ':construction_worker: ci',
      name: '👷 ci: 更改持续集成文件和脚本（例如：Jenkins, Travis、Circle、Github Action 等）',
    },
    {
      value: ':wrench: chore',
      name: '🔧 chore: 其他不修改 src 或测试文件的变更',
    },
    { value: ':rewind: revert', name: '⏪️ revert: 回退先前的提交' },
  ],
  scopes: [{ name: 'ui' }, { name: 'backend' }, { name: 'api' }, { name: 'docs' }, { name: 'tests' }],
  messages: {
    type: '选择您要提交的变更类型：',
    scope: '选择此变更的范围（可选）：',
    subject: '简短描述变更（必填）：',
    body: '详细描述（可选）：',
    breaking: '此提交是否包含重大变更？如果是，请详细描述（可选）：',
    footer: '列出此变更相关的 ISSUE，例如：#31, #34（可选）：',
    confirmCommit: '您确定要提交上述内容吗？',
  },
  askForBreakingChangeFirst: true,
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  subjectLimit: 100,
};
