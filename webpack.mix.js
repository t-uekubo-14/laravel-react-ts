const mix = require('laravel-mix')

mix.webpackConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
})

mix
  .react('resources/ts/app.tsx', 'public/dist')
  .sass('resources/sass/app.scss', 'public/dist')
  .sourceMaps()
