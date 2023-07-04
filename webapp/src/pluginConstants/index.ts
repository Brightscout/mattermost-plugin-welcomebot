import {
    HEADER_CSRF_TOKEN,
    MMCSRF,
} from './common';

import {error} from './messages';

import {pluginApiServiceConfigs} from './apiService';

export default {
    common: {
        HEADER_CSRF_TOKEN,
        MMCSRF,
    },
    messages: {
        error,
    },
    pluginApiServiceConfigs,
};
