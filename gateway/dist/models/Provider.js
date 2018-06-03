'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _isAlpha = require('validator/lib/isAlpha');

var _isAlpha2 = _interopRequireDefault(_isAlpha);

var _isMongoId = require('validator/lib/isMongoId');

var _isMongoId2 = _interopRequireDefault(_isMongoId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;


var ProviderSchema = new _mongoose2.default.Schema({
  id: {
    type: ObjectId,
    unique: true,
    required: true,
    index: true,
    validate: function validate(value) {
      return (0, _isMongoId2.default)(value);
    }
  },
  name: {
    type: String,
    lowercase: true,
    index: true,
    validate: function validate(value) {
      return (0, _isAlpha2.default)(value);
    }
  }
}, {
  collection: 'providers',
  timestamps: true
});

var Provider = _mongoose2.default.model('Provider', ProviderSchema);

exports.default = Provider;