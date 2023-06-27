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