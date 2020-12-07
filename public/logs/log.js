
 const myMap = L.map('checkInMap').setView([0, 0], -1);
 const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

 const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(myMap);

  getData()

async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for (item  of data) {
        const mark = L.marker([item.lat, item.long]).addTo(myMap);

        let text = `This was  reported  at  ${item.lat} and  ${item.long}. The  temp  was ${item.temp}.
        The precipitation was ${item.precip}.`;
        
        const root = document.createElement('div');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        mood.textContent = `mood: ${item.input}`;
        geo.textContent = `geo: ${item.lat}, ${item.long}`;
        date.textContent = `time: ${item.timestamp}`;
        root.append(mood,geo,date);
        document.body.append(root);

        mark.bindPopup(text);
    }


    

}

