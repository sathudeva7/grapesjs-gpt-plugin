# Grapesjs-gpt-plugin

[DEMO](##) https://jsfiddle.net/sathudeva7/ybjh4cwr/4/


Video Demo:
https://www.loom.com/share/061d84e2724d4ed597a9e8e1edf28aee?sid=467680a7-74a4-44cb-a322-53f53f5278f1

## Summary

- Plugin
  - Name: `grapesjs-gpt-plugin`
  - Options:
    - open_ai_key: `<OpenAI API Key>`,
    - gpt_model: `<Model of gpt>`,
    - user_content: `<small descripition about what kind of contents>`

### HTML

```html
<link
  href="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-gpt-plugin"></script>

<div id="gjs"></div>
```

### JS

```js
const editor = grapesjs.init({
  container: "#gjs",
  height: "100%",
  fromElement: true,
  storageManager: false,
  plugins: ["grapesjs-gpt-plugin"],
  pluginsOpts: {
    "grapesjs-gpt-plugin": {
      open_ai_key: "your key",
      gpt_model: "gpt-3.5-turbo",
      user_content: "give small description about",
    },
  },
});
```

### CSS

```css
body,
html {
  margin: 0;
  height: 100%;
}
```

## Download

- CDN
  - `https://unpkg.com/grapesjs-gpt-plugin`
- NPM
  - `npm i grapesjs-gpt-plugin`
- GIT
  - `git clone https://github.com/sathudeva7/grapesjs-gpt-plugin.git`

## Usage

Directly in the browser

```html
<link
  href="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-gpt-plugin.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
    container: "#gjs",
    // ...
    plugins: ["grapesjs-gpt-plugin"],
    pluginsOpts: {
      "grapesjs-gpt-plugin": {
        /* options */
      },
    },
  });
</script>
```

Modern javascript

```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-gpt-plugin';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```

## Development

Clone the repository

```sh
$ git clone https://github.com/sathudeva7/grapesjs-gpt-plugin.git
$ cd grapesjs-gpt-plugin
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```

## License

MIT
