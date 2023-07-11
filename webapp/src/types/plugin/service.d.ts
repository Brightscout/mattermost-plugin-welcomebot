type PluginApiServiceName = 'getMe';

type ApiErrorResponse = {
    data: {
        error: string,
    },
    status: number,
}

type PluginApiService = {
    path: string,
    method: HttpMethod,
    apiServiceName: PluginApiServiceName,
}
