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

zelda.linkify('... text source ...');
```