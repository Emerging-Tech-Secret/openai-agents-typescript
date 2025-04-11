/**
 * Output schemas for agents
 */

/**
 * Base class for agent output schemas
 */
export class AgentOutputSchema {
  /**
   * The type of the schema
   */
  type: string;
  
  /**
   * Create a new agent output schema
   */
  constructor(type: string) {
    this.type = type;
  }
  
  /**
   * Get the schema
   */
  getSchema(): any {
    return {
      type: this.type,
    };
  }
}
