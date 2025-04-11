/**
 * Context for agent runs
 */

/**
 * Generic context type
 */
export type TContext = any;

/**
 * Wrapper for run context
 */
export class RunContextWrapper<T = any> {
  /**
   * The context
   */
  context: T;
  
  /**
   * Create a new run context wrapper
   */
  constructor(context: T) {
    this.context = context;
  }
  
  /**
   * Get the context
   */
  getContext(): T {
    return this.context;
  }
  
  /**
   * Update the context
   */
  updateContext(updater: (context: T) => T): void {
    this.context = updater(this.context);
  }
}
