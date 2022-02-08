function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        console.log(window.location.search);

        const data = {
            teamId: window.location.href.split('=')[1],
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            number: document.getElementById('number').value
        };

        fetch('http://127.0.0.1:8088/api/players', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
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
}