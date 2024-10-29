import React, { useEffect, useState } from 'react'
import { useAuthenticatedFetch } from '../../hooks'
import { setShopDetails } from "../app/slices/ShopDetailsSlice";
import { useDispatch } from "react-redux";

function About() {

  const fetch = useAuthenticatedFetch()
  // const dispatch = useDispatch();

  const [shoData, setShopData] = useState({});
  const shopDetails = () => {
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }

    fetch("/api/auth/shopDetails", config)
      .then(res => res.json())
      .then(res => {
        console.log(res, ': shop details api result');
        setShopData(res?.result);
        // dispatch(setShopDetails(res?.result));
      })
      .catch(err => {
        console.log(err, ' :error in get shop details api');
      });
  }

  useEffect(() => {
    shopDetails();
  }, []);

  return (
    <div className='flex flex-col gap-[10px] justify-center items-center h-[80vh]'>
      <h1 className='text-[35px]'>Welcome to the shopify new app !</h1>
      <p>{shoData?.shop}</p>
    </div>
  )
}

export default About