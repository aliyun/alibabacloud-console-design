import * as React from 'react';
import { storiesOf } from '@storybook/react';
import XconsoleStep from '../src/index'
import { Button, Form } from '@alicloud/console-components'
import '@alife/dpl-console-design-2018/index.css';

const items = [
  {
    key: 'step1',
    title: 'step1',
    onClick: (step) => { step.go('step1') },
  },
  {
    key: 'step2',
    title: 'step2',
    onClick: (step) => { step.go('step2') },
  },
  {
    key: 'step3',
    title: 'step3',
    onClick: (step) => { step.go('step3') },
  },
]

const Step1 = ({
  step,
}) => {
  return (
    <Form>
      <h1>Step1</h1>
      <Button onClick={() => step.next({name: 'step1'})}>Next</Button>
    </Form>
  )
}

const Step2 = ({
  step,
}) => {
  return (
    <Form>
      <h1>Step2</h1>
      <Button onClick={() => step.prev()}>Prev</Button>
      <Button onClick={() => step.next({comment: 'step2'})}>Next</Button>
    </Form>
  )
}

const Result = ({
  step,
}) => {
  return (
    <Form>
      <h1>Result</h1>
      <span>name: {step.getVariable('name')}</span>
      <span>comment: {step.getVariable('comment')}</span>
      <Button onClick={() => step.go('step1')}>Retry</Button>
    </Form>
  )
}

storiesOf('XconsoleStep', module)
  .add('XconsoleStep', () => {
   return (<div id="app-wrapper">
      <div id="app">
        <XconsoleStep
          items={items}
        >
          {
            (step) => {
              if (step.current === 'step1') return <Step1 step={step} />
              if (step.current === 'step2') return <Step2 step={step} />
              if (step.current === 'step3') return <Result step={step} />
            }
          }
        </XconsoleStep>
      </div>
    </div>);
  })
