
import { ILRequestPayload, ILResponsePayload } from "./operations.ddapps.ts"
import { IMPayload } from "ddapps/messages.ts"

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

  [ELMType.AnswerChatMessage]: string;
}
