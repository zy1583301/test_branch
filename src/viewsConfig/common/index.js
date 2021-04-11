let views = {}

const files = require.context('./', true, /\.js$/)
files.keys().forEach(key => {
    if (key === './index.js') return

    const name = key.replace(/\.\/|\.js/g, '')
    views[name] = files(key).default
})

export default views