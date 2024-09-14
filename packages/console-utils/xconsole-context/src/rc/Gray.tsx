import React, { useContext } from 'react';
import { ConsoleContext } from '../context/Context';

interface IProps {
  grayId: string;
  children: React.ReactElement<any, any> | null;
}

export const useGray = (grayId: string) => {
  if (typeof grayId === 'undefined') {
    throw new Error(
      '[Gray] grayId is required',
    );
  }
  const { consoleConfig } = useContext(ConsoleContext);
  return consoleConfig.getGrayStatus(grayId);
};

const Gray: React.FunctionComponent<IProps> = (props: IProps) => {
  const { grayId, children } = props;
  const grayStatus = useGray(grayId);
  if (grayStatus === false) return null;
  return children;
};


export default Gray;
