import React from 'react'
import './user.css'
import { useLocation } from 'react-router-dom';

export default function Usercard_user({data}) {

    const location = useLocation();
    const whatsappLoginResponse = location.state?.whatsappLoginResponse || [];

  console.log(whatsappLoginResponse)
  return (
    <div>
        <div class="card_user">
   
        <div class="card_user-subtitle">{data.userId}</div>
        <div class="card_user-title">{data.name} </div>
    <div class="card_user-subtitle">{data.email}</div>
    <hr class="card_user-divider"></hr>
    <div class="card_user-footer card_user-footer11">
    
        <button class="card_user-btn">
          Login
          </button>
    </div>
</div>
    </div>
  )
}
