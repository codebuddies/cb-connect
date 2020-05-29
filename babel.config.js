module.exports = {
  // Allows Jest to use ES6 syntax and read JSX
  presets: ['@babel/preset-env', '@babel/react'],
  plugins: [
    // Allows for class properties in React Components to be transpiled
    ['@babel/plugin-proposal-class-properties'],

    // Defines file paths to make import statements shorter;
    // Avoids things like `import from ../../../`
    [
      'module-resolver',
      {
        root: './',
        alias: {
          lib: './lib',
          components: './client/components',
          pages: './client/pages',
        },
      },
    ],
  ],
};
