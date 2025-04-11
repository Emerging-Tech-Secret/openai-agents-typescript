/**
 * Spans for tracing
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for span data
 */
export class SpanData {
  /**
   * The type of the span data
   */
  type: string;
  
  /**
   * Create new span data
   */
  constructor(type: string) {
    this.type = type;
  }
}

/**
 * Agent span data
 */
export class AgentSpanData extends SpanData {
  /**
   * The name of the agent
   */
  agentName: string;
  
  /**
   * The instructions for the agent
   */
  instructions: string;
  
  /**
   * Create new agent span data
   */
  constructor(agentName: string, instructions: string) {
    super('agent');
    this.agentName = agentName;
    this.instructions = instructions;
  }
}

/**
 * Function span data
 */
export class FunctionSpanData extends SpanData {
  /**
   * The name of the function
   */
  functionName: string;
  
  /**
   * The arguments for the function
   */
  args: Record<string, any>;
  
  /**
   * Create new function span data
   */
  constructor(functionName: string, args: Record<string, any>) {
    super('function');
    this.functionName = functionName;
    this.args = args;
  }
}

/**
 * Generation span data
 */
export class GenerationSpanData extends SpanData {
  /**
   * The model used for generation
   */
  model: string;
  
  /**
   * The prompt for generation
   */
  prompt: string;
  
  /**
   * Create new generation span data
   */
  constructor(model: string, prompt: string) {
    super('generation');
    this.model = model;
    this.prompt = prompt;
  }
}

/**
 * Guardrail span data
 */
export class GuardrailSpanData extends SpanData {
  /**
   * The type of guardrail
   */
  guardrailType: string;
  
  /**
   * The input for the guardrail
   */
  input: string;
  
  /**
   * Create new guardrail span data
   */
  constructor(guardrailType: string, input: string) {
    super('guardrail');
    this.guardrailType = guardrailType;
    this.input = input;
  }
}

/**
 * Handoff span data
 */
export class HandoffSpanData extends SpanData {
  /**
   * The name of the agent to hand off to
   */
  agentName: string;
  
  /**
   * The input for the handoff
   */
  input: string;
  
  /**
   * Create new handoff span data
   */
  constructor(agentName: string, input: string) {
    super('handoff');
    this.agentName = agentName;
    this.input = input;
  }
}

/**
 * Custom span data
 */
export class CustomSpanData extends SpanData {
  /**
   * The name of the custom span
   */
  name: string;
  
  /**
   * The data for the custom span
   */
  data: Record<string, any>;
  
  /**
   * Create new custom span data
   */
  constructor(name: string, data: Record<string, any>) {
    super('custom');
    this.name = name;
    this.data = data;
  }
}

/**
 * MCP list tools span data
 */
export class MCPListToolsSpanData extends SpanData {
  /**
   * The tools
   */
  tools: any[];
  
  /**
   * Create new MCP list tools span data
   */
  constructor(tools: any[]) {
    super('mcp_list_tools');
    this.tools = tools;
  }
}

/**
 * Speech group span data
 */
export class SpeechGroupSpanData extends SpanData {
  /**
   * Create new speech group span data
   */
  constructor() {
    super('speech_group');
  }
}

/**
 * Speech span data
 */
export class SpeechSpanData extends SpanData {
  /**
   * The text for speech
   */
  text: string;
  
  /**
   * Create new speech span data
   */
  constructor(text: string) {
    super('speech');
    this.text = text;
  }
}

/**
 * Transcription span data
 */
export class TranscriptionSpanData extends SpanData {
  /**
   * The audio for transcription
   */
  audio: any;
  
  /**
   * Create new transcription span data
   */
  constructor(audio: any) {
    super('transcription');
    this.audio = audio;
  }
}

/**
 * Error for spans
 */
export class SpanError extends Error {
  /**
   * Create a new span error
   */
  constructor(message: string) {
    super(message);
    this.name = 'SpanError';
  }
}

/**
 * A span for tracing
 */
export class Span {
  /**
   * The ID of the span
   */
  id: string;
  
  /**
   * The ID of the trace
   */
  traceId: string;
  
  /**
   * The ID of the parent span
   */
  parentId?: string;
  
  /**
   * The name of the span
   */
  name: string;
  
  /**
   * The start time of the span
   */
  startTime: number;
  
  /**
   * The end time of the span
   */
  endTime?: number;
  
  /**
   * The data for the span
   */
  data?: SpanData;
  
  /**
   * The error for the span
   */
  error?: SpanError;
  
  /**
   * Create a new span
   */
  constructor(
    traceId: string,
    name: string,
    parentId?: string,
    id?: string
  ) {
    this.id = id || genSpanId();
    this.traceId = traceId;
    this.parentId = parentId;
    this.name = name;
    this.startTime = Date.now();
  }
  
  /**
   * End the span
   */
  end(error?: SpanError): void {
    this.endTime = Date.now();
    this.error = error;
  }
  
  /**
   * Set the data for the span
   */
  setData(data: SpanData): void {
    this.data = data;
  }
}

/**
 * Generate a span ID
 */
export function genSpanId(): string {
  return uuidv4();
}

/**
 * Generate a trace ID
 */
export function genTraceId(): string {
  return uuidv4();
}

/**
 * Get the current span
 */
export function getCurrentSpan(): Span | undefined {
  return undefined;
}

/**
 * Create an agent span
 */
export function agentSpan(
  agentName: string,
  instructions: string,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'agent', parentId);
  span.setData(new AgentSpanData(agentName, instructions));
  return span;
}

/**
 * Create a function span
 */
export function functionSpan(
  functionName: string,
  args: Record<string, any>,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'function', parentId);
  span.setData(new FunctionSpanData(functionName, args));
  return span;
}

/**
 * Create a generation span
 */
export function generationSpan(
  model: string,
  prompt: string,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'generation', parentId);
  span.setData(new GenerationSpanData(model, prompt));
  return span;
}

/**
 * Create a guardrail span
 */
export function guardrailSpan(
  guardrailType: string,
  input: string,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'guardrail', parentId);
  span.setData(new GuardrailSpanData(guardrailType, input));
  return span;
}

/**
 * Create a handoff span
 */
export function handoffSpan(
  agentName: string,
  input: string,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'handoff', parentId);
  span.setData(new HandoffSpanData(agentName, input));
  return span;
}

/**
 * Create a custom span
 */
export function customSpan(
  name: string,
  data: Record<string, any>,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'custom', parentId);
  span.setData(new CustomSpanData(name, data));
  return span;
}

/**
 * Create an MCP list tools span
 */
export function mcpToolsSpan(
  tools: any[],
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'mcp_list_tools', parentId);
  span.setData(new MCPListToolsSpanData(tools));
  return span;
}

/**
 * Create a speech group span
 */
export function speechGroupSpan(
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'speech_group', parentId);
  span.setData(new SpeechGroupSpanData());
  return span;
}

/**
 * Create a speech span
 */
export function speechSpan(
  text: string,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'speech', parentId);
  span.setData(new SpeechSpanData(text));
  return span;
}

/**
 * Create a transcription span
 */
export function transcriptionSpan(
  audio: any,
  parentId?: string
): Span {
  const span = new Span(genTraceId(), 'transcription', parentId);
  span.setData(new TranscriptionSpanData(audio));
  return span;
}
