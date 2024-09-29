import React from "react";

const RootContext =React.createContext();

const RootProvider=({children})=>{
    const [cart, setCart]=React.useState([]);
    const [loginInfo, setLoginInfo]=React.useState({IsLoggedIn:false, CustomerName:'',PhoneNumber:'', EmailAddress:''});
    return(
        <RootContext.Provider value={{cart,setCart,loginInfo,setLoginInfo }} >
            {children}
        </RootContext.Provider>
    )
}

export{RootContext,RootProvider};