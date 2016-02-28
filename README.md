# Zelda

### Usage

```shell
npm install zelda-js --save
```
```javascript
const Zelda require('zelda-js');

const zelda = new Zelda({
  target: '_blank',
  tokens: ['$token 1$', '$token 2$']
});

zelda.linkify('... text source ...');
```