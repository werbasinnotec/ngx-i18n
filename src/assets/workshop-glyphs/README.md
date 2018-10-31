# workshop-glyphs
The vector graphics and created fonts (icons) for werbasinnotec webproject.

## Structure

### svg-icons
is the folder containing all the original vector graphics in SVG-Format.

### rendered
is the folder which contains the complete results from https://icomoon.io/app/ which is used to render the fonts as 
- svg
- wof
- eot
- ttf

## What's included?
clone this repo and open the file `rendered/demo.html` in your webbrowser to get all glyphs listed with their css class-names.

## Useage
1. Download the fonts from https://github.com/werbasinnotec/workshop-glyphs/tree/master/rendered/fonts and place it into a folder of your webproject called `font`.
2. Download the stylesheet from https://github.com/werbasinnotec/workshop-glyphs/blob/master/rendered/style.css.
3. link to the stylesheet from your website: eg. like this:
```
...
<head>
  ...
  <link rel="stylesheet" href="style.css">
</head>
...
```
4. Add your fonts at the desired places inside your html-code eg. via
`<span class="icon-sparkplug"></span>`
to add the icon of a spark plug.
5. As long as the font is monochrome, it will adapt your color-settings from your own css. Eg. if you have hyperlinks in blue, these glyphs will get blue es well, if their span is inside a hyperlink-tag. 
