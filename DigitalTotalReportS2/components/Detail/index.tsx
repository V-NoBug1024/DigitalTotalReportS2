import * as React from "react";
import * as styles from './index.scss';

interface IProps {
    dataList: any,
    sumList: any,
    index?: any, 
    showType: any,
    sumG?: any,
    expanded?: boolean,
    width: any,
    onToggleExpand?: (index: number, expanded: boolean) => void
}
const { useState, useEffect } = React;
export default React.memo((props: IProps) => {
  const [tag, setTag] = useState(styles.tag);
  const { dataList, sumList, index, expanded, onToggleExpand , showType, sumG, width } = props;

  const handleToggleExpand = () => {
    onToggleExpand(index, !expanded)
    setTag(expanded ? styles.tag : `${styles.tag} ${styles.active}`);
  }
  
  return (
    <>
        {
          showType == 1 ? (
          <tr className={sumG ? styles.sumG : styles.tr}>
            <td onClick={handleToggleExpand}>
              <div className={dataList && dataList.length > 0 ? tag : styles.tag2}>
                <div>{sumList.dataTypeName}</div>
              </div>
            </td>
            <td>{sumList.digiRate}</td>
            <td>{sumList.digiRateRank}</td>
            <td>{sumList.sellerNumQq}</td>
            <td>{sumList.itemNumQq}</td>
            <td>{sumList.sellNumQq}</td>
            <td>{sumList.saleNumQq}</td>
            {/* <td>{sumList.itemNumDate}</td> */}
            <td>{sumList.sellNumDate}</td>
            <td>{sumList.saleNumDate}</td>
          </tr>
        ) : showType == 2 ? (
          <tr className={sumG ? styles.sumG : styles.tr}>
            <td onClick={handleToggleExpand}>
              <div className={dataList && dataList.length > 0 ? tag : styles.tag2}>
                <div>{sumList.dataTypeName}</div>
              </div>
            </td>
            <td>{sumList.digiRealNum}</td>
            <td>{sumList.digiRealRank}</td>
            <td>{sumList.saleNumQqAdd}</td>
          </tr>
        ) : (
          <tr className={sumG ? styles.sumG : styles.tr}>
            <td onClick={handleToggleExpand}>
              <div className={dataList && dataList.length > 0 ? tag : styles.tag2}>
                <div>{sumList.dataTypeName}</div>
              </div>
            </td>
            <td>{sumList.contRate}</td>
            <td>{sumList.contRateRank}</td>
            <td>{sumList.isbuyNumQq}</td>
            <td>{sumList.notIsbuyNumQq}</td>
            <td>{sumList.isbuyNumDate}</td>
            <td>{sumList.notIsbuyNumDate}</td>
          </tr>
        )}
        {expanded && dataList && dataList.map((item, index) => {
          return (
            showType == 1 ? (
            <tr className={styles.detail} key={index}>
              <td>{item.dataTypeName}</td>
              <td>{item.digiRate}</td>
              <td>{item.digiRateRank}</td>
              <td>{item.sellerNumQq}</td>
              <td>{item.itemNumQq}</td>
              <td>{item.sellNumQq}</td>
              <td>{item.saleNumQq}</td>
              {/* <td>{item.itemNumDate}</td> */}
              <td>{item.sellNumDate}</td>
              <td>{item.saleNumDate}</td>
            </tr>
            ): showType == 2 ? (
              <tr className={styles.detail} key={index}>
                <td>{item.dataTypeName}</td>
                <td>{item.digiRealNum}</td>
                <td>{item.digiRealRank}</td>
                <td>{item.saleNumQqAdd}</td>
            </tr>
            ):(
              <tr className={styles.detail} key={index}>
                <td>{item.dataTypeName}</td>
                <td>{item.contRate}</td>
                <td>{item.contRateRank}</td>
                <td>{item.isbuyNumQq}</td> 
                <td>{item.notIsbuyNumQq}</td>
                <td>{item.isbuyNumDate}</td>
                <td>{item.notIsbuyNumDate}</td>
              </tr>
            )
          )
        })}
    </>
  )
})