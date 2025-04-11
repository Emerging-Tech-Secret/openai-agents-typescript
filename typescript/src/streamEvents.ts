/**
 * Events for streaming agent runs
 */

import { Agent } from './agent';
import { RunItem } from './items';

/**
 * Base class for stream events
 */
export abstract class StreamEvent {
  /**
   * The type of the event
   */
  type: string;
  
  /**
   * Create a new stream event
   */
  constructor(type: string) {
    this.type = type;
  }
}

/**
 * Event for raw responses from the model
 */
export class RawResponsesStreamEvent extends StreamEvent {
  /**
   * The raw responses
   */
  responses: any[];
  
  /**
   * Create a new raw responses stream event
   */
  constructor(responses: any[]) {
    super('raw_responses');
    this.responses = responses;
  }
}

/**
 * Event for run items
 */
export class RunItemStreamEvent extends StreamEvent {
  /**
   * The run item
   */
  item: RunItem;
  
  /**
   * Create a new run item stream event
   */
  constructor(item: RunItem) {
    super('run_item');
    this.item = item;
  }
}

/**
 * Event for agent updates
 */
export class AgentUpdatedStreamEvent extends StreamEvent {
  /**
   * The updated agent
   */
  agent: Agent;
  
  /**
   * Create a new agent updated stream event
   */
  constructor(agent: Agent) {
    super('agent_updated');
    this.agent = agent;
  }
}
