/**
 * Functions example for the OpenAI Agents SDK
 */

import { Agent, Runner, functionTool } from '../../src';


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

async function main() {
  const agent = new Agent({
    name: 'Hello world',
    instructions: 'You are a helpful agent.',
    tools: [getWeather]
  });

  const result = await Runner.run(agent, 'What\'s the weather in Tokyo?');
  
  console.log(result.finalOutput);
}

if (require.main === module) {
  main().catch(console.error);
}
