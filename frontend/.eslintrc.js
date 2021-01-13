module.exports = {
  root: true,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },

  overrides: [
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
      rules: {
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'wal', style: 'camelCase' }],
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'wal', style: 'kebab-case' }]
      }
    },

    {
      files: ['*.ts'],
      extends: [],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/template/process-inline-templates'
      ],
      rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    }
  ]
};
