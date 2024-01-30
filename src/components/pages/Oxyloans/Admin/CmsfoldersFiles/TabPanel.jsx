import { Button, Radio, Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { getMembershiphistory } from '../../../../HttpRequest/afterlogin';
import { onShowSizeChange } from '../../../../Pagination';

export default function TabPanel() {
    const [membershiphistory, setmembershiphistory] = useState({
        apiData: "",
        hasdata: false,
        loading: true,
        pageNo: 1,
        pageSize: 5,
        defaultPageSize: 5,
      });
    
      const membershiphistoryPagination = (Pagination) => {
        setmembershiphistory({
          ...membershiphistory,
          defaultPageSize: Pagination.pageSize,
          pageNo: Pagination.current,
          pageSize: Pagination.pageSize,
        });
      };
    
      useEffect(() => {
        const response = getMembershiphistory(
          membershiphistory.pageNo,
          membershiphistory.pageSize
        );
        response.then((data) => {
          if (data.request.status == 200) {
            setmembershiphistory({
              ...membershiphistory,
              apiData: data.data,
              loading: false,
              hasdata: data.data.count == 0 ? false : true,
            });
          }
        });
        return () => {};
      }, [membershiphistory.pageNo, membershiphistory.pageSize]);
    
      const datasource = [];
      {
        membershiphistory.apiData != ""
          ? membershiphistory.apiData.listOfTransactions.map((data) => {
              datasource.push({
                key: Math.random(),
                PaymentDate: data.paymentDate,
                TransactionNumber: data.transactionNumber,
                Amount: data.amount,
                PaidThrough: data.paidType,
              });
            })
          : "";
      }
    
      const columns = [
        {
          title: "file Name",
          dataIndex: "PaymentDate",
             
          sorter: (a, b) => a.PaymentDate - b.PaymentDate,
        },
        {
          title: "Amount",
          dataIndex: "TransactionNumber",
          sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
        },
        {
          title: "Payment Date",
          dataIndex: "Amount",
          sorter: (a, b) => a.Amount - b.Amount,
        },
        {
            title: "File status",
            dataIndex: "Amount",
            sorter: (a, b) => a.Amount - b.Amount,
          },
          {
            title: "Check",
            dataIndex: "Amount",
            sorter: (a, b) => a.Amount - b.Amount,
          },
      ];
      const columns1  =[
        {
          title: "file Name",
          dataIndex: "PaymentDate",
             
          sorter: (a, b) => a.PaymentDate - b.PaymentDate,
        },
      ]
      const columns3  = [
        {
          title: "File Name	",
          dataIndex: "PaymentDate",
             
	 
          sorter: (a, b) => a.PaymentDate - b.PaymentDate,
        },
        {
          title: "Amount	",
          dataIndex: "TransactionNumber",
          sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
        },
        {
          title: "File Status",
          dataIndex: "Amount",
          sorter: (a, b) => a.Amount - b.Amount,
        },
        {
            title: "File",
            dataIndex: "Amount",
            sorter: (a, b) => a.Amount - b.Amount,
          },
          {
            title: "Type	Select",
            dataIndex: "Amount",
            sorter: (a, b) => a.Amount - b.Amount,
          },
      ];
  return (
    <div>
        <div>

        <Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
          Oxy CMS
        </span>
      }
      key="1"
    >
{/* Oxy CMS */}

<Radio.Group name="radiogroup mt-1 " defaultValue={1}>
    <Radio value={1}><strong>Notification to groups: </strong></Radio>
  </Radio.Group>   
  <Button type="primary"> Approve to CMS</Button>
<div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs mt-2"
                        pagination={{
                          total: getMembershiphistory.apiData,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
                        loading={membershiphistory.loading}
                        onChange={membershiphistoryPagination}
                      />   
                    </div>
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          Before Files
        </span>
      }
      key="2"
    > 
                  <div className="row mt-2">

<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Date Range
      <span className="login-danger">*</span>
    </label>
    <select
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    >
        <option>-- Choose --</option>
        <option>Date Range</option>
        </select>
  </div>
</div>


<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Date Range
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the Start Date"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Date Range
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther start Date"
    />
  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Date Range
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther start Date"
    />
  </div>
</div>
<div className="col-3">
  <div className="student-submit">
    <button
      type="button"
      className="btn btn-primary"
    >
      Fetch Deatils
    </button>
  </div>
</div>
</div>
<div  className='mt-1'>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: getMembershiphistory.apiData,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
                        loading={membershiphistory.loading}
                        onChange={membershiphistoryPagination}
                      />
                    </div>
    </TabPane>

    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          CMS Status
        </span>
      }
      key="3"
    > 
       CMS Status


       <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: getMembershiphistory.apiData,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns1}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
                        loading={membershiphistory.loading}
                        onChange={membershiphistoryPagination}
                      />
                    </div>
    </TabPane>

    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          CMS Failure Files
        </span>
      }
      key="4"
    >  
    CMS Failure Files

    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: getMembershiphistory.apiData,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns1}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
                        loading={membershiphistory.loading}
                        onChange={membershiphistoryPagination}
                      />
                    </div>
    </TabPane> 
                      
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          Student   Loan
        </span>
      }
      key="5"
    >  
   Student Loan

   <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: getMembershiphistory.apiData,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
                        loading={membershiphistory.loading}
                        onChange={membershiphistoryPagination}
                      />
                    </div>
    </TabPane>
  </Tabs>
        </div>
    </div>
  )
}
