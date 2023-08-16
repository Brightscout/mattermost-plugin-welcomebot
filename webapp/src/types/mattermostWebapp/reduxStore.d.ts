type PluginState = RootState<{ [x: string]: QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, void, 'pluginApi'>; }, never, 'pluginApi'>

type ReduxState = {
    'plugins-com.mattermost.welcomebot': PluginState

    // PluginState: 'plugins-com.mattermost.welcomebot'
}

type ApiRequestPendingState = {
    pending: boolean;
};
