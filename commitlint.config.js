const config = {
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'subject-empty': [0, 'never'], // 0表示禁用此规则
    'type-empty': [0, 'never'], // 0表示禁用此规则
  },
};
export default config;
