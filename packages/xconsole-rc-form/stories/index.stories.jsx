import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRcForm from '../src/index'
import { Input } from '@alicloud/console-components'

const getItems = () => [
  {
    label: 'UserName',
    dataIndex: 'name',
    initialValue: 'yofine',
    element: <Input />,
    asterisk: true,
  },
  <Input value="asdaa" />
]

storiesOf('WindProRcForm', module)
  .add('WindProRcForm', () => {
   return (<div id="app-wrapper">
      <div id="app">
        <WindProRcForm
          operation={
            <WindProRcForm.Submit onClick={values => console.log(values)}>Submit</WindProRcForm.Submit>
          }
          items={getItems}
        />
      </div>
    </div>);
  })
