/*:: export type CustomEmoji = {|
    id: string,
    create_at: number,
    update_at: number,
    delete_at: number,
    creator_id: string,
    name: string,
|}*/

/*:: export type SystemEmoji = {|
    id: string,
    name: string,
    filename: string,
    aliases: Array<string>,
    category: string,
    batch: number,
|}*/

/*:: export type Emoji = SystemEmoji | CustomEmoji;*/

/*:: export type EmojisState = {|
    customEmoji: {
        [string]: CustomEmoji
    },
    nonExistentEmoji: Set<string>
|};*/
"use strict";