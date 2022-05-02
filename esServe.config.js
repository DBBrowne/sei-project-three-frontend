const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

const dotenv = require('dotenv')
dotenv.config()

const define = {}
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}

esbuild.serve({
  servedir: 'esBuild',
},{
  plugins: [sassPlugin()],
  entryPoints: ['src/index.js'],
  bundle: true,
  outdir: 'esBuild/static',
  loader: { '.js': 'jsx' },
  sourcemap: true,
  define,
  inject: ['esBuild_reactShim.js'],
}).then(function (result) {
  console.log(result)
})