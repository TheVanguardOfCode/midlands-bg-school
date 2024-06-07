// .mocharc.mjs

export default {
  require: [
    './test/setup.mjs'
  ],
  extension: ['js'],
  spec: 'src/test/**/*.test.js',
  recursive: true,
  timeout: 5000
};
