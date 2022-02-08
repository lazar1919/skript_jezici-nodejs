function init() {
    fetch('http://127.0.0.1:8088/api/comments', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('commentsList');

            data.forEach( el => {
                lst.innerHTML += `<li>
                                    ID: ${el.id}, 
                                    username: ${el.user.username}, 
                                    Player: ${el.player.firstName} ${el.player.lastName}, 
                                    Rating: ${el.rating}, 
                                    Comment: ${el.comment},
                                    <button type="button" onclick="deleteCom(${el.id})" id="delete${el.id}">Delete</button>
                                    <button type="button" onclick="updateCom(${el.id})" id="update${el.id}">Update</button>
                                </li>`;
            });
        });

    document.getElementById('login').addEventListener('click', e => {
        window.location.href = 'login.html';
    });
}
