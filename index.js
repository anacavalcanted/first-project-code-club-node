
const { response, request } = require("express")
const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const order = []

const orderCheck = (request, response, next) =>{
    const {id} = request.params

    const index = order.findIndex(orders => orders.id === id)

    if (index < 0){
        return response.status(404).json({error: "User not found"})
    }

    request.orderIndex = index
    request.orderId = id

    next()

}

const methodoCheck = (request,response, next)=>{
    console.log(request.method)
    console.log(request.url)

    next()
}

app.get("/order",methodoCheck, (request, response)=>{

    return response.json(order)
})

app.post("/order",methodoCheck, (request, response) =>{
       const {orderName, clientName, price,status} = request.body

       const orders = { id: uuid.v4(), orderName,clientName,price,status}

       order.push(orders)

    return response.status(201).json(orders)

})


app.put("/order/:id",orderCheck,methodoCheck, (request, response) =>{
    const {orderName, clientName, price,status} = request.body
    const index = request.orderIndex
    const id = request.orderId

    const updateOrder = {id,orderName, clientName, price, status}

    order[index] = updateOrder

 return response.status(201).json(updateOrder)

})


app.delete("/order/:id",orderCheck,methodoCheck, (request, response) =>{
    const index = request.orderIndex

    order.splice(index,1)

     return response.status(204).json()

})


app.patch("/order/:id",orderCheck,methodoCheck, (request, response)=>{
    const id = request.orderId
    const index = request.orderIndex
    
    const {orderName, clientName, price,status} = request.body
    const statusOrder = { id,orderName, clientName, price, status }

    order.push(statusOrder)

    return response.status(201).json(statusOrder)
})

app.listen(port, ()=> {
    console.log( `💜 Server started on port ${port}`)
})
