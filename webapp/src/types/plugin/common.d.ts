type Actions = {
    actionType: string,
    actionName: string,
    actionDisplayName: string,
    channelsAddedTo: string[],
    actionSuccessfullMessage: string[]
}

type Configs = {
    teamName: string,
    delayInSeconds: number,
    message: string[],
    includeGuests: string | null,
    attachmentMessage: string[] | null,
    actions: Actions[] | null
}
