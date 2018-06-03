'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClient = exports.saveClient = exports.getAllClients = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var getAllClients = exports.getAllClients = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var clients;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Client.find().lean().exec();

          case 3:
            clients = _context2.sent;
            return _context2.abrupt('return', clients);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            console.log('Error', _context2.t0);
            return _context2.abrupt('return', {
              error: _context2.t0
            });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function getAllClients() {
    return _ref2.apply(this, arguments);
  };
}();

var saveClient = exports.saveClient = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
    var userExists, client, newClient;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Client.findOne({ email: data.email });

          case 3:
            userExists = _context3.sent;

            if (!userExists) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', {
              error: 'Client already exists'
            });

          case 6:
            client = new Client(data);
            _context3.next = 9;
            return client.save();

          case 9:
            newClient = _context3.sent;
            return _context3.abrupt('return', newClient);

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);

            console.log('Error', _context3.t0);
            return _context3.abrupt('return', {
              error: _context3.t0
            });

          case 17:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 13]]);
  }));

  return function saveClient(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var updateClient = exports.updateClient = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
    var client;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Client.findOneAndUpdate({ email: data.email }, {
              name: data.name
            }, { new: true });

          case 2:
            client = _context4.sent;

            if (client) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', {
              error: 'Client does not exists'
            });

          case 5:
            return _context4.abrupt('return', client);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function updateClient(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isMobilePhone = require('validator/lib/isMobilePhone');

var _isMobilePhone2 = _interopRequireDefault(_isMobilePhone);

var _isAlpha = require('validator/lib/isAlpha');

var _isAlpha2 = _interopRequireDefault(_isAlpha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;


var ClientSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    lowercase: true,
    index: true,
    validate: function validate(value) {
      return (0, _isAlpha2.default)(value);
    }
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
    validate: function validate(value) {
      return (0, _isEmail2.default)(value);
    }
  },
  phone: {
    type: Number,
    index: true,
    validate: function validate(value) {
      return (0, _isMobilePhone2.default)(value);
    }
  },
  providers: [{ type: ObjectId, ref: 'providers' }]
}, {
  collection: 'clients',
  timestamps: true
});

ClientSchema.pre('save', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next();

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var Client = _mongoose2.default.model('Client', ClientSchema);

exports.default = Client;