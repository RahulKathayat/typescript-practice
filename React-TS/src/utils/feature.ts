export const setTodo = (todos:TodoItemType[]):void=>{
    localStorage.setItem("myTodos",JSON.stringify(todos));
}
export const getTodo = ():TodoItemType[]=>{
    const todos = localStorage.getItem("myTodos");
    if(todos){
        return JSON.parse(todos);
    }
    else return [];
}