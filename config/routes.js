const express = require('express')
const routes = express.Router()
 
let db = [
    { Id: '1', Nome: 'Cliente 1', Idade: '19' },
    { Id: '2', Nome: 'Cliente 2', Idade: '31' },
    { Id: '3', Nome: 'Cliente 3', Idade: '44', Profissao: 'Professor'}
]

// Buscar Dados
routes.get('/', (req, res) => {
    return res.json(db)  
})

// Inserir Dados
routes.post('/add', (req, res) => {
    const body = req.body

    if(!body)
        return res.status(400).end()

    db.push(body)
    return res.json(body)
})   

routes.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    
    let newDB = db.filter(item => {
        if(!item[id])
            return item
    })
    
    db = newDB

    return res.send(newDB)
})
routes.put('/put/:id', (req, res) =>{
    const id = req.params.id
    const body = req.body

    if(!body)
        return res.status(400).end() 

    const nome = body.Nome
    const idade = body.Idade
    var profissao = null
    if(body.Profissao)
        profissao = body.Profissao
  

    let person = db.find(p => {
        if(p.Id === id){
            p.Nome = nome
            p.Idade = idade
            p.Profissao = profissao
            return p 
        }
    });

    return res.send(person)
})

module.exports = routes