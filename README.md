# gulp-svgicons2svgfont issue demo

Demonstration of an issue with gulp-svgicons2svgfont since v5.0.0.

When using the option `prependUnicode: true`, icon added to the source folder will have the unicode codepoint prepended in the filename automatically.

The package `svgicons2svgfont` (which `gulp-svgicons2svgfont` depends on) will take care of this file renaming, and make sure that no duplicate unicode codepoints exist.

## Example

Suppose you have the following icon files:

- `arrow-down.svg`
- `arrow-up.svg`

Running `gulp Iconfont` will rename these files to:

- `uEA01-arrow-down.svg`
- `uEA02-arrow-up.svg`

If you add a new icon file `aaa.svg` later, and re-run `gulp Iconfont`, this new icon will be renamed to `uEA03-aaa.svg`.

## Bug

This feature has been broken by [0bc1debf637f68474a44f72aa3954184494d1dbe](https://github.com/nfroidure/gulp-svgicons2svgfont/commit/0bc1debf637f68474a44f72aa3954184494d1dbe). It removed usage of the sorting logic from `svgicons2svgfont`, which makes sure that files which already *contain* the unicode codepoints will be handled first.

## To reproduce

When adding a new file `aaa.svg` and re-running `gulp Iconfont` now, the Gulp task will break with this message:

```
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: The unicode codepoint of the glyph arrow-down seems to be already used by another glyph.
```

So to reproduce, do this:

```bash
$ npm install
$ gulp Iconfont # first time, succeeds
$ cp icons/uEA01-arrow-down.svg icons/aaa.svg
$ gulp Iconfont # second time, breaks
```
