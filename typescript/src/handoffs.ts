/**
 * Handoffs for transferring control between agents
 */

import { Agent } from './agent';

/**
 * Input data for a handoff
 */
export interface HandoffInputData {
  /**
   * The input to the handoff
   */
  input: string;
}

/**
 * Filter for handoff inputs
 */
export type HandoffInputFilter = (input: HandoffInputData) => Promise<boolean> | boolean;

/**
 * Handoff for transferring control between agents
 */
export class Handoff {
  /**
   * The agent to hand off to
   */
  agent: Agent;
  
  /**
   * Filter for handoff inputs
   */
  inputFilter?: HandoffInputFilter;
  
  /**
   * Create a new handoff
   */
  constructor(agent: Agent, inputFilter?: HandoffInputFilter) {
    this.agent = agent;
    this.inputFilter = inputFilter;
  }
  
  /**
   * Check if an input should be handed off to this agent
   */
  async shouldHandoff(input: HandoffInputData): Promise<boolean> {
    if (!this.inputFilter) {
      return true;
    }
    
    return await Promise.resolve(this.inputFilter(input));
  }
}

/**
 * Create a handoff
 */
export function handoff(agent: Agent, inputFilter?: HandoffInputFilter): Handoff {
  return new Handoff(agent, inputFilter);
}
