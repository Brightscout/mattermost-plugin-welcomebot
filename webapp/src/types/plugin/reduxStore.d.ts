// interface ReduxState extends GlobalState {
//     views: {
//         rhs: {
//             isSidebarOpen: boolean
//         }
//     }
//     'plugins-mattermost-plugin-welcomebot': RootState<{ [x: string]: QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, void, 'examplePluginApi'>; }, never, 'examplePluginApi'>
// }

type PluginState = RootState<{ [x: string]: QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, void, 'pluginApi'>; }, never, 'pluginApi'>

type ReduxState = {
    'plugins-com.mattermost.welcomebot': PluginState
}

type ApiRequestPendingState = {
    pending: boolean;
};
