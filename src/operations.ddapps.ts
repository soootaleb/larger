
import { IRequestPayload, IResponsePayload } from "ddapps/operation.ts";

export enum ELOpType {
  LError = "LError",
  SendChatMessage = "SendChatMessage"
}

export interface ILRequestPayload extends IRequestPayload {
  [ELOpType.LError]: null;
  [ELOpType.SendChatMessage]: string;
}

export interface ILResponsePayload extends IResponsePayload {
  [ELOpType.LError]: string;
  [ELOpType.SendChatMessage]: string;
}
