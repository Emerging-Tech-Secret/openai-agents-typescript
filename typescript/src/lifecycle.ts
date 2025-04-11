/**
 * Lifecycle hooks for agents and runs
 */

import { Agent } from './agent';
import { RunItem } from './items';
import { RunContextWrapper } from './runContext';

/**
 * Hooks for agent lifecycle events
 */
export interface AgentHooks<TContext = any> {
  /**
   * Called before the agent is initialized
   */
  beforeInit?: (agent: Agent<TContext>) => Promise<void> | void;
  
  /**
   * Called after the agent is initialized
   */
  afterInit?: (agent: Agent<TContext>) => Promise<void> | void;
  
  /**
   * Called before the agent processes an input
   */
  beforeProcessInput?: (
    agent: Agent<TContext>,
    input: string,
    context: RunContextWrapper<TContext>
  ) => Promise<void> | void;
  
  /**
   * Called after the agent processes an input
   */
  afterProcessInput?: (
    agent: Agent<TContext>,
    input: string,
    context: RunContextWrapper<TContext>
  ) => Promise<void> | void;
}

/**
 * Hooks for run lifecycle events
 */
export interface RunHooks<TContext = any> {
  /**
   * Called before a run starts
   */
  beforeRun?: (
    agent: Agent<TContext>,
    input: string,
    context: RunContextWrapper<TContext>
  ) => Promise<void> | void;
  
  /**
   * Called after a run completes
   */
  afterRun?: (
    agent: Agent<TContext>,
    input: string,
    context: RunContextWrapper<TContext>,
    items: RunItem[]
  ) => Promise<void> | void;
  
  /**
   * Called before a turn starts
   */
  beforeTurn?: (
    agent: Agent<TContext>,
    context: RunContextWrapper<TContext>,
    turnNumber: number
  ) => Promise<void> | void;
  
  /**
   * Called after a turn completes
   */
  afterTurn?: (
    agent: Agent<TContext>,
    context: RunContextWrapper<TContext>,
    turnNumber: number,
    items: RunItem[]
  ) => Promise<void> | void;
}
