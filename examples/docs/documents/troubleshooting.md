# Trouble Shoot

## No image When SSR (Server Side Rendering)

- Change url hosting image.
```js
useBook({isbn: xxx, isssl: true})
```

### If don't know ISBN existing on Amazon.

- `useBook` will check if the same ISBN exists before and after
```js
useBook({isbn: xxx, seach: 10})
```
