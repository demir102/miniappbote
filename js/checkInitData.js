import crypto from "crypto"

function checkInitData(initData, botToken){
     const decoded = decodeURIComponent(initData); 

    const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken);

    const arr = decoded.split('&');
    const hashIndex = arr.findIndex(str => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0].split('=')[1];

    arr.sort((a, b) => a.localeCompare(b));

    const dataCheckString = arr.join('\n');

    const _hash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

    if(_hash === hash){
     return true
    }
   else{
     return false
   }
 }



export {checkInitData}



