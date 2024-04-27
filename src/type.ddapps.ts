
import { M } from "ddapps/type.ts";
import { ILRequestPayload, ILResponsePayload } from "./operations.ddapps.ts";
import { ILMPayload } from "./messages.ddapps.ts";

// Use it to type the incoming message in your handlers
export type LM<T extends keyof ILMPayload> = M<
  T,
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload
>;
