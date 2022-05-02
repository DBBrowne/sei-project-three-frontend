const sassPlugin = require('esbuild-sass-plugin')
const envFilePlugin = require('esbuild-envfile-plugin')

// const envPlugin = {
//   name: 'env',
//   setup(build) {
//     // Intercept import paths called "env" so esbuild doesn't attempt
//     // to map them to a file system location. Tag them with the "env-ns"
//     // namespace to reserve them for this plugin.
//     build.onResolve({ filter: /^process.env$/ }, args => ({
//       path: args.path,
//       namespace: 'env-ns',
//     }))

//     // Load paths tagged with the "env-ns" namespace and behave as if
//     // they point to a JSON file containing the environment variables.
//     build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
//       contents: JSON.stringify(process.env),
//       loader: 'json',
//     }))
//   },
// }
// const define = {}

// for (const key in process.env) {
//   define[`process.env.${key}`] = JSON.stringify(process.env[key])
// }
// console.log(define)
// const path = require('path')
// const fs = require('fs')
// const dotenv = require('dotenv')

// function _findEnvFile(dir) {
//   if (!fs.existsSync(dir))
//     return false
//   const filePath = `${dir}/.env`
//   if ((fs.existsSync(filePath))) {
//     return filePath
//   } else {
//     return _findEnvFile(path.resolve(dir, '../'))
//   }
// }

// async function getEnvData () {
//   // read in .env file contents and combine with regular .env:
//   const data = await fs.promises.readFile(
//     _findEnvFile('./')
//     , 'utf8')
//   const buf = Buffer.from(data)
//   const config = dotenv.parse(buf)

//   return ({
//     contents: JSON.stringify( { ...process.env, ...config }),
//     loader: 'json',
//   })
// }

// const envVars = getEnvData()
const dotenv = require('dotenv')
dotenv.config()

const define = {}
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}
// console.log(define)

require('esbuild').build({
  plugins: [sassPlugin.sassPlugin(),envFilePlugin],
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: 'esBuild/static',
  loader: { '.js': 'jsx' },
  // minify: true,
  define,
  sourcemap: true,
}).then(()=>{
  console.log('Build Succeeded')
}).catch(() => process.exit(1))