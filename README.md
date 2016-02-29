# Zelda

### Usage

```shell
npm install zelda-js --save
```
```javascript
const targets = require('zelda-js').targets;
const Zelda = require('zelda-js').Zelda;

const zelda = new Zelda({
  target: targets.BLANK,
  tokens: ['$token 1$', '$token 2$']
});

let linkifiedText = zelda.linkify('... text source ...');
let urls = zelda.collectLinks('... text source ...');
```

#### Options
- target : String - HTML target attribute value
- tokens : Array - list of tokens which urls contain

#### linkify(text: String)
- Convert urls in plain text to HTML ```<a>``` tags
- Handle non-standard urls (with tokens)

#### collectUrls(text: String)
- Collect urls from plain text
- Handle non-standard urls (with tokens)