
###under development
Some configurations should be considered.
1. a menu item, can enable or disable autofill.
2. container font-family.
3. global property name for preload.js
4. listen with `click` or customEvent.

```js
// for test
localforage.setItem('password', [{username: '', password: ''},{username: '', password: ''}]);
localforage.setItem('card', [
  {nameOnCard: 'Randy Mayoral', cardNumber: '4261 5790 7998 2970', expirationDate: '10/26', securityCode: '333'},
  {nameOnCard: 'Laine Catt', cardNumber: '4416 8240 4467 0787', expirationDate: '07/23',securityCode: '496'}
]);
```
