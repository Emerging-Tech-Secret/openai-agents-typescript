/**
 * Exceptions for the OpenAI Agents SDK
 */

/**
 * Base exception for the Agents SDK
 */
export class AgentsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AgentsException';
  }
}

/**
 * Exception for when an input guardrail tripwire is triggered
 */
export class InputGuardrailTripwireTriggered extends AgentsException {
  constructor(message: string) {
    super(message);
    this.name = 'InputGuardrailTripwireTriggered';
  }
}

/**
 * Exception for when an output guardrail tripwire is triggered
 */
export class OutputGuardrailTripwireTriggered extends AgentsException {
  constructor(message: string) {
    super(message);
    this.name = 'OutputGuardrailTripwireTriggered';
  }
}

/**
 * Exception for when the maximum number of turns is exceeded
 */
export class MaxTurnsExceeded extends AgentsException {
  constructor(message: string) {
    super(message);
    this.name = 'MaxTurnsExceeded';
  }
}

/**
 * Exception for when the model behaves unexpectedly
 */
export class ModelBehaviorError extends AgentsException {
  constructor(message: string) {
    super(message);
    this.name = 'ModelBehaviorError';
  }
}

/**
 * Exception for user errors
 */
export class UserError extends AgentsException {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}
