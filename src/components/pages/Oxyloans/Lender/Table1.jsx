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
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];

  return <Table columns={columns} dataSource={newData} pagination={false} />;
};

export default Table1;
