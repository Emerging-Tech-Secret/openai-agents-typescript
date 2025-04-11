/**
 * Settings for the model used by an agent
 */
export class ModelSettings {
  /**
   * The model to use
   */
  model: string;
  
  /**
   * The temperature to use for the model
   */
  temperature: number;
  
  /**
   * The maximum number of tokens to generate
   */
  maxTokens?: number;
  
  /**
   * The top_p value to use for the model
   */
  topP?: number;
  
  /**
   * The frequency penalty to use for the model
   */
  frequencyPenalty?: number;
  
  /**
   * The presence penalty to use for the model
   */
  presencePenalty?: number;
  
  /**
   * Create new model settings
   */
  constructor({
    model = 'gpt-4o',
    temperature = 0.7,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
  }: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  } = {}) {
    this.model = model;
    this.temperature = temperature;
    this.maxTokens = maxTokens;
    this.topP = topP;
    this.frequencyPenalty = frequencyPenalty;
    this.presencePenalty = presencePenalty;
  }
}
