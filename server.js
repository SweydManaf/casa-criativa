// usei o express para criar e configurar meu servidor
const express = require('express')
const server = express()

const db = require('./db')

// const ideas = [
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/2729/2729007.png',
//         title: 'Cursos de Programação',
//         category:'Estudo',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     },
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/2729/2729064.png',
//         title: 'Exercícios',
//         category:'Saúde',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     },
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/2729/2729027.png',
//         title: 'Meditação',
//         category:'Mentalidade',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     },
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/9096/9096208.png',
//         title: 'Banho',
//         category:'Higiene',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     },
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/2729/2729038.png',
//         title: 'Pintura',
//         category:'Criatividade',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     },
//     {
//         img: 'https://cdn-icons-png.flaticon.com/512/2729/2729048.png',
//         title: 'Recortes',
//         category:'Criatividade',
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ame in velit animi necessitatibus nobis aut adipisci hic ipsam sit dicta qui quod accusantium officiis unde autem, fugiat dolorem ipsum.',
//         url:'https://rocketseat.com.br'
//     }
    
// ]


// configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static('public'))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views',{
    express: server,
    noCache: true
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas){    
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            } 
        }

        return res.render('index.html', { ideas: lastIdeas })
    })
})


server.get('/ideias', function(req, res){   


    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render('ideias.html', {ideas: reversedIdeas})
    })

    
})

server.post('/', function(req, res){
    // INSERIR DADOS NA TABELA
    const query = `INSERT INTO ideas(
                imagem,
                title,
                category,
                description,
                link) VALUES (?, ?, ?, ?, ?);
        `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect('/ideias')
    })
})

// liguei meu servidor na porta 3000
server.listen(3000)