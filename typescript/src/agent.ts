import { OpenAI } from 'openai';
import { ModelSettings } from './modelSettings';
import { InputGuardrail, OutputGuardrail } from './guardrail';
import { Tool, FunctionToolResult } from './tool';
import { Handoff } from './handoffs';
import { RunContextWrapper } from './runContext';

/**
 * Result of processing tool outputs to determine if they constitute a final output
 */
export interface ToolsToFinalOutputResult {
  /**
   * Whether this is the final output. If False, the LLM will run again and receive the tool call output.
   */
  isFinalOutput: boolean;
  
  /**
   * The final output. Can be null if `isFinalOutput` is false, otherwise must match the
   * `outputType` of the agent.
   */
  finalOutput?: any;
}

/**
 * A function that takes a run context and a list of tool results, and returns a
 * ToolsToFinalOutputResult.
 */
export type ToolsToFinalOutputFunction<TContext = any> = (
  context: RunContextWrapper<TContext>,
  toolResults: FunctionToolResult[]
) => Promise<ToolsToFinalOutputResult> | ToolsToFinalOutputResult;

/**
 * Agent class for the OpenAI Agents SDK
 */
export class Agent<TContext = any> {
  /**
   * The name of the agent
   */
  name: string;
  
  /**
   * Instructions for the agent
   */
  instructions: string;
  
  /**
   * Model settings for the agent
   */
  modelSettings: ModelSettings;
  
  /**
   * Tools available to the agent
   */
  tools: Tool[];
  
  /**
   * Input guardrails for the agent
   */
  inputGuardrails: InputGuardrail[];
  
  /**
   * Output guardrails for the agent
   */
  outputGuardrails: OutputGuardrail[];
  
  /**
   * Handoffs available to the agent
   */
  handoffs: Handoff[];
  
  /**
   * Output type for the agent
   */
  outputType?: any;
  
  /**
   * Function to process tool outputs to determine if they constitute a final output
   */
  toolsToFinalOutput?: ToolsToFinalOutputFunction<TContext>;
  
  /**
   * Create a new agent
   */
  constructor({
    name,
    instructions,
    modelSettings = new ModelSettings(),
    tools = [],
    inputGuardrails = [],
    outputGuardrails = [],
    handoffs = [],
    outputType,
    toolsToFinalOutput,
  }: {
    name: string;
    instructions: string;
    modelSettings?: ModelSettings;
    tools?: Tool[];
    inputGuardrails?: InputGuardrail[];
    outputGuardrails?: OutputGuardrail[];
    handoffs?: Handoff[];
    outputType?: any;
    toolsToFinalOutput?: ToolsToFinalOutputFunction<TContext>;
  }) {
    this.name = name;
    this.instructions = instructions;
    this.modelSettings = modelSettings;
    this.tools = tools;
    this.inputGuardrails = inputGuardrails;
    this.outputGuardrails = outputGuardrails;
    this.handoffs = handoffs;
    this.outputType = outputType;
    this.toolsToFinalOutput = toolsToFinalOutput;
  }
}
