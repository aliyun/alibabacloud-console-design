import React, { useContext } from 'react';
import { ConsoleContext } from '../context/Context';

interface IProps {
  grayId: string;
  children: React.ReactElement<any, any> | null
}

const Gray: React.FunctionComponent<IProps> = (props: IProps) => {
  const { grayId, children } = props;
  if (typeof grayId === 'undefined') {
    throw new Error(
      '[Gray] grayId is required'
    )
  }

  const { consoleConfig } = useContext(ConsoleContext);
  const grayStatus = consoleConfig.getGrayStatus(props.grayId);

  if (grayStatus === false) return null;

  return children;
}


export default Gray;