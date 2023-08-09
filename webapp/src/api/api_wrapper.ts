import Cookies from 'js-cookie';

import {Channels, Teams} from 'types/plugin/common';

import Utils from 'utils';

export const fetchChannels = async (page: number, batchSize: number) => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + `/channels?exclude_default_channels=true&page=${page}&per_page=${batchSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const fetchTeams = async (page: number, batchSize: number) => {
    const authToken = 'Bearer ' + Cookies.get('MMAUTHTOKEN') || '';
    const url = Utils.getBaseUrls().mattermostApiBaseUrl + `/teams?page=${page}&per_page=${batchSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {Authentication: authToken},
    });
    return response.json();
};

export const getTeams = async (page: number, batchSize: number) => {
    const channels = await fetchChannels(page, batchSize);
    return channels;
};

export const fetchChannelsAndTeams = async () => {
    const batchSize = 20;
    let page = 0;
    const totalChannels = [];
    const totalTeams = [];
    let channels: Channels[] = [];
    let teams: Teams[] = [];
    do {
        channels = await fetchChannels(page, batchSize);
        teams = await fetchTeams(page, batchSize);

        totalChannels.push(...channels);
        totalTeams.push(...teams);

        page++;
    } while (channels.length === batchSize && teams.length === batchSize);

    return {channels: totalChannels, teams: totalTeams};
};
