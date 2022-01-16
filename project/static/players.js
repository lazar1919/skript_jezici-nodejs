function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/players', {
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
                                    <button onclick="functionDelete()">Delete</button>
                                    <button onclick="functionUpdate()">Update</button>
                                    <button onclick="functionAddComment()">Add Comment</button>
                                </li>`;
            });
        });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
