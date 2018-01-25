'use babel';

export default function sendRequest(url,options){
  options.headers = options.headers?options.headers:{}
  options.headers["content-type"] = "application/json"
  return new Promise(function(resolve,reject){
    fetch(url,options)
    .then(function(response){
      let contentType = response.headers.get('content-type')
      if (contentType.includes('application/json')) {
        return response.json()
      } else if (contentType.includes('text/html')) {
        return response.text()
      }
    })
    .then(function(res){
      resolve(res);
    })
    .catch(function(err){
      reject(err);
    })
  })

}
