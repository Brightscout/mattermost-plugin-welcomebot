type ApiRequestCompletionState = {
    requests: PluginApiServiceName[];
}

type GlobalModalState = {
    modalId: ModalId;
    commandArgs: Array<string>;
}

type WebsocketEventState = {
    isConnected: boolean;
};

type ViewConfigModalState = {
    isVisible: boolean;
};

type PluginState = {
    'plugins-com.mattermost.welcomebot': RootState<{ [x: string]: QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, WellList[], 'pluginState'>; }, never, 'pluginState'>
}