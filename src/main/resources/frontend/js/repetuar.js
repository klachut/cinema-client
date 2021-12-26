loadContent();

let today = new Date();
let polDay = {
    "Mon" : "Pon",
    "Tue" : "Wt",
    "Wed" : "Śr",
    "Thu" : "Czw",
    "Fri" : "Pt",
    "Sat" : "Sob",
    "Sun" : "Nd"
};

let polMont = {
    "01" : "Sty",
    "02" : "Lut",
    "03" : "Mar",
    "04" : "Kwi",
    "05" : "Maj",
    "06" : "Cze",
    "07" : "Lip",
    "08" : "Sie",
    "09" : "Wrz",
    "10" : "Paź",
    "11" : "Lis",
    "12" : "Gru",
};

for(let i = 0; i < 14; i++){
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + i);
    let dd = String(nextDay.getDate()).padStart(2, '0');
    let mm = String(nextDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    let tab = nextDay.toString().split(' ');
    let yyyy = today.getFullYear();
    document.querySelector('.containerRepertuarSelectDay').innerHTML += `<div class="repertuarSelectDay" id="`+yyyy+'-'+mm+'-'+dd+`"><div><p>`+polDay[tab[0]]+`</p><p class="numberOfDay">`+dd+`</p><p>`+polMont[mm]+`</p></div></div>`;
}
let selectDay = document.querySelectorAll('.repertuarSelectDay');
selectDay.forEach(n=>{
    n.addEventListener('click', function (){
        loadContent(n.getAttribute('id'));
    });
});



function loadContent(id){
    fetch('http://127.0.0.1:8080/api/shows')
        .then(resp => resp.json())
        .then(resp => {
            if(resp.length!==0){
                if(id !== undefined){
                    let todayShows = [];
                    resp.forEach(n=>{
                        let data = n.showStart.toString().split(' ');
                        if( data[0] === id){
                            todayShows.push(n);
                        }
                    });
                    todayShows.sort(getSortOrder('showStart'));
                    resp = todayShows;
                }
                resp.sort(getSortOrder('showStart'));
                if(resp.length > 0){
                    document.querySelector('.categories').innerHTML ="";

                    for(let i = 0; i<resp.length; i++){
                        let gwiazdki = `<div class="rating">`;
                        let licznik_gwiazdek = 0;
                        let ocena = resp[i].ratingFromFilmweb/1.6;
                        if(ocena > 5){
                            ocena = 5;
                        }
                        let pelne_gwiazdki = parseInt(ocena);

                        for(let i=0; i<5; i++){
                            if(i<pelne_gwiazdki){
                                gwiazdki += `<i class="fa fa-star"></i>`;
                            }else if(ocena-pelne_gwiazdki>0){
                                gwiazdki += `<i class="fa fa-star-half-o"></i>`;
                                ocena = 0;
                            }else{
                                gwiazdki += `<i class="fa fa-star-o"></i>`;
                            }
                            licznik_gwiazdek++;
                        }
                        gwiazdki += `</div>`;

                        document.querySelector('.categories').innerHTML += `
                        
                        
                        <div class="row rowRepertuar">
                                <div class="col-5 titleBaner">
                                    <h3> Data:  `+resp[i].showStart+`</h3>
                                    <img src="file/`+resp[i].pictureName+`.jpg" alt="av">
                                    <h4 id="repertuarTitleSmall">`+resp[i].title+`</h4>
                                    `+gwiazdki+`
                                    
                                    <p>VIP 20.80 zł / Normal 16.00 zł</p>
                                </div>
                                <div class="col-5">
                                    <div style="width: 100%; padding-right: 0">
                                        <h2 id="repertuarTitleMain">`+resp[i].title+`</h2>
                                        <p id="repertuarDescription">`+resp[i].description+`</p><br>
                                    </div>
                                    <div >
                                        <ul>
                                            <li id="repertuarDirector">Reżyser: `+resp[i].director+`</li>
                                            <li id="repertuarScenario">Scenariusz: `+resp[i].scenario+`</li>
                                            <li id="repertuarType">Gatunek: `+resp[i].type+`</li>
                                            <li id="repertuarProduction">Produkcja: `+resp[i].production+`</li>
                                            <li id="repertuarPremiere">Premiera: `+resp[i].premiere+`</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <a href="reservation.html" class="btn btnRepertuar" id="`+resp[i].showId+`" ">Więcej &#8594;</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                    const btnMoreInfo = document.querySelectorAll('.btnRepertuar');
                    for (let i = 0; i < btnMoreInfo.length; i++) {
                        btnMoreInfo[i].addEventListener("click", function() {
                            localStorage.clear();
                            localStorage.setItem('showId', btnMoreInfo[i].getAttribute('id'));
                        });
                    }
                    if(id !== undefined){
                        let element = document.querySelector('.containerRepertuarSelectDay');
                        element.scrollIntoView();
                        element.scrollIntoView(false);
                        element.scrollIntoView({block: "start"});
                        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    }

                }else{

                    document.querySelector('.categories').innerHTML = `<div class="anyShows">Przepraszamy, aktualnie nic nie gramy :/</div>`;
                }

            }else{
                document.querySelector('.categories').innerHTML = `<div class="anyShows">Przepraszamy, ale aktualnie nic nie gramy :/</div>`;
            }

        });
}

function getSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}