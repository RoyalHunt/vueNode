'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = _config2.default.port;

var dev = process.env.NODE_ENV !== 'production';

(0, _connect2.default)();

var app = (0, _express2.default)();
app.use((0, _helmet2.default)());
app.use((0, _cors2.default)());
if (!dev) {
  app.use((0, _compression2.default)());
}
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev'));

app.use('/', function (req, res) {
  res.send('Wow! Works!');
});

app.listen(port, function () {
  console.log('> Ready on http://localhost:' + port);
});