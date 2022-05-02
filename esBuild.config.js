const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

const dotenv = require('dotenv')
dotenv.config()

const define = {}
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}

esbuild.build({
  plugins: [sassPlugin()],
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: 'esBuild/static',
  loader: { '.js': 'jsx' },
  inject: ['esBuild_reactShim.js'],
  minify: true,
  define,
}).then(function () {
  console.log('Build Succeeded')
}).catch(function () {
  process.exit(1)
})