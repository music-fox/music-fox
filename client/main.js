
function fetchPost() {
    $.ajax({
        url: 'http://localhost:3000/user-music-list',
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })

        .done(data => {
            data.forEach(element => {
                $('#post-container').append(`
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <iframe src="https://open.spotify.com/embed/track/${element.trackId}" width="250" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">lyrics</a>
                        <a href="#" class="card-footer-item">delete</a>
                    </footer>
                </div>
            </div>`)
            });
        })
    //console.log(data)
}

$(document).ready(function () {
    fetchPost()

})