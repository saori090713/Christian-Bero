async function submitData() {
    const data = {
        username: 'admin',
        password: 'admin123'
    };

    const response = await fetch (
        'http://localhost/api/student-list.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const resDATA = await response.json();
    console.log (resDATA.success);
}
