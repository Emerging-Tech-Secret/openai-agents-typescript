/**
 * Usage tracking for the OpenAI Agents SDK
 */

/**
 * Usage information for an agent run
 */
export class Usage {
  /**
   * The number of prompt tokens used
   */
  promptTokens: number;
  
  /**
   * The number of completion tokens used
   */
  completionTokens: number;
  
  /**
   * The total number of tokens used
   */
  totalTokens: number;
  
  /**
   * Create a new usage object
   */
  constructor(promptTokens: number = 0, completionTokens: number = 0) {
    this.promptTokens = promptTokens;
    this.completionTokens = completionTokens;
    this.totalTokens = promptTokens + completionTokens;
  }
  
  /**
   * Add usage information
   */
  add(usage: Usage): void {
    this.promptTokens += usage.promptTokens;
    this.completionTokens += usage.completionTokens;
    this.totalTokens = this.promptTokens + this.completionTokens;
  }
}
