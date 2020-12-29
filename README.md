# r-react-keyboard
### Instalation
```javascript
npm i r-react-keyboard
```


Prop          | Type             | Default       | Description
------------- | ---------------- | ------------- |---------------------------------
value         | String or Number | Optional      | init value of keyboard
title         | String           | Optional      | keyboard title
onClose       | function         | Required      | call to close keyboard by parent
theme         | object           | has default   | change them color of keyboard
gap           | number           | default is 3  | gap between keys
keyHeight     | number           | default is 36 | height of keys
onSend        | function         | optional      | send final value to parent
onchange      | function         | optional      | send value to parent while typing
languages     | object           | optional      | set extra languages to keyboard
languageIndex | number           | optioanl      | set extra language by index

### theme properties
Property         | Default   | Description
---------------- | --------- | -----------
background       | '#c9ced4' | 
keyBackground    | '#fff'    |
keyColor         | '#28292b' |
keyActiveColor   | '#1d5ee4' |
keyBoxShadow     |           | example: '0 1px 2px 0px #000'
screenColor      | '#666'    |
screenBackground | '#eee'    |
titleColor       | '#000'    |
highlight        | '#7fb9ef' |
