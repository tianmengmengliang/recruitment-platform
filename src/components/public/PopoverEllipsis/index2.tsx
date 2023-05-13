import React, { useState, useEffect, useRef } from 'react';
import { message, Tooltip } from 'antd';
import styled from 'styled-components';

const ContentDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ title, children }: any) => {
  const ellipsis = useRef<any>(null);
  const [show, setShow] = useState(false);

  return (
    <Tooltip title={title} placement="topLeft" overlayStyle={{ wordBreak: 'break-all' }}>
      <ContentDiv ref={ellipsis}>{children || title || '-'}</ContentDiv>
    </Tooltip>
  );
};
