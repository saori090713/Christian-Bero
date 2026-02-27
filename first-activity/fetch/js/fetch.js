async function getData() {
    const response = await fetch(
        'http://localhost/api/student-list.php'
    );
     const data = await response.json();
    
}

async function submitData() {
    const data = {
        username: 'admin',
        password: 'admin123'
    }
    const response =
        await fetch(
            'http://localhost/api/student-list.php', {
                method: 'POST',
                headers: {
                    'Const-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resDATA = await response.json();
            console.log(resDATA.success);
        }