const url = "https://8951158f-03c5-40fc-99b5-a8d2371886a7-00-1f3fpbbi02jht.pike.replit.dev:3000/api/initData"

async function sendData(){
   
const response = await fetch(url, {
headers: {   
   'Accept': 'application/json',
   'Content-Type': 'application/json'
},
method: "POST",
body: JSON.stringify( {initData: window.Telegram.WebApp.initData})
})   
return response.json()
}

const cantent = document.getElementById("cantent");

(async function (){
   try{

      let result = await sendData()
      if(result.isValid){
         cantent.innerHTML += `<p> hello bot;</p>
          <img style="width:50px ;" src="images/VENESIA.jpg" alt="картинка">`
           
      }

   }catch(error){
      console.log(error);
   }

})()




