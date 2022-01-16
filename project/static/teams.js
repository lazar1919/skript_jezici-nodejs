function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/teams', {
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
                                    <button type="button" id="delete${el.id}">Delete</button>
                                    <button type="button" id="update${el.id}">Update</button>
                                    <button type="button" id="addPlayer${el.id}">Add Player</button>
                                </li>`;
                deleteButton = this.document.getElementById(`delete${el.id}`);
                deleteButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/teams/${el.id}`, {
                        method: 'DELETE',
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        },
                    })
                        .then( res => res.json() )
                        .then( el => {
                            if (el.msg) {
                                alert(el.msg);
                            } else {
                                window.location.href = 'teams.html';
                            }
                        });
                    });
                updateButton = this.document.getElementById(`update${el.id}`);
                updateButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/teams/${el.id}`, {
                        method: 'DELETE',
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        },
                    })
                        .then( res => res.json() )
                        .then( el => {
                            if (el.msg) {
                                alert(el.msg);
                            } else {
                                window.location.href = 'addUser.html';
                            }
                        });
                    });
                this.document.getElementById(`addPlayer${el.id}`).addEventListener('click', e=> {
                    window.location.href = `addPlayer.html?teamId=${el.id}`;
                });
                
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
