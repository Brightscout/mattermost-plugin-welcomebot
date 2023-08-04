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

export type GroupType = {
    label: string;
    value: string;
};

export type OptionType = {
    value: string;
    label: string;
    data: string;
};

export type Teams = {
    display_name: string;
};

export type Channels = {
    display_name: string;
    team_name: string,
};
