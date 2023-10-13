import React from "react";
import { Table } from "antd";

const Table1 = ({ data }) => {
  const newData = [];

  if (data !== "") {
    console.log(data);
    data.lenderReturns.map((dataItem, index) => {
      newData.push({
        no: index + 1,
        date: dataItem.returnedDate,
        amount: dataItem.amountReturned,
      });
      return null;
    });
  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
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
