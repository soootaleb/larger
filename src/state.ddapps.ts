
import { of } from "ddapps/state.ts";
import { ILState } from "./interface.ddapps.ts";
import { ILRequestPayload, ILResponsePayload } from "./operations.ddapps.ts";
import { ILMPayload } from "./messages.ddapps.ts";

export const state: ILState = {
  ...of<ILRequestPayload, ILResponsePayload, ILMPayload>(),
};
