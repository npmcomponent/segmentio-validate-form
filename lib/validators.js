
var email = require('segmentio-is-email');
var hex = require('segmentio-is-hex-color');
var hsl = require('segmentio-is-hsl-color');
var rgb = require('segmentio-is-rgb-color');
var trim = require('component-trim');
var type = require('component-type');
var url = require('segmentio-is-url');


/**
 * Required.
 */

exports.required = function (val) {
  return type(val) === 'string' ? trim(val) : val;
};


/**
 * Email addresses.
 */

exports.email = email;


/**
 * URLs.
 */

exports.url = url;


/**
 * HEX color.
 */

exports.hex = hex;


/**
 * HSL color.
 */

exports.hsla = exports.hsl = hsl;


/**
 * RGB color.
 */

exports.rgba = exports.rgb = rgb;


/**
 * Any color string.
 */

exports.color = function (val) {
  return hex(val) || hsl(val) || rgb(val);
};


/**
 * Number.
 *
 * Note: this won't work for straight up element validation since they
 * always return strings.
 */

exports.number = function (val) {
  return 'number' == typeof val;
};


/**
 * Regexp.
 *
 * @param {RegExp|String} regexp
 */

exports.regexp = function (regexp) {
  if ('string' === typeof regexp) regexp = new RegExp(regexp);
  return function (val) {
    return regexp.test(val);
  };
};


/**
 * Minimum length.
 *
 * @param {Number} length
 */

exports.min =
exports.minimum = function (length) {
  return function (val) {
    var l = val.length ? val.length : val;
    return l >= length;
  };
};


/**
 * Maximum length.
 * @param {Number} length
 */

exports.max =
exports.maximum = function (length) {
  return function (val) {
    var l = val.length ? val.length : val;
    return l <= length;
  };
};


/**
 * Validation rule that requires 1 field be equal to another
 *
 * When a string is used, it will search for an input element with that name.
 * Otherwise, it's assumed to be something that field.adapter.value will
 * recognize
 *
 * @param {String|mixed} other
 * @returns {Function}
 */

exports.equal = function (other) {
    var field = this;
    return function (val) {
      if (type(other) === 'string') {
        var el = field.form.querySelector("[name=\"" + other + "\"]");
      }
      return val === field.adapter.value(el || other);
    };
};
