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
                                    <button type="button" id="delete${el.id}">Delete</button>
                                    <button type="button" id="update${el.id}">Update</button>
                                </li>`;
                deleteButton = this.document.getElementById(`delete${el.id}`);
                deleteButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/users/${el.id}`, {
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
                                window.location.href = 'users.html';
                            }
                        });
                    });
                updateButton = this.document.getElementById(`update${el.id}`);
                updateButton.addEventListener('click', e=> {
                    fetch(`http://127.0.0.1:8000/admin/users/${el.id}`, {
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
