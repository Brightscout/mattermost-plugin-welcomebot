export type Actions = {
    ActionType: string,
    ActionName: string,
    ActionDisplayName: string,
    ChannelsAddedTo: string[],
    ActionSuccessfullMessage: string[]
}

export type Configs = {
    TeamName: string,
    DelayInSeconds: number,
    Message: string[],
    IncludeGuests: string | null,
    AttachmentMessage: string[] | null,
    Actions: Actions[] | null
}
