import * as React from 'react';
import ErrorPrompt from '../../src/errorPrompt';

const promptError = () => ErrorPrompt({ showCopy: true, error: new Error('There is an error') });

export default () => {
  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}