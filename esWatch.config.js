const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

const dotenv = require('dotenv')
dotenv.config()

const define = {}
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}

const watch = {
  onRebuild(error, result) {
    const timestamp = (new Date).toLocaleTimeString()

    if (error || result.warning) {
      // esbuild handles build failure messages well enough.
      // a full stack report can be displayed by uncommenting:
      // console.error('watch build failed:', error)
      console.log(`[${timestamp}] Watch build failed.`)
      return
    }

    console.clear()
    console.log('Watching...')
    console.log(`[${timestamp}] Watch build succeeded.`)
  },
}
console.clear()
esbuild.build({
  plugins: [sassPlugin()],
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: 'esBuild/static',
  loader: { '.js': 'jsx' },
  minify: true,
  define,
  sourcemap: true,
  inject: ['esBuild_reactShim.js'],
  incremental: true,
  watch,
}).catch(function(){
  process.exit(1)
}).then(function (){
  console.log('Watching...')
})