export type Actions = {
    ActionType: string,
    ActionName: string,
    ActionDisplayName: string,
    ChannelsAddedTo: string[],
    ActionSuccessfulMessage: string[]
}

export type Configs = {
    TeamName: string,
    DelayInSeconds: number,
    Message: string[],
    IncludeGuests: string | null,
    AttachmentMessage: string[] | null,
    Actions: Actions[] | null
}

export type Teams = {
    display_name: string
}

export type Channels = {
    display_name: string
}

type GroupType = {
    label: string;
    value: string;
};

type OptionType = {
    value: string;
    label: string;
};