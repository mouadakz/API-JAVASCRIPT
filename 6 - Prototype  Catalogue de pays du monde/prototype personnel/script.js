let api = "https://countries-api-hsak.onrender.com/api/countries/";
let parent = document.getElementById("d");
let filter = document.getElementById("s");
let datadiali = [];

async function fetcha() {
  let response = await fetch(api);
  let data = await response.json();

  datadiali = [...new Map(data.map(item => [item.name, item])).values()];

  localStorage.setItem('countriesList', JSON.stringify(datadiali));

  display(datadiali);

}

function display(data) {
  parent.innerHTML = "";

  data.forEach(p => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.flag}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="card-info">
        <p class="capital">${p.capital}</p>
        <p class="language">${p.language}</p>
        <p class="continent">${p.continent}</p>
      </div> 
    `;

    card.addEventListener('click', () => {
      localStorage.setItem('selectedCountry', JSON.stringify(p));

      let utter = new SpeechSynthesisUtterance(p.name);
      utter.lang = 'eng';
      speechSynthesis.speak(utter);

      window.location.href = 'country-details.html?id=' + p.id;
    });

    parent.appendChild(card);
  });
}
filter.addEventListener('change', () => {
  const selected = filter.value;
  if (selected === 'all') {
    display(datadiali);
  } else {
    const filtered = datadiali.filter(
      c => c.continent.toLowerCase() === selected.toLowerCase()
    );
    display(filtered);
  }
});


fetcha();

