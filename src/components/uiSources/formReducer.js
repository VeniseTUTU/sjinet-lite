import React, {useReducer,createContext} from "react";

const Context = createContext();
const statedata = {};

const reducer = (statedata,action) => {

    if(action.type === 'submit'){
     
     let payload = action.payload;
     let cleanJar =[];
     const newState= {...statedata};   
    for(let [key, val] of Object.entries(payload)){
        
    const err = validateField(key,val,statedata);
    if(err) {
        newState[`${key}Err`]= err;
        newState[`submit`]= false;
        cleanJar.push(err);
     }
     !cleanJar.length  && (newState[`submit`]= true);
     
    }
    
    return newState;

    }

    if(action.type === 'firstname'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    
    }

     if(action.type === 'lastname'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'gender'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'phone'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'email'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'password'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload,statedata);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'newpassword'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'password2'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload,statedata);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

   if(action.type === 'country'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

    if(action.type === 'touchpoint'){

        let field = action.type;
        let err='';
        return  {...statedata, [field]: action.payload, [`${field}Err`]: err};
    }

    if(action.type === 'code'){

        let field = action.type;
        let payload = action.payload;
        const err = validateField(field,payload);
        return  {...statedata, [field]: payload, [`${field}Err`]: err};
    }

};

const validateField = (field,value,state={}) => {
    if(field ===`firstname`){
        if(!value.length) {
            return  'Field is required';
        }
        return '';
    }

    if(field ===`lastname`){
        if(!value.length) {
            return  'Field is required';
        }
       return '';
    }
    if(field ===`gender`){
        if(!value || value === 'gender') {
            return  'Pick a gender';
        }
         return '';
    }
    if(field ===`phone`){
        if(!value.length) {
            return  'Provide a number';
        }
    return '';
    }
    if(field ===`email`){
        if(!value.length) {
            return  'Provide valid email';
        }
    return '';
    }
    if(field ===`password`){
        if(value.length < 6) {
            return  'Password must be minimum of 6 characters';
        }
    return '';
    }
    if(field ===`newpassword`){
        if(value.length < 6) {
            return  'Password must be minimum of 6 characters';
        }
    return '';
    }
    if(field ===`password2`){
        if(value.length < 6) {
            return  'Password must be minimum of 6 characters';
        }else if (state['password'] !== value){
            return  'Password must match';
        }
    return '';
    }
    if(field ===`country`){
        if(!value || value === 'country') {
            return  'Pick a country';
        }
    return '';
    }
    if(field ===`code`){
        if(!value.length) {
            return  'Invalid input';
        }
    return '';
    }
    
    
}



/*
const FormReducer = ({children}) => {
    const [state,dispatch] = useReducer(reducer,statedata);
    return(
    <Context.Provider value={{state,dispatch}}>
       {children}
    </Context.Provider>
    );
};
*/

export {
    reducer,
    statedata
} 