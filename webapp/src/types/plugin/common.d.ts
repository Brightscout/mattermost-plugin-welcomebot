export type Actions = {
    actionType: string,
    actionName: string,
    actionDisplayName: string,
    channelsAddedTo: string[],
    actionSuccessfullMessage: string[]
}

export type Configs = {
    teamName: string,
    delayInSeconds: number,
    message: string[],
    includeGuests: string | null,
    attachmentMessage: string[] | null,
    actions: Actions[] | null
}

type GroupType = {
    label: string;
    value: string;
};

type OptionType = {
    value: string;
    label: string;
};