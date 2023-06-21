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
  UPLOAD_FILES_REQUEST: null,
  UPLOAD_FILES_SUCCESS: null,
  UPLOAD_FILES_FAILURE: null,
  UPLOAD_FILES_CANCEL: null,
  RECEIVED_FILES_FOR_POST: null,
  RECEIVED_UPLOAD_FILES: null,
  RECEIVED_FILE_PUBLIC_LINK: null
});

exports.default = _default;