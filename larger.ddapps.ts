
import { DDAPPS } from "ddapps/ddapps.ts";
import { state } from "./src/state.ddapps.ts";
import { ILState } from "./src/interface.ddapps.ts";
import { ILRequestPayload, ILResponsePayload } from "./src/operations.ddapps.ts";
import { ILMPayload } from "./src/messages.ddapps.ts";
import { LPeer } from "./src/peer.ddapps.ts";
import { LApi } from "./src/api.ddapps.ts";

new DDAPPS<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload,
  ILState
>().use(LPeer)
  .use(LApi)
  .run(state);
