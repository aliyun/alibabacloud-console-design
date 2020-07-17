import React, { useContext } from 'react';
import { ConsoleContext } from '../context/Context';

interface IProps {
  id: string;
  children: React.ReactElement<any, any> | null
}

const Gray: React.FunctionComponent<IProps> = (props: IProps) => {
  const { id, children } = props;
  if (typeof id === 'undefined') {
    throw new Error(
      '[Gray] id is required'
    )
  }

  const { consoleConfig } = useContext(ConsoleContext);
  const grayStatus = consoleConfig.getGrayStatus(props.id);

  if (grayStatus === false) return null;

  return children;
}


export default Gray;