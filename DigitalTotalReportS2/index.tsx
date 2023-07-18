import * as React from "react";
import * as qs from "query-string";
import GroupsTable from "./components/GroupsTable";
import GroupsTab from "./components/GroupsTab";

import * as styles from "./index.scss";
import * as api from "../../services/digitalReport";

const { useState, useEffect } = React;
export default React.memo(() => {
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState("");
  const [typeDetailList, setTypeDetailList] = useState([]);
  const [tipsVisible, setTipsVisible] = useState(0);
  const [titleList, setTitleList] = useState([]);
  const [reportDate, setReportDate] = useState([]);
  const [totalTagList, setTotalTagList] = useState([]);

  useEffect(() => {
    const params = qs.parse(window.location.search);
    const { msgid } = params;
    // const msgid = "fe54e50a-c0c0-402a-b483-583ae39ca191";
    const p = Promise.race([
      api.getbHReportController(msgid, true).then((res: any) => {
        const data = res;
        document.title = res.pageTitle;
        setDataType(data.dataType);
        const contitleList = [
          { title: data.dataType, dataIndex: "dataTypeName", width: 98 },
          { title: "累计顾客连接", dataIndex: "contRate", width: 80 },
          { title: "顾客连接排名", dataIndex: "contRateRank", width: 80 },
          { title: "累计新加好友", dataIndex: "isbuyNumQq", width: 80 },
          { title: "累计消费会员", dataIndex: "notIsbuyNumQq", width: 80 },
          { title: "日新加消费好友", dataIndex: "isbuyNumDate", width: 80 },
          { title: "日消费会员", dataIndex: "notIsbuyNumDate", width: 80 },
        ];
        setTitleList(contitleList);
        setReportDate(data.reportDate);
        if (data.bHReportSumGS) {
          const temp = {
            bHReportSum: data.bHReportSumGS,
            bHReportDetailList: [],
            sumG: true,
          };
          data.bHReportDataTypeList.push(temp);
        }
        setTypeDetailList(data.bHReportDataTypeList);
        setTotalTagList([
          { title: "顾客连接", value: data.contRateTarget },
          { title: "导购数字化", value: data.digiRateTarget },
          { title: "百货数字化指数", value: data.digiRealTarget },
        ]);
      }),
    ]);
    p.then((res) => {
      // TO DO
    }).catch((err) => {
      setError(err.message);
    });
  }, []);

  const contitleList0 = [
    { title: dataType, dataIndex: "dataTypeName", width: 98 },
    { title: "累计顾客连接", dataIndex: "contRate", width: 80 },
    { title: "顾客连接排名", dataIndex: "contRateRank", width: 80 },
    { title: "累计新加好友", dataIndex: "isbuyNumQq", width: 80 },
    { title: "累计消费会员", dataIndex: "notIsbuyNumQq", width: 80 },
    { title: "日新加消费好友", dataIndex: "isbuyNumDate", width: 80 },
    { title: "日消费会员", dataIndex: "notIsbuyNumDate", width: 80 },
  ];

  const contitleList1 = [
    { title: dataType, dataIndex: "dataTypeName", width: 98 },
    { title: "导购数字化", dataIndex: "digiRate", width: 90 },
    { title: "导购数字化排名", dataIndex: "digiRateRank", width: 90 },
    { title: "在职人数", dataIndex: "sellerNumQq", width: 80 },
    { title: "柜台数", dataIndex: "itemNumQq", width: 80 },
    { title: "创建销售单达标人数", dataIndex: "sellNumQq", width: 90 },
    { title: "在线销售达标柜台数", dataIndex: "saleNumQq", width: 95 },
    // { title: '日创建商品人数', dataIndex: 'itemNumDate', width: 80 },
    { title: "日创建销售单人数", dataIndex: "sellNumDate", width: 95 },
    { title: "日在线销售柜台数", dataIndex: "saleNumDate", width: 95 },
  ];

  const contitleList2 = [
    { title: dataType, dataIndex: "dataTypeName", width: 98 },
    { title: "季度完成值", dataIndex: "digiRealNum", width: 80 },
    { title: "季度完成值排名", dataIndex: "digiRealRank", width: 90 },
    { title: "累计在线订单总数", dataIndex: "saleNumQqAdd", width: 100 },
  ];

  const handleClick = (index) => {
    setTipsVisible(index);
    if (index === 1) {
      // 导购数字化
      setTitleList(contitleList1);
    } else if (index === 2) {
      // 百货数字化
      setTitleList(contitleList2);
    } else {
      // 顾客连接
      setTitleList(contitleList0);
    }
  };

  return (
    <div>
      {error ? (
        <div>请刷新...</div>
      ) : (
        <>
          <div className={styles.boxShadow}>
            <div className={styles.totalTitle}>{reportDate}</div>
            <div className={styles.tagWrap}>
              {totalTagList &&
                totalTagList.map((item, index) => {
                  var active = index === tipsVisible && true;
                  return (
                    <GroupsTab
                      active={active}
                      data={item}
                      key={index}
                      handleClick={() => handleClick(index)}
                    />
                  );
                })}
            </div>
          </div>

          <div className={styles.wrap}>
            <div className={styles.content}>
              <div className={styles.content}>
                <GroupsTable
                  sumList={titleList}
                  dataList={typeDetailList}
                  showType={tipsVisible}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
