
import { Peer } from "ddapps/peer.ts";
import { ELMType, ILMPayload } from "./messages.ddapps.ts";
import { LM } from "./type.ddapps.ts";
import {
ELOpType,
  ILRequestPayload,
  ILResponsePayload,
} from "./operations.ddapps.ts";
import { ILState } from "./interface.ddapps.ts";
import OpenAI from 'https://deno.land/x/openai@v4.38.3/mod.ts';
import { EMType } from "ddapps/messages.ts";
import { M } from "ddapps/type.ts";
import { IClientRequest } from "ddapps/operation.ts";
import { EComponent } from "ddapps/enumeration.ts";

export class LPeer extends Peer<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload,
  ILState
> {

  private histories: {
    [key: string]: {
      role: 'user' | 'assistant',
      content: string
    }[]
  } = {}

  protected async [ELMType.AnswerChatMessage](message: M<EMType.ClientRequest> | LM<EMType.ClientRequest>) {

    const key = Deno.env.get('OPENAI_API_KEY') || 'NO_KEY_FOUND'

    if (!this.histories[message.source]) {
      this.histories[message.source] = []
    }

    const cmessage = message.payload.payload as IClientRequest    

    this.histories[message.source].push({
      role: 'user',
      content: cmessage.payload as string
    })

    const history = this.histories[message.source] || []
      
    // Implement your second handler here
    const openai = new OpenAI({ apiKey: key });

    this.send(
      EMType.LogMessage,
      {
        message: 'History',
        detail: history
      },
      EComponent.Logger
    )
    
    const chatCompletion = await openai.chat.completions.create({
      messages: history,
      model: 'gpt-3.5-turbo',
    });

    this.histories[message.source].push({
      role: chatCompletion.choices[0].message.role,
      content: chatCompletion.choices[0].message.content || ''
    })


    this.response(
      ELOpType.SendChatMessage,
      chatCompletion.choices[0].message.content || 'No response found'
    )
  }
}
