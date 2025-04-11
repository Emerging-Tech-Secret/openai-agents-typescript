/**
 * OpenAI model provider
 */

import { OpenAI } from 'openai';
import { ModelProvider, Model } from './interface';
import { OpenAIChatCompletionsModel } from './openaiChatCompletions';
import { OpenAIResponsesModel } from './openaiResponses';

/**
 * OpenAI model provider
 */
export class OpenAIProvider implements ModelProvider {
  /**
   * The OpenAI client
   */
  client: OpenAI;
  
  /**
   * Create a new OpenAI model provider
   */
  constructor(client: OpenAI) {
    this.client = client;
  }
  
  /**
   * Get a model
   */
  getModel(modelName: string): Model {
    return new OpenAIChatCompletionsModel(this.client);
  }
}
