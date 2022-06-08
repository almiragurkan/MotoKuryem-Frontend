import React from "react"

export const MyContext=React.createContext({isAuthenticated:false, isCourier:false,token:"", setValue:()=>{}});