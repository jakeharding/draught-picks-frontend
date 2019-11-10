/**
 * jest.config.js
 *
 * Created by jake
 * Created on 11/10/19
 */

const esModules = ['@ionic'].join('|');
module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          [
            '@babel/preset-env',
            { targets: { node: true }, modules: 'commonjs' }
          ]
        ],
        plugins: ['@babel/plugin-syntax-dynamic-import']
      }
    }
  },
  transformIgnorePatterns:[
    `<rootDir>/node_modules/(?!${esModules})`
  ]
};
