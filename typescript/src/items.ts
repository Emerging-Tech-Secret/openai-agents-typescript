/**
 * Items for agent runs
 */

/**
 * Base class for run items
 */
export abstract class RunItem {
  /**
   * The type of the item
   */
  type: string;
  
  /**
   * Create a new run item
   */
  constructor(type: string) {
    this.type = type;
  }
}

/**
 * Input item for a response
 */
export interface TResponseInputItem {
  /**
   * The content of the input
   */
  content: string;
}

/**
 * Message output item
 */
export class MessageOutputItem extends RunItem {
  /**
   * The content of the message
   */
  content: string;
  
  /**
   * Create a new message output item
   */
  constructor(content: string) {
    super('message');
    this.content = content;
  }
}

/**
 * Model response
 */
export class ModelResponse extends RunItem {
  /**
   * The content of the response
   */
  content: string;
  
  /**
   * Create a new model response
   */
  constructor(content: string) {
    super('model_response');
    this.content = content;
  }
}

/**
 * Tool call item
 */
export class ToolCallItem extends RunItem {
  /**
   * The name of the tool
   */
  name: string;
  
  /**
   * The arguments for the tool call
   */
  arguments: Record<string, any>;
  
  /**
   * Create a new tool call item
   */
  constructor(name: string, args: Record<string, any>) {
    super('tool_call');
    this.name = name;
    this.arguments = args;
  }
}

/**
 * Tool call output item
 */
export class ToolCallOutputItem extends RunItem {
  /**
   * The name of the tool
   */
  name: string;
  
  /**
   * The arguments for the tool call
   */
  arguments: Record<string, any>;
  
  /**
   * The output of the tool call
   */
  output: any;
  
  /**
   * Create a new tool call output item
   */
  constructor(name: string, args: Record<string, any>, output: any) {
    super('tool_call_output');
    this.name = name;
    this.arguments = args;
    this.output = output;
  }
}

/**
 * Handoff call item
 */
export class HandoffCallItem extends RunItem {
  /**
   * The name of the agent to hand off to
   */
  agentName: string;
  
  /**
   * Create a new handoff call item
   */
  constructor(agentName: string) {
    super('handoff_call');
    this.agentName = agentName;
  }
}

/**
 * Handoff output item
 */
export class HandoffOutputItem extends RunItem {
  /**
   * The name of the agent that was handed off to
   */
  agentName: string;
  
  /**
   * The output of the handoff
   */
  output: any;
  
  /**
   * Create a new handoff output item
   */
  constructor(agentName: string, output: any) {
    super('handoff_output');
    this.agentName = agentName;
    this.output = output;
  }
}

/**
 * Reasoning item
 */
export class ReasoningItem extends RunItem {
  /**
   * The content of the reasoning
   */
  content: string;
  
  /**
   * Create a new reasoning item
   */
  constructor(content: string) {
    super('reasoning');
    this.content = content;
  }
}

/**
 * Helper functions for items
 */
export class ItemHelpers {
  /**
   * Check if an item is a message output item
   */
  static isMessageOutputItem(item: RunItem): item is MessageOutputItem {
    return item.type === 'message';
  }
  
  /**
   * Check if an item is a model response
   */
  static isModelResponse(item: RunItem): item is ModelResponse {
    return item.type === 'model_response';
  }
  
  /**
   * Check if an item is a tool call item
   */
  static isToolCallItem(item: RunItem): item is ToolCallItem {
    return item.type === 'tool_call';
  }
  
  /**
   * Check if an item is a tool call output item
   */
  static isToolCallOutputItem(item: RunItem): item is ToolCallOutputItem {
    return item.type === 'tool_call_output';
  }
  
  /**
   * Check if an item is a handoff call item
   */
  static isHandoffCallItem(item: RunItem): item is HandoffCallItem {
    return item.type === 'handoff_call';
  }
  
  /**
   * Check if an item is a handoff output item
   */
  static isHandoffOutputItem(item: RunItem): item is HandoffOutputItem {
    return item.type === 'handoff_output';
  }
  
  /**
   * Check if an item is a reasoning item
   */
  static isReasoningItem(item: RunItem): item is ReasoningItem {
    return item.type === 'reasoning';
  }
}
