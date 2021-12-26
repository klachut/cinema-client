loadHeader(1);

function loadHeader(showId){
    fetch('http://127.0.0.1:8080/api/shows')
        .then(resp => resp.json())
        .then(resp => {

            if(resp.length !== 0){
                document.querySelector('.header').style.setProperty('height', 'auto');
                resp = resp[0];
                document.getElementById('reservationTitle').innerText = resp.title;
                document.getElementById('reservationDescription').innerText = resp.description;
                document.getElementById('reservationDirector').innerText = 'Reżyser: ' + resp.director;
                document.getElementById('reservationScenario').innerText = 'Scenariusz: ' + resp.scenario;
                document.getElementById('reservationType').innerText = 'Gatunek: ' + resp.type;
                document.getElementById('reservationProduction').innerText = 'Produkcja: ' + resp.production;
                document.getElementById('reservationPremiere').innerText = 'Premiera: ' + resp.premiere;
                document.querySelector('.headerButton').innerHTML += `<a href="reservation.html" class="btn btnMoreInfo" id="`+showId+`" >Więcej &#8594;</a>`;
                document.getElementById('pictureActualyFilm').innerHTML = `<img src="file/`+resp.pictureName+`.jpg" alt="av">`;
                document.querySelector('.btnMoreInfo').addEventListener('click', function (){
                    localStorage.clear();
                    localStorage.setItem('showId', document.querySelector('.btnMoreInfo').getAttribute('id'));
                });
            }else{
                document.querySelector('.header').innerHTML = `<div class="anyShows">Przepraszamy, ale aktualnie nic nie gramy :/</div>`;
            }
        });

}


