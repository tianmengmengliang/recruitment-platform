import React, { useState, useEffect, useRef } from 'react';
import { message, Tooltip } from 'antd';
import styled from 'styled-components';

const ContentDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ title, style, children, linkTo }: any) => {
  const ellipsis = useRef<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    isEllipsis();
  }, [title]);
  const isEllipsis = () => {
    const clientWidth = ellipsis?.current?.clientWidth;
    const scrollWidth = ellipsis?.current?.scrollWidth;
    setShow(clientWidth < scrollWidth);
  };

  const RowItem = (
    <ContentDiv ref={ellipsis} style={{ ...style }}>
      {children || title || '-'}
    </ContentDiv>
  );

  return show ? (
    <Tooltip title={title} placement="topLeft" overlayStyle={{ wordBreak: 'break-all' }}>
      <ContentDiv ref={ellipsis} style={{ ...style }}>
        <a>{children || title || '-'}</a>
      </ContentDiv>
    </Tooltip>
  ) : (
    <ContentDiv ref={ellipsis} style={{ ...style }}>
      <a>{children || title || '-'}</a>
    </ContentDiv>
  );
};
