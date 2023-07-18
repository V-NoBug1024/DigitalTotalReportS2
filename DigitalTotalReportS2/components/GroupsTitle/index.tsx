import * as React from "react";
import * as styles from './index.scss';

interface IProps {
    titleList: any
}
export default React.memo((props: IProps) => {
  const { titleList } = props;
    return ( 
      <table>
        <colgroup>
          {
            titleList.map((item, index) => {
                return (<col  key={index} width={item.width}></col>)
            })
          }
        </colgroup>
        <tr className={styles.fixedHeader}>
          {
              titleList.map((item, index) => {
                  return (<td className={styles.item} key={index}>{item.title}</td>)
              })
          }
        </tr>
      </table> 
    )
})