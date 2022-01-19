function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('userList');

            data.forEach( el => {
                lst.innerHTML += `<li>
                                    ID: ${el.id}, 
                                    FirstName: ${el.firstName},
                                    LastName: ${el.lastName},
                                    username: ${el.username},
                                    role: ${el.role}
                                    <button type="button" onclick="deleteUsr(${el.id})" id="delete${el.id}">Delete</button>
                                    <button type="button" onclick="updateUsr(${el.id})" id="update${el.id}">Update</button>
                                </li>`;
            });
                    
        });

    document.getElementById('addUser').addEventListener('click', e=> {
        window.location.href = 'addUser.html';
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
