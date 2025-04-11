# OpenAI Agents SDK for TypeScript

This is a TypeScript port of the [OpenAI Agents Python SDK](https://github.com/openai/openai-agents-python).

## Core concepts:

1. **Agents**: LLMs configured with instructions, tools, guardrails, and handoffs
2. **Handoffs**: A specialized tool call used by the Agents SDK for transferring control between agents
3. **Guardrails**: Configurable safety checks for input and output validation
4. **Tracing**: Built-in tracking of agent runs, allowing you to view, debug and optimize your workflows

Explore the [examples](examples) directory to see the SDK in action.

## Get started

1. Install the SDK

```bash
npm install openai-agents
```

2. Set your OpenAI API key

```typescript
process.env.OPENAI_API_KEY = 'your-api-key';
```

## Hello world example

```typescript
import { Agent, Runner } from 'openai-agents';

// Create an agent
const agent = new Agent({
  name: 'Assistant',
  instructions: 'You are a helpful assistant'
});

// Run the agent
const result = await Runner.run(agent, 'Write a haiku about recursion in programming.');

// Print the result
console.log(result.finalOutput);
// Code within the code,
// Functions calling themselves,
// Infinite loop's dance.
```

## Handoffs example

```typescript
import { Agent, Runner } from 'openai-agents';

// Create a Spanish agent
const spanishAgent = new Agent({
  name: 'Spanish agent',
  instructions: 'You only speak Spanish.'
});

// Create an English agent
const englishAgent = new Agent({
  name: 'English agent',
  instructions: 'You only speak English'
});

// Create a triage agent
const triageAgent = new Agent({
  name: 'Triage agent',
  instructions: 'Handoff to the appropriate agent based on the language of the request.',
  handoffs: [spanishAgent, englishAgent]
});

// Run the triage agent
const result = await Runner.run(triageAgent, 'Hola, ¿cómo estás?');

// Print the result
console.log(result.finalOutput);
// ¡Hola! Estoy bien, gracias por preguntar. ¿Y tú, cómo estás?
```

## Functions example

```typescript
import { Agent, Runner, functionTool } from 'openai-agents';

// Define a function tool
const getWeather = functionTool(
  (args: { city: string }) => {
    return `The weather in ${args.city} is sunny.`;
  },
  {
    name: 'get_weather',
    description: 'Get the weather for a city',
    parameters: {
      city: {
        type: 'string',
        description: 'The city to get the weather for',
        required: true
      }
    }
  }
);

// Create an agent with the function tool
const agent = new Agent({
  name: 'Hello world',
  instructions: 'You are a helpful agent.',
  tools: [getWeather]
});

// Run the agent
const result = await Runner.run(agent, 'What\'s the weather in Tokyo?');

// Print the result
console.log(result.finalOutput);
// The weather in Tokyo is sunny.
```

## Development

1. Clone the repository

```bash
git clone https://github.com/openai/openai-agents-typescript.git
cd openai-agents-typescript
```

2. Install dependencies

```bash
npm install
```

3. Build the SDK

```bash
npm run build
```

4. Run tests

```bash
npm test
```

## Acknowledgements

This is a TypeScript port of the [OpenAI Agents Python SDK](https://github.com/openai/openai-agents-python).
