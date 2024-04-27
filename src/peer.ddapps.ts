
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

export class LPeer extends Peer<
  ILRequestPayload,
  ILResponsePayload,
  ILMPayload,
  ILState
> {

  protected async [ELMType.AnswerChatMessage](message: LM<ELMType.AnswerChatMessage>) {

    const key = Deno.env.get('OPENAI_API_KEY') || 'NO_KEY_FOUND'
      
      // Implement your second handler here
      const openai = new OpenAI({ apiKey: key });
      
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message.payload }],
        model: 'gpt-3.5-turbo',
      });


      this.response(
        ELOpType.SendChatMessage,
        chatCompletion.choices[0].message.content || 'No response found'
      )
  }
}
