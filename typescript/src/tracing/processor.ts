/**
 * Processors for tracing
 */

import { Span } from './span';
import { Trace } from './trace';

/**
 * Interface for tracing processors
 */
export interface TracingProcessor {
  /**
   * Process a trace
   */
  processTrace(trace: Trace): Promise<void>;
  
  /**
   * Process a span
   */
  processSpan(span: Span): Promise<void>;
}

/**
 * Global tracing processors
 */
let tracingProcessors: TracingProcessor[] = [];

/**
 * Whether tracing is disabled
 */
let tracingDisabled = false;

/**
 * Add a trace processor
 */
export function addTraceProcessor(processor: TracingProcessor): void {
  tracingProcessors.push(processor);
}

/**
 * Set trace processors
 */
export function setTraceProcessors(processors: TracingProcessor[]): void {
  tracingProcessors = processors;
}

/**
 * Disable tracing
 */
export function setTracingDisabled(disabled: boolean): void {
  tracingDisabled = disabled;
}

/**
 * Set the API key for tracing export
 */
export function setTracingExportApiKey(apiKey: string): void {
}
