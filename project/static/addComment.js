function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const v1 = window.location.href.split('?')[1].split('&')[0];
        const v2 = window.location.href.split('?')[1].split('&')[1];
        console.log(v1);
        console.log(v2);

        const data = {
            userId: v1.split('=')[1],
            playerId: v2.split('=')[1],
            rating: document.getElementById('rating').value,
            comment: document.getElementById('comment').value
        };

        fetch('http://127.0.0.1:8080/api/comments', {
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
                    window.location.href = 'index.html';
                }
            });
    });
}