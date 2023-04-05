const path = require('path')
// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

module.exports = {

  set: {
    http() {
      return [
        {
          method: 'get',
          path: '/_styleguide/cheatsheet',
          src: path.join(__dirname, 'src', 'routes'),
          config: {
            // shared: false,
            views: true,
          }
        },
      ]
    }

  }
}


