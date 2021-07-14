import * as React from 'react';
import ErrorPrompt from '../../src/ErrorPrompt2';

const promptError = () => ErrorPrompt({ error: new Error('There is an error') });

export default () => {
  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}