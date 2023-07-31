import {useSelector} from 'react-redux';

function usePluginApi() {
    const pluginState = useSelector((state: ReduxState) => state['plugins-com.mattermost.welcomebot']);
    console.log('abbas   ', pluginState);
    return {pluginState};
}

export default usePluginApi;
