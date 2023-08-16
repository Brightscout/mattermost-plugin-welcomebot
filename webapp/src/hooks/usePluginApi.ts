import {useSelector} from 'react-redux';

function usePluginApi() {
    const pluginState = useSelector((state: ReduxState) => state['plugins-com.mattermost.welcomebot']);
    return {pluginState};
}

export default usePluginApi;
