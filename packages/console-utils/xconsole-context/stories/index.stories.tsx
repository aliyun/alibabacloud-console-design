import React, { useState } from 'react';
import './config';
// @ts-ignore3
import { storiesOf } from '@storybook/react';
import ConsoleConfig from '../src/console/ConsoleConfig';

storiesOf('Console Configuration', module).add('Configuration', () => {
  const [consoleConfig] = useState<ConsoleConfig>(() => new ConsoleConfig());

  return (
    <div id="app-wrapper">
      <div>AccountName: {consoleConfig.getAccountName()}</div>
      <div>AccountType: {consoleConfig.getAccountType()}</div>
      <div>AccoutLoginLink: {consoleConfig.getAccoutLoginLink()}</div>
      <div>Channel: {consoleConfig.getChannel()}</div>
      <div>CurrentPK: {consoleConfig.getCurrentPK()}</div>
      <div>MainAccountPK: {consoleConfig.getMainAccountPK()}</div>
      <div>Lang: {consoleConfig.getLang()}</div>
      <div>Locale: {consoleConfig.getLocale()}</div>
      <div>PortalId: {consoleConfig.getPortalId()}</div>
      <div>SecToken: {consoleConfig.getSecToken()}</div>
      <div>fEnv: {consoleConfig.getfEnv()}</div>
      <div>isCertified: {consoleConfig.isCertified()}</div>
      <div>
        OpenStatus:{' '}
        {JSON.stringify(consoleConfig.getOpenStatus('oss'), null, 2)}
      </div>
      <div>ChannelLinks: {consoleConfig.getChannelLink('actionTrail')}</div>
      <div>ChannelLink Empty: {consoleConfig.getChannelLink('111')}</div>
    </div>
  );
});
