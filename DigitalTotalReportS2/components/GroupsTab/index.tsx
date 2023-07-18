
import * as React from "react";
import * as styles from './index.scss';

interface TabProps{
  active: any,
  data: any,
  handleClick: React.MouseEventHandler,
}

export default React.memo((props: TabProps)=>{
  const { data, active, handleClick } = props;

  return (
    <div className={active?styles.active:styles.tag} onClick={handleClick}>
      <div className={styles.name}>{data.title}</div>
      <span className={styles.target}>季度目标值：{data.value}</span>
    </div>
  )
})