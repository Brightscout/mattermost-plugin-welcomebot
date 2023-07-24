export const getRhsState = (state: ReduxState): {isSidebarOpen: boolean} => state.views.rhs;

// Plugin state
const getPluginState = (state: ReduxState) => state['plugins-mattermost-plugin-welcomebot'];

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;
