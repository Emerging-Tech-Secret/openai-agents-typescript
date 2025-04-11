/**
 * Hello world example for the OpenAI Agents SDK
 */

import { Agent, Runner } from '../../src';


async function main() {
  const agent = new Agent({
    name: 'Assistant',
    instructions: 'You are a helpful assistant'
  });

  const result = await Runner.run(agent, 'Write a haiku about recursion in programming.');
  
  console.log(result.finalOutput);
}

if (require.main === module) {
  main().catch(console.error);
}
