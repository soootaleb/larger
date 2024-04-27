
import { ILRequestPayload, ILResponsePayload } from "./operations.ddapps.ts"
import { ILMPayload } from "./messages.ddapps.ts"
import { IState } from "ddapps/interface.ts";

export interface ILState extends IState<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload
> {

}
