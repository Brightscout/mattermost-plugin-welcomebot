"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _channels = _interopRequireDefault(require("./channels"));

var _files = _interopRequireDefault(require("./files"));

var _general = _interopRequireDefault(require("./general"));

var _posts = _interopRequireDefault(require("./posts"));

var _teams = _interopRequireDefault(require("./teams"));

var _users = _interopRequireDefault(require("./users"));

var _preferences = _interopRequireDefault(require("./preferences"));

var _integrations = _interopRequireDefault(require("./integrations"));

var _admin = _interopRequireDefault(require("./admin"));

var _jobs = _interopRequireDefault(require("./jobs"));

var _search = _interopRequireDefault(require("./search"));

var _roles = _interopRequireDefault(require("./roles"));

var _schemes = _interopRequireDefault(require("./schemes"));

var _groups = _interopRequireDefault(require("./groups"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var _default = (0, _redux.combineReducers)({
  channels: _channels.default,
  files: _files.default,
  general: _general.default,
  posts: _posts.default,
  teams: _teams.default,
  users: _users.default,
  preferences: _preferences.default,
  integrations: _integrations.default,
  admin: _admin.default,
  jobs: _jobs.default,
  search: _search.default,
  roles: _roles.default,
  schemes: _schemes.default,
  groups: _groups.default
});

exports.default = _default;