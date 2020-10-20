import React from 'react';
import axios from 'axios';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { useOpenApi, useRoaApi } from '../src'

storiesOf('XConsole Service', module)
  .addDecorator(withKnobs)
  .add('AppCode', () => {
    const action = select('action', ['DescribeInstance', 'DescribeAPI'], '')
    const { data } = useRoaApi('ros', action, {test: 1})
    return <div>{JSON.stringify(data)}</div>
  })
