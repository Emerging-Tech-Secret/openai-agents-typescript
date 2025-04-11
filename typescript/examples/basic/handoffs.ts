/**
 * Handoffs example for the OpenAI Agents SDK
 */

import { Agent, Runner, handoff } from '../../src';


async function main() {
  const spanishAgent = new Agent({
    name: 'Spanish agent',
    instructions: 'You only speak Spanish.'
  });

  const englishAgent = new Agent({
    name: 'English agent',
    instructions: 'You only speak English'
  });

  const triageAgent = new Agent({
    name: 'Triage agent',
    instructions: 'Handoff to the appropriate agent based on the language of the request.',
    handoffs: [handoff(spanishAgent), handoff(englishAgent)]
  });

  const result = await Runner.run(triageAgent, 'Hola, ¿cómo estás?');
  
  console.log(result.finalOutput);
}

if (require.main === module) {
  main().catch(console.error);
}
