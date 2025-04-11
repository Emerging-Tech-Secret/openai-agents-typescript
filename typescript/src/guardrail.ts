/**
 * Guardrails for agent input and output validation
 */

/**
 * Result of an input guardrail check
 */
export interface InputGuardrailResult {
  /**
   * Whether the input passed the guardrail check
   */
  passed: boolean;
  
  /**
   * Message to return if the input failed the guardrail check
   */
  message?: string;
}

/**
 * Result of an output guardrail check
 */
export interface OutputGuardrailResult {
  /**
   * Whether the output passed the guardrail check
   */
  passed: boolean;
  
  /**
   * Message to return if the output failed the guardrail check
   */
  message?: string;
}

/**
 * Output from a guardrail function
 */
export interface GuardrailFunctionOutput {
  /**
   * Whether the check passed
   */
  passed: boolean;
  
  /**
   * Message to return if the check failed
   */
  message?: string;
}

/**
 * Input guardrail for validating agent inputs
 */
export class InputGuardrail {
  /**
   * Function to check the input
   */
  checkFn: (input: string) => Promise<InputGuardrailResult> | InputGuardrailResult;
  
  /**
   * Create a new input guardrail
   */
  constructor(checkFn: (input: string) => Promise<InputGuardrailResult> | InputGuardrailResult) {
    this.checkFn = checkFn;
  }
  
  /**
   * Check an input against this guardrail
   */
  async check(input: string): Promise<InputGuardrailResult> {
    return await Promise.resolve(this.checkFn(input));
  }
}

/**
 * Output guardrail for validating agent outputs
 */
export class OutputGuardrail {
  /**
   * Function to check the output
   */
  checkFn: (output: string) => Promise<OutputGuardrailResult> | OutputGuardrailResult;
  
  /**
   * Create a new output guardrail
   */
  constructor(checkFn: (output: string) => Promise<OutputGuardrailResult> | OutputGuardrailResult) {
    this.checkFn = checkFn;
  }
  
  /**
   * Check an output against this guardrail
   */
  async check(output: string): Promise<OutputGuardrailResult> {
    return await Promise.resolve(this.checkFn(output));
  }
}

/**
 * Create an input guardrail
 */
export function inputGuardrail(
  checkFn: (input: string) => Promise<InputGuardrailResult> | InputGuardrailResult
): InputGuardrail {
  return new InputGuardrail(checkFn);
}

/**
 * Create an output guardrail
 */
export function outputGuardrail(
  checkFn: (output: string) => Promise<OutputGuardrailResult> | OutputGuardrailResult
): OutputGuardrail {
  return new OutputGuardrail(checkFn);
}
