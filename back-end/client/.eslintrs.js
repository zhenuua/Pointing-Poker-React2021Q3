module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:eslint-comments/recommended',
    // 'prettier/@typescript-eslint',
    // 'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: ['*.config.js', 'node_modules/', 'build/'],
  rules: {
    'no-control-regex': 0,
    'no-plusplus': 'off',
    'no-console': 'warn',
    'max-len': ['warn', { 'code': 120 }],
    'indent': ['warn', 2, {
      'SwitchCase': 1
    }],
    '@typescript-eslint/indent': ['warn', 2, {
      'SwitchCase': 1
    }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', {
      'props': false
    }],
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  }
}