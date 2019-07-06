var timeout;

getStorage();

function getStorage(){
   console.log("Running getStorage()")
   chrome.storage.sync.get(['info'], result => {
      if(result.info){
         console.log(result);
         timeout = window.setTimeout(() => {
            console.log("Creating notification")
            displayNotification(result.info.title,result.info.time,result.info.unit);
            if(result.info.repeating == true){
               console.log("Repeating == true");
               getStorage();
            }
         }, result.info.milliseconds)
      }
   })
}

function displayNotification(title,time,unit){
   let options = {
      body: `It's been ${time} ${unit}s`
   }

   let today = new Date();

   let heading = `${title} - ${today.toLocaleTimeString()}`
   let n = new Notification(heading, options);   
}

chrome.runtime.onConnect.addListener(function(port) {
   port.onMessage.addListener(function(msg) {
      console.log(msg);
      if (msg.storage == true){
         console.log("Storage == true");
         if(timeout){
            clearTimeout(timeout);
         }
         getStorage();
      }
      else if (msg.storage == false)
         alert("Storage is false");        
   });
 });

 chrome.runtime.onConnect.addListener(function(port) {
   port.onMessage.addListener(function(msg) {
      if(msg.stop == true){
         console.log("Stopping timer")
         clearTimeout(timeout);
      }
   })
})
