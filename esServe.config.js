const sassPlugin = require('esbuild-sass-plugin')
const envFilePlugin = require('esbuild-envfile-plugin')

// const envPlugin = {
//   name: 'env',
//   setup(build) {
//     // Intercept import paths called "env" so esbuild doesn't attempt
//     // to map them to a file system location. Tag them with the "env-ns"
//     // namespace to reserve them for this plugin.
//     build.onResolve({ filter: /^env$/ }, args => ({
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

const dotenv = require('dotenv')
dotenv.config()

const define = {}
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}
// console.log(define)

require('esbuild').serve({
  servedir: 'esBuild',
},{
  plugins: [envFilePlugin, sassPlugin.sassPlugin()],
  entryPoints: ['src/index.js'],
  bundle: true,
  outdir: 'esBuild/static',
  loader: { '.js': 'jsx' },
  sourcemap: true,
  define,
  inject: ['esBuild_reactShim.js'],
}).then(result =>{
  console.log(result)
})