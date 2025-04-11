/**
 * Results from agent runs
 */

import { Agent } from './agent';
import { RunItem } from './items';

/**
 * Result of an agent run
 */
export class RunResult<TOutput = any> {
  /**
   * The final agent that produced the output
   */
  finalAgent: Agent;
  
  /**
   * The final output from the agent
   */
  finalOutput: TOutput;
  
  /**
   * The items produced during the run
   */
  items: RunItem[];
  
  /**
   * Create a new run result
   */
  constructor(finalAgent: Agent, finalOutput: TOutput, items: RunItem[]) {
    this.finalAgent = finalAgent;
    this.finalOutput = finalOutput;
    this.items = items;
  }
}

/**
 * Streaming result of an agent run
 */
export class RunResultStreaming<TOutput = any> extends RunResult<TOutput> {
  /**
   * Create a new streaming run result
   */
  constructor(finalAgent: Agent, finalOutput: TOutput, items: RunItem[]) {
    super(finalAgent, finalOutput, items);
  }
}
