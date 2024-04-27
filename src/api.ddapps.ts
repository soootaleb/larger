
import { Api } from "ddapps/api.ts";
import { EMType } from "ddapps/messages.ts";
import { M } from "ddapps/type.ts";
import { ILState } from "./interface.ddapps.ts";
import { ELMType, ILMPayload } from "./messages.ddapps.ts";
import {
  ELOpType,
  ILRequestPayload,
  ILResponsePayload,
} from "./operations.ddapps.ts";
import { LM } from "./type.ddapps.ts";
import { LPeer } from "./peer.ddapps.ts";

export class LApi extends Api<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload,
  ILState
> {
  protected override [EMType.ClientRequest](message: M<EMType.ClientRequest> | LM<EMType.ClientRequest>) {
    super.ClientRequest(message as M<EMType.ClientRequest>);
    switch (message.payload.type) {
      case ELOpType.SendChatMessage:
        this.send(
          ELMType.AnswerChatMessage,
          message.payload.payload as ILMPayload[ELMType.AnswerChatMessage],
          LPeer
        )
        break;
      default:
        this.response(ELOpType.LError, "Unknown operation")
        break;
    }
  }
}
