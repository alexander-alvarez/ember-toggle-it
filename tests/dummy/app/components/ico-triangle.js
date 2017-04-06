import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'svg',
  classNames: ['ico-triangle'],
  attributeBindings: ['height', 'width'],
  height: 120,
  width: 120
})
