import React, { useState } from "react";
import { Table } from "antd";

const MyParticipateStatementTable = ({ data }) => {
  const newData = [];

  if (data !== "") {
    data.data.dealLevelLoanEmiCard.map((dataItem, index) => {
      newData.push({
        key: Math.random(),
        Sno: index + 1,
        ActualPaymentDate: dataItem.date,
        InterestPaidDate:
          dataItem.interestPaidDate == null
            ? "	Yet to be paid"
            : dataItem.interestPaidDate,
        InterestAmount: dataItem.interestAmount,
        Noofdays: dataItem.differenceInDaysForFirstParticipation,
      });
    });
  }

  const columns = [
    {
      title: "S no",
      dataIndex: "Sno",
      sorter: (a, b) => parseInt(a) - parseInt(b),
    },
    {
      title: "Actual Payment Date",
      dataIndex: "ActualPaymentDate",
      sorter: (a, b) => new Date(a) - new Date(b),
    },
    {
      title: "Interest Paid Date",
      dataIndex: "InterestPaidDate",
      sorter: (a, b) => new Date(a) - new Date(b),
    },
    {
      title: "Interest Amount",
      dataIndex: "InterestAmount",
      sorter: (a, b) => parseInt(a) - parseInt(b),
    },
    {
      title: "No of days",
      dataIndex: "Noofdays",
      sorter: (a, b) => parseInt(a) - parseInt(b),
    },
  ];

  return (
    <Table columns={columns} dataSource={newData} pagination={false}></Table>
  );
};

export default MyParticipateStatementTable;
