function setStorage(title, time, milliseconds, unit,repeating){
   let info = {
      "title":title,
      "time":time,
      "milliseconds":milliseconds,
      "unit":unit,
      "repeating":repeating
   }
   chrome.storage.sync.set({'info':info})
}

window.onload = function(){
   Notification.requestPermission().then(function(result){
      console.log(result);
   });

   setAlertBtn = document.getElementById('setAlert');
   stopAlertBtn = document.querySelector('#stopAlert');

   setAlertBtn.addEventListener('click', () => {   
      let title = document.querySelector('#title').value;
      let time = document.querySelector('#time').value;
      let unit = document.querySelector('#unit').value;
      let repeating = document.querySelector('#repeat').checked;
      
      let tempTime = "";
      
      switch (unit) {
         case 'second':
            tempTime = time * 1000;
            console.log(tempTime);
            break;
         case 'minute':
            tempTime = time * 60000;
            console.log(tempTime);
            break;
         case 'hour':
            tempTime = time * 3600000;
            console.log(tempTime);
            break;
         default:
            break;
      }

      setStorage(title, time, tempTime, unit, repeating);

      var port = chrome.runtime.connect({name: "knockknock"});
      port.postMessage({storage: true});
   })

   stopAlertBtn.addEventListener('click', () => {
      var port = chrome.runtime.connect({name:"knockknock"});
      port.postMessage({stop:true});
          
      chrome.storage.sync.remove(['info'], result => {
         console.log(result);
      })  
   })
}
