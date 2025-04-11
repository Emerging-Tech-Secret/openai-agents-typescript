/**
 * Interfaces for models
 */

import { RunItem } from '../items';

/**
 * Interface for model tracing
 */
export interface ModelTracing {
  /**
   * Start a trace
   */
  startTrace(): Promise<void>;
  
  /**
   * End a trace
   */
  endTrace(): Promise<void>;
}

/**
 * Interface for model providers
 */
export interface ModelProvider {
  /**
   * Get a model
   */
  getModel(modelName: string): Model;
}

/**
 * Interface for models
 */
export interface Model {
  /**
   * Generate a response
   */
  generate(
    messages: any[],
    options?: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
      frequencyPenalty?: number;
      presencePenalty?: number;
      tools?: any[];
      responseFormat?: any;
    }
  ): Promise<RunItem[]>;
  
  /**
   * Stream a response
   */
  streamGenerate(
    messages: any[],
    options?: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
      frequencyPenalty?: number;
      presencePenalty?: number;
      tools?: any[];
      responseFormat?: any;
    }
  ): AsyncGenerator<RunItem>;
}
