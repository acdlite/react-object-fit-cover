react-object-fit-cover
=================

A React component that mimics `object-fit: cover`. (Like `background-size: cover`, but for any element, not just images.)

```
npm install --save react-object-fit-cover
```

Please note that this is not a polyfill; it just mimics the behavior of `object-fit: cover`.

## Usage

Pass a React element and an aspect ratio, and the element will be resized to cover the area of the containing element.

You must also give the component an explicit width and height, either by passing a `style` prop or using CSS.

```jsx

var React = require('react');
var ObjectFitCover = require('react-object-fit-cover');

var MyComponent = React.createClass({

  render() {

    var video = (
      <video>
        <source src="/url/to/video.mp4" type="video/mp4" />
      </video>
    );

    var style = {
      position: 'fixed',
      width: '100%',
      height: '100%',
    }

    return (
      <ObjectFitCover
        object={video} // This could be any element or component
        objectAspectRatio={16/9} // Correct aspect ratio is required
        style={style}
      />
    );
  }

});

```

## License
MIT
