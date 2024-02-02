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
      title: "s#",
      dataIndex: "so",
      sorter: (a, b) => a.no.length - b.no.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
  ];

  return <Table columns={columns} dataSource={newData} pagination={false} />;
};

export default Table1;
