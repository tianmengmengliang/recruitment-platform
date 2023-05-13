import React from 'react';
import styles from './index.less';

const PageCard = (props: any) => {
  const { style = {} } = props;
  return (
    <div className={styles.pageCard_root} style={style}>
      {props.children}
    </div>
  );
};

export default PageCard;
