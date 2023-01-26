const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){
    // CRIAR A TABELA
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                imagem TEXT,
                title TEXT,
                category TEXT,
                description TEXT,
                link TEXT
        );`
    )

    // INSERIR DADOS NA TABELA
    const query = `INSERT INTO ideas(
        imagem,
        title,
        category,
        description,
        link) VALUES (?, ?, ?, ?, ?);`

    const values = [
        'https://cdn-icons-png.flaticon.com/512/2729/2729048.png',
        'Recortes',
        'Criatividade',
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
        'https://rocketseat.com.br'
    ]

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this)
    // }) 

    // DELETAR UM DADO DA TABELA
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
    //     if (err) return console.log(err)

    //     console.log('DELETEI', this)
    // })

    // CONSULTAR DADOS NA TABELA
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })
})

module.exports = db