import {
  Operation,
  TRPCClientError,
  TRPCWebSocketClient,
  WebSocketClientOptions,
} from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { Observer, UnsubscribeFn } from "@trpc/server/observable";

import {
  JSONRPC2,
  TRPCErrorResponse,
  TRPCResultMessage,
} from "@trpc/server/unstable-core-do-not-import";

const resultOf = <T>(val: any): T => {
  return typeof val == "function" ? (val as () => T)() : val;
};
type Connection = {
  id: number;

  ws?: WebSocket;
} & (
  | {
      state: "open";
      ws: WebSocket;
    }
  | {
      state: "closed";
      ws: WebSocket;
    }
  | {
      state: "connecting";
      ws?: WebSocket;
    }
);
// export class PhoenixWsClient implements TRPCWebSocketClient {
//   ws: WebSocket | undefined;

//   constructor(opts: WebSocketClientOptions) {
//     const url = resultOf<string>(opts.url);
//     this.ws = new WebSocket(url);
//     this.ws.onclose = (ev: CloseEvent) => {
     
//     }

//     this.connection = null;
//   }
//   request: (opts: { op: Operation; callbacks: Observer<{ id: JSONRPC2.RequestId; } & (TRPCErrorResponse<any> | TRPCResultMessage<unknown>), TRPCClientError<AnyRouter>>; lastEventId: string | undefined; }) => UnsubscribeFn;
//   connection: Connection | null;

//   close() {}

//   reconnect() {}
// }
