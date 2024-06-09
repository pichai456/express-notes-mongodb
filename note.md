install

- pnpm init
- pnpm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
- pnpm i express body-parser
- pnpm i mongoose

setup

- {
  "preset": ["@babel/preset-env"]
  } >> .babelrc

  "scripts": {
  "start": "node dist",
  "build": "babel src --out-dir dist"
  },>> package.json

run server

- pnpm run build && pnpm run start
