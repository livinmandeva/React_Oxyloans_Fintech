import React, { useEffect } from 'react';
import './user.css';
import { useNavigate } from 'react-router-dom';
import { handelapidata } from '../../HttpRequest/beforelogin';

const Whatappuser = ({ data1 }) => {
  // Log the initial value of data1
  console.log('Initial data1:', data1);



  
  const history = useNavigate();

  useEffect(() => {
    // Log data1 whenever it changes

    console.log('Updated data1:', data1);
  }, [data1]);


  const handelapi = async (userId) => {
    try {
      console.log(userId);
      const response = await handelapidata(userId);
      const data = response.data;
  console.log(response.data)
      const accessToken = response.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);
     
  
      if (accessToken != null) {
        if (data.primaryType === "LENDER" || data.primaryType === "ADMIN") {
          history("/dashboard");
        } else if (data.primaryType === "BORROWER") {
          history("/borrowerDashboard");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
 
  // console.log()
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="logincard">
              <h6><strong>Note :  </strong> Multiple users are mapped with the given WhatsApp number. To proceed, please select the user you want to log in</h6>
              {/* Render user cards based on data1 */}
              <br></br>
              {data1 && data1.length > 0 && data1.map((userData, index) => (
                <div key={index}>
                  <div className="card_user">
                    <div className="card_user-subtitle">{userData.userId}</div>
                    <div className="card_user-title">{userData.name}</div>
                    <div className="card_user-subtitle">{userData.email}</div>
                    <hr className="card_user-divider" />
                    <div className="card_user-footer card_user-footer11">
                      <button className="card_user-btn"   onClick={()=>handelapi(userData.userId)}>
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Whatappuser;
