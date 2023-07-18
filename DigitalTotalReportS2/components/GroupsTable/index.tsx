import * as React from "react";
import * as styles from './index.scss';
import Detail from "../Detail";
import GroupsTitle from "../GroupsTitle";

interface IProps {
  dataList: any,
  sumList: any,
  showType: any,
}
const { useState, useEffect, useRef } = React;
export default React.memo((props: IProps) => {

	const [ expandedItems, setExpandedItems ] = useState({})
	const { sumList, dataList, showType } = props;
	const [scrollValue, setScrollValue] = useState(0);
	const [hasLeft, setHasLeft] = useState(false);
	const [hasTop, setHasTop] = useState(0);
	const [tableWidth, setTableWidth] = useState(550);
	const tableScroll1 = useRef<HTMLDivElement>(null);
	const fixedBody = useRef<HTMLDivElement>(null);
	const scrollBody = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		setTableWidth(showType===0?550:showType===1?780:345);
	},[showType])
	
  const handleBodyScroll = (e) =>  {
    const text = tableScroll1;
    if (text.current) {
			(text.current.scrollLeft <= 0)?e.preventDefault():setHasLeft(text.current.scrollLeft > 0);
		}
  }

  const handleBodyScrollTop  = (e: any) => {
    if(fixedBody.current) {
			setHasTop(e.target.scrollTop);
    }
  }

	const handleToggleExpand = (index, expanded) => {
		setExpandedItems((currentExpandedItems) => {
			return {
				...currentExpandedItems,
				[index]: expanded
			}
		})
	}


	return (
		<>
			<div className={styles.wrap}>
				<div 
					className={styles.scroll}
					ref={tableScroll1}
					onScroll={(e) => handleBodyScroll(e)}
				>
				<div style={{width: `${tableWidth}px`}} >
					<GroupsTitle titleList={sumList}/>
				</div> 
				<div className={styles.content} 
					ref={scrollBody}
					style={{width: `${tableWidth}px`}}
					onScroll={(event) => handleBodyScrollTop(event)}
					>
					<div className={styles.table} style={{width: `${tableWidth}px`}}> 
						<table>
							<colgroup>
								{
									sumList.map((item, index) => {
										return (<col  key={index} width={item.width}></col>)
									})
								}
							</colgroup>
							{dataList.map((item, index) => {
								return (
									<Detail 
										width={sumList}
										showType={showType}
										index={index} 
										sumG={item.sumG}
										dataList={item.bHReportDetailList} 
										sumList={item.bHReportSum}
										onToggleExpand={handleToggleExpand}
										expanded={expandedItems[index]}
										key={index}
									/>
								)
							})}
						</table>
					</div>
				</div>
				</div> 
				<div 
					className={hasLeft? `${styles.tablefixedleftscroll} ${styles.fixed} ${styles.tablefixedleft}`:`${styles.fixed} ${styles.tablefixedleft}`}>
				<div className={styles.titleTable} style={{width: `${tableWidth}px`}}><GroupsTitle titleList={sumList}/></div> 
				<div className={styles.contentfix} ref={fixedBody} style={{marginTop: `-${hasTop}px`}}>
					<div className={styles.table} style={{width: `${tableWidth}px`}}> 
					  <table>
							<colgroup>
								{
									sumList.map((item, index) => {
										return (<col key={index} width={item.width}></col>)
									})
								}
							</colgroup>
							{dataList.map((item, index) => {
								return (
									<Detail 
										width={sumList}
										showType={showType}
										index={index} 
										sumG={item.sumG}
										dataList={item.bHReportDetailList} 
										sumList={item.bHReportSum}
										onToggleExpand={handleToggleExpand}
										expanded={expandedItems[index]}
										key={index}
									/>
								)
							})}
						</table>
					</div>
				</div>
				</div> 
			</div>
		</>
	)
})