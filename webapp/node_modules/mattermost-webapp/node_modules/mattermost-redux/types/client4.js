/*:: export type logLevel = 'ERROR' | 'WARNING' | 'INFO'*/

/*:: export type GenericClientResponse = {
    response: Object,
    headers: Map<string, string>,
    data: Object,
}*/

/*:: type ErrorOffline = {|
  message: string,
  url: string
|}*/

/*:: type ErrorInvalidResponse = {|
  intl: {
    id: string,
    defaultMessage: string
  }
|}*/

/*:: type ErrorApi = {|
  message: string,
  server_error_id: string,
  status_code: number,
  url: string
|}*/

/*:: export type Client4Error = ErrorOffline | ErrorInvalidResponse | ErrorApi;*/
"use strict";