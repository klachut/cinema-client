loadContent();

function loadContent(){
    fetch('http://127.0.0.1:8080/api/shows')
        .then(resp => resp.json())
        .then(resp => {
            if(resp.length > 0){
                let arrayShows = [];
                resp.forEach(n=>{
                    arrayShows.push(n);
                });

                arrayShows.sort(getSortOrder("showStart"));
                for(let i=0; i<3; i++){
                    if(arrayShows.length>0){
                        document.getElementById('closestShows').innerHTML += `
                        <div class="col-3">
                            <div>
                                <p class="dateClosestSeans closestSeansDate">`+arrayShows[i].showStart+`</p>
                                <a href="reservation.html" class="imgListener" id="`+arrayShows[i].showId+`"><img src="file/`+arrayShows[i].pictureName+`.jpg" alt="av"></a>
                                <p class="titleClosestSeans closestSeansTitle">`+arrayShows[i].title+`</p>
                            </div>
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
                document.getElementById('closestShows').innerHTML = `<div class="anyShows">Przepraszamy, ale aktualnie nic nie gramy :/</div>`;
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