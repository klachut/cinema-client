loadContent();

function loadContent(){
    fetch('http://127.0.0.1:8080/api/shows')
        .then(resp => resp.json())
        .then(resp => {
            if(resp.length >0){
                let arrayShows = [];
                for(let i=0; i<resp.length; i++){
                    arrayShows.push(resp[i]);
                }

                arrayShows.sort(getSortOrder("ratingFromFilmweb"));
                for(let i=0; i<3; i++){
                    let gwiazdki = `<div class="rating">`;
                    let ocena = arrayShows[arrayShows.length-i-1].ratingFromFilmweb/1.6;
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
                    }
                    gwiazdki += `</div>`;

                    if(arrayShows.length-i>=0){
                        document.getElementById('recomendSeans').innerHTML += `
                        <div class="col-4">
                             <a href="reservation.html" class="imgListener" id="`+arrayShows[arrayShows.length-i-1].showId+`"><img src="file/`+arrayShows[arrayShows.length-i-1].pictureName+`.jpg" alt="av"></a>
                            <h4>`+arrayShows[arrayShows.length-i-1].title+`</h4>
                            `+gwiazdki+`
                            <p>20.00 zł</p>
                        </div>`;
                    }
                }

                const imgListener = document.querySelectorAll('.imgListener');
                for (let i = 0; i < imgListener.length; i++) {
                    imgListener[i].addEventListener("click", function() {
                        localStorage.clear();
                        localStorage.setItem('showId', imgListener[i].getAttribute('id'));
                    });
                }
            }else{
                document.getElementById('recomendSeans').innerHTML = `<div class="anyShows">Przepraszamy, ale aktualnie nic nie gramy :/</div>`;
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