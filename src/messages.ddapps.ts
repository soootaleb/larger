
import { ILRequestPayload, ILResponsePayload } from "./operations.ddapps.ts"
import { EMType, IMPayload } from "ddapps/messages.ts"
import { LM } from "./type.ddapps.ts";
import { M } from "ddapps/type.ts";

/**
 * List of Messages available. Use it for a stronger typing.
 */
export enum ELMType {

  AnswerChatMessage = "AnswerChatMessage"
}

/**
 * Type the payload of your messages
 */
export interface ILMPayload extends IMPayload<ILRequestPayload, ILResponsePayload> {

  [ELMType.AnswerChatMessage]: M<EMType.ClientRequest> | LM<EMType.ClientRequest>;
}
