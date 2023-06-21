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
  ROLES_BY_NAMES_REQUEST: null,
  ROLES_BY_NAMES_SUCCESS: null,
  ROLES_BY_NAMES_FAILURE: null,
  ROLE_BY_NAME_REQUEST: null,
  ROLE_BY_NAME_SUCCESS: null,
  ROLE_BY_NAME_FAILURE: null,
  ROLE_BY_ID_REQUEST: null,
  ROLE_BY_ID_SUCCESS: null,
  ROLE_BY_ID_FAILURE: null,
  EDIT_ROLE_REQUEST: null,
  EDIT_ROLE_SUCCESS: null,
  EDIT_ROLE_FAILURE: null,
  RECEIVED_ROLES: null,
  RECEIVED_ROLE: null,
  ROLE_DELETED: null,
  SET_PENDING_ROLES: null
});

exports.default = _default;