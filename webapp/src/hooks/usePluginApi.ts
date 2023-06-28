import {useSelector} from 'react-redux';

function usePluginApi() {
    const state = useSelector((pluginState: PluginState) => pluginState);

    return {state};
}

export default usePluginApi;
