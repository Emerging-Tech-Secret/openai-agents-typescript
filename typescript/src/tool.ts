/**
 * Tools for agents to use
 */

/**
 * Result of a function tool call
 */
export interface FunctionToolResult {
  /**
   * The name of the function that was called
   */
  name: string;
  
  /**
   * The arguments that were passed to the function
   */
  arguments: Record<string, any>;
  
  /**
   * The result of the function call
   */
  result: any;
}

/**
 * Base class for tools
 */
export abstract class Tool {
  /**
   * The name of the tool
   */
  name: string;
  
  /**
   * The description of the tool
   */
  description: string;
  
  /**
   * Create a new tool
   */
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  
  /**
   * Get the schema for this tool
   */
  abstract getSchema(): any;
}

/**
 * Function tool for calling a function
 */
export class FunctionTool extends Tool {
  /**
   * The function to call
   */
  fn: (...args: any[]) => Promise<any> | any;
  
  /**
   * The parameters for the function
   */
  parameters: Record<string, any>;
  
  /**
   * Create a new function tool
   */
  constructor(
    name: string,
    description: string,
    fn: (...args: any[]) => Promise<any> | any,
    parameters: Record<string, any>
  ) {
    super(name, description);
    this.fn = fn;
    this.parameters = parameters;
  }
  
  /**
   * Get the schema for this tool
   */
  getSchema(): any {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: 'object',
          properties: this.parameters,
          required: Object.keys(this.parameters).filter(
            (key) => this.parameters[key].required
          ),
        },
      },
    };
  }
  
  /**
   * Call the function
   */
  async call(args: Record<string, any>): Promise<any> {
    return await Promise.resolve(this.fn(args));
  }
}

/**
 * Default error handler for tool calls
 */
export function defaultToolErrorFunction(error: Error): string {
  return `Error: ${error.message}`;
}

/**
 * Create a function tool from a function
 */
export function functionTool(
  fn: (...args: any[]) => Promise<any> | any,
  options?: {
    name?: string;
    description?: string;
    parameters?: Record<string, any>;
  }
): FunctionTool {
  const name = options?.name || fn.name;
  const description = options?.description || '';
  const parameters = options?.parameters || {};
  
  return new FunctionTool(name, description, fn, parameters);
}

/**
 * Computer tool for interacting with a computer
 */
export class ComputerTool extends Tool {
  /**
   * Create a new computer tool
   */
  constructor() {
    super('computer', 'Interact with a computer');
  }
  
  /**
   * Get the schema for this tool
   */
  getSchema(): any {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'The command to run on the computer',
            },
          },
          required: ['command'],
        },
      },
    };
  }
}

/**
 * Web search tool for searching the web
 */
export class WebSearchTool extends Tool {
  /**
   * Create a new web search tool
   */
  constructor() {
    super('web_search', 'Search the web');
  }
  
  /**
   * Get the schema for this tool
   */
  getSchema(): any {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query',
            },
          },
          required: ['query'],
        },
      },
    };
  }
}

/**
 * File search tool for searching files
 */
export class FileSearchTool extends Tool {
  /**
   * Create a new file search tool
   */
  constructor() {
    super('file_search', 'Search files');
  }
  
  /**
   * Get the schema for this tool
   */
  getSchema(): any {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query',
            },
            path: {
              type: 'string',
              description: 'The path to search in',
            },
          },
          required: ['query'],
        },
      },
    };
  }
}
