
export const stripWhiteSpaceAndLowCap = (string) => {
    const lowercase = string.toLowerCase().replace(/ /g, '');
      return lowercase;
};

export const deDupArray = (arr,key) => {
   /*
  let store = [];
  let result = [];
    arr.map((item) => {
      if (!store.length) result; 
      if (!store.includes(item[key])) result.push(item);
      store.push(item[key]);
      });
    return result; 
    */
   
return arr.filter((x, index,newArray) => 
 index === newArray.findIndex((t) => (
	 t[key] === x[key]
 ))
)
  
  };

export const filterWord = (data,catg) => {
  return data.filter((categ) => (categ.subCategory === catg.toUpperCase()));
 
}

export const rounNumberToPresision = (num,presision) => {
  const mult = Math.pow(10, presision || 0);
  return Math.round(num * mult) / mult;
}

export const getDaysBetween = (date1, date2) =>{

  let d1 = +date1;
  let d2 = date2;
  
   let diff = (d2.getTime() - d1) / 1000;
   diff /= (60 * 60 * 24 );
     
   if (diff > 365) {
     diff /= 365;
     const vd = Math.abs(diff).toFixed(1).split('.').shift();
     return vd+' years';
     
   }
   
   if (diff >= 30 && diff <=365 ) {
     diff /= 30;
     const vd = Math.abs(diff).toFixed(1).split('.').shift();
     return vd+' months';
     
   }
 
   if (diff <= 30) {
    
     const vd = Math.abs(diff).toFixed(1).split('.').shift();
     return vd==='0' ? 'today': vd+' days';
     
    
   }
 }
 
export const toggleQuality = (qualityLevels) => {
  let enable720 = true;
  return () => {
    for( let qualityLevel of qualityLevels){
     if(qualityLevel.width >= 720){
       qualityLevel.enabled = enable720;
     }else{
       qualityLevel.enabled = !enable720;
     }
    }
    enable720 = !enable720;
  };
}

