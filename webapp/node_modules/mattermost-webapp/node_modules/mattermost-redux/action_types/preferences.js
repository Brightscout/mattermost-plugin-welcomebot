"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _key_mirror = _interopRequireDefault(require("../utils/key_mirror"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// @flow
var _default = (0, _key_mirror.default)({
  MY_PREFERENCES_REQUEST: null,
  MY_PREFERENCES_SUCCESS: null,
  MY_PREFERENCES_FAILURE: null,
  SAVE_PREFERENCES_REQUEST: null,
  SAVE_PREFERENCES_SUCCESS: null,
  SAVE_PREFERENCES_FAILURE: null,
  DELETE_PREFERENCES_REQUEST: null,
  DELETE_PREFERENCES_SUCCESS: null,
  DELETE_PREFERENCES_FAILURE: null,
  RECEIVED_PREFERENCES: null,
  RECEIVED_ALL_PREFERENCES: null,
  DELETED_PREFERENCES: null
});

exports.default = _default;