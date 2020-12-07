






//https://www.youtube.com/watch?v=ZtLVbJk7KcM&t=99s
    
    if('geolocation' in navigator) {
    function myFunction(image64) {
    

    

   
   
    
    
    
    navigator.geolocation.getCurrentPosition( async position => {

        try{
    console.log(position);
  
    
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    document.querySelector("#lat").innerHTML = lat.toFixed(2);
    document.querySelector("#long").innerHTML = long.toFixed(2);
    const api_url = `/weather/${lat},${long}`;
    const response2 = await fetch(api_url);
    const json2 = await response2.json();
    console.log(json2)
    let temp = json2.weather.temp.value;
    let precip = json2.weather.precipitation.value;
    let humidity = json2.weather.humidity.value;
    
    const  data =  {lat, long, temp, precip, humidity};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    };
    const response = await fetch('/api', options);
    const json = await response.json();



    
    document.getElementById("temp").textContent = temp;
    document.getElementById("precip").textContent = precip;
    document.getElementById("humidity").textContent = humidity;
    let air = json2.air_quality.results[0].measurements[0].value;
    if (json2.air_quality.results[0] = null) {
        air = "no results";
        console.log("Air equals" + air);
    }







    
    document.getElementById("air").textContent = air;


        } catch(error){
            console.log("something went awry");
            air = {value:-1};
        }


    //let input = document.getElementById("searchtext").value;
    //document.getElementById("temp").textContent = json2.temp.value;
   

 
    
    

    
    });}





    
    
   
    
} else {
console.log('No location for you');


}






