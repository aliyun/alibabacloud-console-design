



import React, { useEffect } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { createService } from '../src/index'

const actions =  [{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zefxdkva34i5eu6p1b8d","IncludeReservedData":true},"customRequestKey":"lb-2zefxdkva34i5eu6p1b8d"},{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zeyiepkzg6sbuy8plof9","IncludeReservedData":true},"customRequestKey":"lb-2zeyiepkzg6sbuy8plof9"},{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zeu5htukzj7v48dvj2h0","IncludeReservedData":true},"customRequestKey":"lb-2zeu5htukzj7v48dvj2h0"},{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zeugsx0469q26vzjsp3x","IncludeReservedData":true},"customRequestKey":"lb-2zeugsx0469q26vzjsp3x"},{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zew3v4vuyxkk5sqsxoxh","IncludeReservedData":true},"customRequestKey":"lb-2zew3v4vuyxkk5sqsxoxh"},{"action":"DescribeLoadBalancerAttribute","params":{"RegionId":"cn-beijing","LoadBalancerId":"lb-2zee7cm4qdeen8cwnlj8v","IncludeReservedData":true},"customRequestKey":"lb-2zee7cm4qdeen8cwnlj8v"}]

storiesOf('XConsole Mulit Api', module)
  .addDecorator(withKnobs)
  // @ts-ignore
  .add('createService', () => {
    useEffect(() => {
      try {
        createService('consoledemo')(actions)
      } catch(e) {
        console.log(e)
      }
    });

    return <div></div>
  })
