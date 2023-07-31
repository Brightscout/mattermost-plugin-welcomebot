// Plugin state
const getPluginState = (state: ReduxState) => state['plugins-com.mattermost.welcomebot'];

const getApiRequestPendingState = (state: ReduxState): ApiRequestPendingState => getPluginState(state).apiRequestCompletionSlice;

export {getPluginState, getApiRequestPendingState};