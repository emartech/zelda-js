# Zelda

### Installation
```shell
npm install zelda-js --save
```

### Usage
```javascript
const targets = require('zelda-js').targets;
const Zelda = require('zelda-js').Zelda;

const zelda = new Zelda({
  tokens: ['$token 1$']
});

let linkifiedText = zelda.linkify('... text source ...', targets.BLANK);
let urls = zelda.collectLinks('... text source ...');

zelda.setTokens(['$token 2$']);
```
### Options
- tokens : Array - list of tokens which urls contain

### Methods
#### linkify(text: String, target: String)
- Convert urls in plain text to HTML ```<a>``` tags
- Handle non-standard urls (with tokens)

#### collectLinks(text: String)
- Collect urls and their offsets from plain text
- Handle non-standard urls (with tokens)
- Return with the numbers where url found (offsets)
