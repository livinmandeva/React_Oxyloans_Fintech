import React from "react";
import { Table } from "antd";

const Table1 = ({ data }) => {
  const newData = [];

  if (data !== "") {
    data.lenderReturns.map((dataItem, index) => {
      newData.push({
        key: index,
        so: index + 1,
        date: dataItem.returnedDate,
        amount: dataItem.amountReturned,
      });
      return null;
    });
  }

  const columns = [
    {
      title: "so",
      dataIndex: "so",
      sorter: (a, b) => a.so - b.so,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  return <Table columns={columns} dataSource={newData} pagination={false} />;
};

export default Table1;
