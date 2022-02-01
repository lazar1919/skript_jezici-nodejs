function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8080/api/teams', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('teamList');

            data.forEach( el => {
                lst.innerHTML += `<li>
                                    ID: ${el.id}, 
                                    name: ${el.name}, 
                                    country: ${el.country}, 
                                    trainerName: ${el.trainerName}
                                    <button type="button" onclick="deleteTeam(${el.id})" id="delete${el.id}">Delete</button>
                                    <button type="button" onclick="updateTeam(${el.id})" id="update${el.id}">Update</button>
                                    <button type="button" onclick="addPlayer(${el.id})" id="addPlayer${el.id}">Add Player</button>
                                </li>`;
            });
        });

    document.getElementById('addTeam').addEventListener('click', e=> {
        window.location.href = 'addTeam.html';
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
