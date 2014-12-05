'use strict';

import React from 'react/addons';
import assign from 'react/lib/Object.assign';
import $ from 'jquery';

var ObjectFitCover = React.createClass({

  getInitialState() {
    return {};
  },

  getDefaultProps() {
    return {
      style: {},
    };
  },

  propTypes: {
    object: React.PropTypes.element.isRequired,
    objectAspectRatio: React.PropTypes.number.isRequired,
  },

  componentDidMount() {
    this.$container = $(this.getDOMNode());
    this.resize();
    $(window).on('resize', this.resize);
  },

  componentDidUnmount() {
    $(window).off('resize', this.resize);
  },

  /**
   * Compute and set object dimensions using container dimensions and ratio
   */
  resize() {
    var {height: containerHeight, width: containerWidth} = this.containerDimensions();
    var containerRatio = containerWidth / containerHeight;
    var objectRatio = this.props.objectAspectRatio;

    var objectHeight, objectWidth, objectX, objectY;

    if (objectRatio > containerRatio) {
      objectHeight = containerHeight;
      objectWidth = objectHeight * objectRatio;

      objectY = 0;
      objectX = (containerWidth - objectWidth) / 2;
    }
    else {
      objectWidth = containerWidth;
      objectHeight = objectWidth / objectRatio;

      objectX = 0;
      objectY = (containerHeight - objectHeight) / 2;
    }

    this.setState({objectHeight, objectWidth, objectX, objectY});
  },

  containerDimensions() {
    return {
      height: this.$container.outerHeight(),
      width: this.$container.width(),
    };
  },

  render() {
    var style = assign({}, {
      overflow: 'hidden',
    }, this.props.style);

    var objectStyle = {
      position: 'absolute',
      left: this.state.objectX,
      top: this.state.objectY,
      width: this.state.objectWidth,
      height: this.state.objectHeight,
    };

    var object = React.addons.cloneWithProps(this.props.object, {
      style: objectStyle,
    });

    return (
      <div {...this.props} style={style}>
        {object}
      </div>
    );
  }

});

export default ObjectFitCover;
