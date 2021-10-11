import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, Grid, Form } from '@alicloud/console-components';
import { getSecToken, getUmid, getCollina } from '../../utils/index';
import searchParamsInterceptor from '../paramsInterceptor/index';
import messages from './messages';
import { RiskOption, RiskUrlOption } from './type';

const { Col, Row } = Grid;
const ItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(searchParamsInterceptor);

export interface IProps {
  codeType?: string;
  verifyType?: string;
  verifyDetail?: any;
  isVerifyCodeValid?: boolean;
  requestId?: string;
  setVerifyCode?: (value: string) => void;
  setRequestId?: (id: any) => void;
  onError?: (value: any) => void;
  riskConfig: RiskOption;
}

interface IState {
  isCountdownStarted: boolean;
  countdown: number;
}

class VerifyForm extends Component<IProps, IState> {
  timer: number | null;

  verifyUrl: RiskUrlOption;

  constructor(props: IProps) {
    super(props);
    this.timer = null;
    this.state = {
      isCountdownStarted: false,
      countdown: 0,
    };
    this.verifyUrl = props.riskConfig.url;
    this.onInputChange = this.onInputChange.bind(this);
    this.onGenerateVerifyCode = this.onGenerateVerifyCode.bind(this);
    this.startCountdownTimer = this.startCountdownTimer.bind(this);
    this.updateCountdown = this.updateCountdown.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
  }

  componentWillUnmount(): void {
    this.clearTimer();
  }

  onInputChange(value: string): void {
    const { setVerifyCode } = this.props;
    setVerifyCode?.(value.trim());
  }

  async onGenerateVerifyCode(): Promise<void> {
    this.startCountdownTimer();

    const { codeType, verifyType, setRequestId } = this.props;
    const reqData = {
      codeType,
      verifyType,
      // eslint-disable-next-line @typescript-eslint/camelcase
      sec_token: getSecToken(),
      umid: getUmid(),
      collina: getCollina(),
    };

    try {
      const res = await axiosInstance({
        method: 'post',
        url: this.verifyUrl.generateVerificationCode,
        data: reqData,
        timeout: 15000,
      });

      const {
        data: { data: resData },
      } = res;
      if (!resData) {
        throw new Error('[generateVerifyCode] failed');
      }

      setRequestId?.(resData.requestId); // 保存发送验证码请求的 requestId
    } catch (e) {
      console.error('[onGenerateVerifyCode] failed: ', e.message);
    }
  }

  startCountdownTimer(): void {
    this.updateCountdown(60);
    this.forceUpdate();
    this.timer = window.setInterval(() => {
      if (this.state.countdown <= 0) {
        this.clearTimer();
        return;
      }
      this.updateCountdown(this.state.countdown - 1);
    }, 1000);
  }

  updateCountdown(value: number): void {
    this.setState({
      countdown: value,
      isCountdownStarted: value !== 0,
    });
  }

  clearTimer(): void {
    if (this.timer) clearInterval(this.timer);
  }

  render(): JSX.Element {
    const {
      verifyType = '', verifyDetail, isVerifyCodeValid
    } = this.props;

    const verifyMessages = {
      ...messages[verifyType],
      ...messages.others,
    };

    const { isCountdownStarted, countdown } = this.state;
    return (
      <Form style={{ width: '400px' }}>
        <Form.Item label={verifyMessages.detailDescription} {...ItemLayout}>
          <div className="next-form-text-align">
            <span>{verifyDetail} </span>
            <a
              href={this.verifyUrl.changeVerificationMethod}
              rel="noopener noreferrer"
              target="_blank"
            >
              {verifyMessages.changeDescription}
            </a>
          </div>
        </Form.Item>
        <Form.Item
          label={verifyMessages.settingLabel}
          {...ItemLayout}
          validateState={!isVerifyCodeValid ? 'error' : 'success'}
          help={!isVerifyCodeValid ? verifyMessages.codeInvalid : ''}
        >
          <Row>
            <Col>
              <Input onChange={this.onInputChange} style={{ width: 80, marginRight: 8 }} />
            </Col>
            {verifyType !== 'ga' ? (
              <Col>
                {isCountdownStarted ? (
                  <Button disabled>
                    {`${verifyMessages.reSend.replace('{s}', countdown)}`}
                  </Button>
                ) : (
                  <Button onClick={this.onGenerateVerifyCode}>
                    {verifyMessages.sendCode}
                  </Button>
                )}
              </Col>
            ) : null}
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default VerifyForm;
