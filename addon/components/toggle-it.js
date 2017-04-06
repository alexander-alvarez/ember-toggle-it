import Ember from 'ember';
import layout from '../templates/components/toggle-it';

const { computed } = Ember;

const symbolToClass = {
  '<': 'left',
  '>': 'right',
  '^': 'up',
  'v': 'down'
};

function symbolTranslatorClosure(rtl) {
  if (rtl) {
    return (s) => {
      if (s === '>') {
        return symbolToClass['<'];
      } else if (s === '<') {
        return symbolToClass['>'];
      } else {
        return symbolToClass[s];
      }
    }
  } else {
    return (s) => symbolToClass[s];
  }
}

/**
 * Tagless component that wraps a DOM element that we want to transform visually in a logical way according to 'toggling'.
 *
 * Yields the `toggle` action, and the `class` to bind to the child element that needs to be tranformed visually.
 *
 * API:
 *
 * index: Number -- index in toggle sequence
 * toggleMode: String -- Hyphen delimited symbols representing the sequence of toggling (one of ['<', 'v', '>', '^'])
 * rtl: Boolean -- enables right-to-left translation
 * update: Function -- can be overridden to defer or prevent toggling (recieves the index of the next value in the toggle sequence)
 *
 * @class ToggleIt
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  tagName: '',
  /**
   * Current sequence index. Indexes a symbol in {{#crossLink 'ToggleIt/toggleSequence:property'}}toggleSequence{{/crossLink}}.
   *
   * @property index
   * @type Number
   */
  index: 0,

  /**
   * Hyphen delimited symbols representing the sequence of toggling.
   * Toggling is only supported in 4 directions (up, down, left, right).
   * e.g. '>-v-^-<' would toggle from right to down to up to left (and back to right).
   *
   * @property toggleMode
   * @type String
   */
  toggleMode: '<->',

  /**
   * If enabled, all left symbols will be translated to right, and vise versa.
   *
   * @property rtl
   * @type Boolean
   * @default {False}
   */
  rtl: false,

  /**
   * @method translationFunction
   * @property private
   */
  translationFunction: computed('rtl', function() {
    return symbolTranslatorClosure(this.get('rtl'));
  }),

  /**
   * @property numberOfOptions
   * @private
   * @type Number
   */
  numberOfOptions: computed.reads('toggleSequence.length'),

  /**
   * Array of characters that identify the toggle sequence
   *
   * @property toggleSequence
   * @private
   * @type Array
   */
  toggleSequence: computed('toggleMode', function() {
    return this.get('toggleMode').split('-');
  }),
  /**
   * @property direction
   * @private
   * @type String
   */
  direction: computed('index', 'toggleSequence.[]', function() {
    return this.get('translationFunction')(this.get('toggleSequence')[this.get('index')]);
  }),

  /**
   * @property directionClass
   * @private
   * @type String
   */
  directionClass: computed('direction', function() {
    return `ember-toggle-it--${this.get('direction')}`;
  }),

  /**
   *
   * @method update
   * @public
   * @param val Number Integer representing the index of the next value in the toggle sequence.
   */
  update(val) {
    this.set('index', val);
  },

  actions: {
    next() {
      const newVal = (this.get('index') + 1 ) % this.get('numberOfOptions');
      this.update(newVal);
    }
  }
});
