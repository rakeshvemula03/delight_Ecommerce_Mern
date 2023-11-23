/*function ImagetoBase64(file){
    const reader = new FileReader()
    reader.readAsDataURL(file)

    const data = new Promise((resolve,reject)=>{
        reader.onload = ()=> resolve(reader.result)
        reader.onerror = err=> reject(err)
    })
    return data
}
export {ImagetoBase64}
*/
function ImagetoBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        // Resolve the Promise with the result
        resolve(reader.result);
      };
  
      reader.onerror = (err) => {
        // Reject the Promise with the error
        reject(err);
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  export { ImagetoBase64 };
  