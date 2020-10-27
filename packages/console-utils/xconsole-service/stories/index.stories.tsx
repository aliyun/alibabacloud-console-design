import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { useOpenApi } from '../src'


storiesOf('XConsole Service', module)
  .addDecorator(withKnobs)
  .add('AppCode', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], 'DescribeInstance')
    const { data } = useOpenApi('ros', action, null, { ignoreError: true })
    return <div>{JSON.stringify(data)}</div>
  })
