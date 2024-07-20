function deepCopy(obj) {
    // Check if the input is an object or array, otherwise return the value itself
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    // Handle Date objects
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
  
    // Handle Array objects
    if (Array.isArray(obj)) {
      const arrCopy = [];
      for (let i = 0; i < obj.length; i++) {
        arrCopy[i] = deepCopy(obj[i]);
      }
      return arrCopy;
    }
  
    // Handle Object
    if (obj instanceof Object) {
      const objCopy = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          objCopy[key] = deepCopy(obj[key]);
        }
      }
      return objCopy;
    }
  
    throw new Error('Unable to copy object! Its type is not supported.');
  }

  
export default deepCopy