
import { Client } from "ddapps/client.ts";
import { ILMPayload } from "./messages.ddapps.ts";
import {
  ELOpType,
  ILRequestPayload,
  ILResponsePayload,
} from "./operations.ddapps.ts";

export class LClient extends Client<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload
> {

  public sendChatMessage(message: string) {
    return this.send(ELOpType.SendChatMessage, message);
  }
}
