module.exports = {
  extends: ['alloy', 'alloy/typescript', 'prettier'],
  plugins: ['prettier', 'import'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    node: true,
    jest: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public'
      }
    ],
    '@typescript-eslint/no-parameter-properties': ['off'],
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@nestjs/*',
            group: 'external',
            position: 'before'
          }
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['**/**.d.ts'],
      rules: {
        'spaced-comment': ['off']
      }
    }
  ]
};
