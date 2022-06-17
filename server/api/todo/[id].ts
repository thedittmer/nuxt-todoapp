import {db} from '../../db'

export default defineEventHandler((e) => {
    const method = e.req.method
    const context = e.context

    if(method === "PUT") {
        // 1) Extract the path parameter
        const {id} = context.params

        // 2) Find todo in db
        let index
        const todo = db.todos.find((t, i) => {
            if (t.id === id) {
                index = i
                return true
            }
            return false
        })
        
        // 3) Throw error if todo is not found
        if(!todo) throw new Error()

        // 4) Update the completed status
        const updateTodo = {
            ...todo,
            completed: !todo.completed
        }
        db.todos[index] = updateTodo

        // 5) Return the udpated todo
        return updateTodo

    }
})