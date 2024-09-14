export const xml_req = (method,url,body,json = false) =>{

    const xhr = new XMLHttpRequest()

    try {
      xhr.open(method.toUpperCase(),url,false)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
      body?xhr.send(body):xhr.send()
    } catch (error) {
      console.log(error);
    }

    return json ? JSON.parse(xhr.responseText) : xhr
}

export const compareTwoDict = (dict_1, dict_2) =>{
  if (dict_1 === dict_2) return true; // Same reference or primitive types
  
  if (typeof dict_1 !== 'object' || typeof dict_2 !== 'object' || dict_1 === null || dict_2 === null) {
      return false;
  }
  
  const keys1 = Object.keys(dict_1);
  const keys2 = Object.keys(dict_2);
  
  if (keys1.length !== keys2.length) {
      return false;
  }
  
  for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(dict_1[key], dict_2[key])) {
          return false;
      }
  }
  
  return true;
}