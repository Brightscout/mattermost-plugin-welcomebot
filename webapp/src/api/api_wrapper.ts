import Cookies from 'js-cookie';

import Utils from 'utils';

export const getChannels = () => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + '/channels';
    return fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},

    }).then((res) => res.json());
};

export const getTeams = () => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + '/teams';
    return fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},

    }).then((res) => res.json());
};
