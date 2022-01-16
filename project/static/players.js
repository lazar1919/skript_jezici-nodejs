function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/players', {
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
                                    <button type="button" id="delete${el.id}">Delete</button>
                                    <button type="button" id="update${el.id}">Update</button>
                                    <button type="button" id="addComment${el.id}">Add Comment</button>
                                </li>`;

                deleteButton = this.document.getElementById(`delete${el.id}`);
                deleteButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/players/${el.id}`, {
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
                                window.location.href = 'players.html';
                            }
                        });
                    });
                updateButton = this.document.getElementById(`update${el.id}`);
                updateButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/players/${el.id}`, {
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
                                window.location.href = 'addPlayer.html';
                            }
                        });
                    });
                this.document.getElementById(`addComment${el.id}`).addEventListener('click', e=> {
                    window.location.href = `addComment.html?userId=1&playerId=${el.id}`;
                });
            });
        });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
