import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { Dialog, ConfigProvider } from '@alicloud/console-components';

import Form from './form';
import messages from './messages';
import { RiskDialogProps, RiskDialogOptions, IVerifyInfo } from './type';

class RiskDialog extends Component<RiskDialogProps> {
  state = {
    visible: true,
    verifyCode: '',
    requestId: '',
  };
  
  constructor(props: RiskDialogProps) {
    super(props)
    this.state.requestId = props.formProps?.requestId;
  }

  close = () => {
    this.setState({ visible: false });
  };

  render = () => {
    const { onConfirm, onCancel, onClose, formProps, ...others } = this.props;
    const { visible, verifyCode, requestId } = this.state;

    return (
      <Dialog
        title={messages[formProps.verifyType].title}
        role="alertdialog"
        style={{ width: 500 }}
        {...others}
        visible={visible}
        okProps={{
          disabled: !verifyCode
        }}
        onCancel={(e) => {
          this.close();
          onCancel(e);
        }}
        onOk={() => {
          this.close();
          onConfirm({ verifyCode, requestId })
        }}
        onClose={(...args) => {
          this.close();
          onClose(...args);
        }}
      >
        <Form
          {...formProps}
          setRequestId={
            (requestId) => {
              this.setState({requestId})
            }
          }
          setVerifyCode={
            (verifyCode) => {
              this.setState({verifyCode})
            }
          }
        />
      </Dialog>
    )
  }
}

export const show = (config: RiskDialogOptions) => {
  return new window.Promise<IVerifyInfo>((resolve, reject) => {
    const container = document.createElement('div');
    const unmount = () => {
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
    };
    document.body.appendChild(container);
    // @ts-ignore
    const newContext = ConfigProvider.getContext();
    const { verifyType } = config;

    const handleVerifyCodeConfirm = () => {
      ({ verifyCode, requestId }) => {
        if (verifyType === 'ga' && verifyCode) {
          resolve({ vCode: verifyCode });
        }
        if (requestId && verifyCode) {
          resolve({
            reqId: requestId,
            vCode: verifyCode,
          });
        }
        console.warn('[getVerifyInformation] failed: ', requestId, verifyCode );
      }
    }

    ReactDOM.render(
      <ConfigProvider {...newContext}>
        <RiskDialog
          {...config}
          onConfirm={handleVerifyCodeConfirm}
          onCancel={() => {
            reject(new Error('Verification has been canceled!'));
          }}
          onClose={() => {
            reject(new Error('Verification has been canceled!'));
          }}
          formProps={{ ...config }}
          afterClose={unmount}
        />
      </ConfigProvider>,
      container
    );
  });
};

export default {
  show
};