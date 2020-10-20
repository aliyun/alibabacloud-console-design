import React from 'react';
import { Grid } from '@ali/xconsole/ui'
import ChartCfg from './config';

const { Row, Col } = Grid;

const Chart = () => (
  <div>
    <Row gutter={24} wrap>
      {
        ChartCfg.map((chart, index) => (<Col span="8" key={index}>
          <div style={{ height: 200, marginBottom: 40 }}>
            {
              <chart.type data={chart.data} config={chart.config} />
            }
          </div>
        </Col>))
      }
    </Row>
  </div>
)

export default Chart;
