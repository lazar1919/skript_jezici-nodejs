function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8080/api/players', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('playerList');

            data.forEach( el => {
                lst.innerHTML += `<li>
                                    ID: ${el.id}, 
                                    team: ${el.team.name}, 
                                    firstName: ${el.firstName}, 
                                    lastName: ${el.lastName},
                                    number: ${el.number}
                                    <button type="button" onclick="deletePlayer(${el.id})" id="delete${el.id}">Delete</button>
                                    <button type="button" onclick="updatePlayer(${el.id})" id="update${el.id}">Update</button>
                                    <button type="button" onclick="addComment(${el.id})" id="addComment${el.id}">Add Comment</button>
                                </li>`;
            });
        });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
