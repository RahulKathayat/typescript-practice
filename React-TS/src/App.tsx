import { AppBar, Container ,Typography,Stack, TextField, Toolbar, Button} from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react";
import { setTodo, getTodo} from "./utils/feature";

const App = () => {
  const [todos,setTodos] = useState<TodoItemType[]>(getTodo());
  const [title,setTitle] = useState<string>("");
  const deleteHandler = (id:string):void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const completeHandler = (id:string):void => {
    todos.forEach(todo => {
      if(todo.id === id){
        todo.Iscompleted = !todo.Iscompleted;
      }
    });
    setTodos([...todos]);
    console.log(todos); 
  };

  const editHandler = (id:string,title:string):void => {
    todos.forEach(todo => {
      if(todo.id === id){
        todo.title = title;
      }
    });
    setTodos([...todos]);
  }
  const submitHandler = ():void => {
    if(title.trim() === "") return;
    const newTodo:TodoItemType = {
      id: new Date().getTime().toString(),
      title: title,
      Iscompleted: false
    }
    setTodos([...todos,newTodo]);
    setTitle(""); 
  };

  useEffect(()=>{
    setTodo(todos);
  },[todos]);

  return (
    <Container maxWidth="sm" sx={{height:"100vh"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Stack direction={"column"} minHeight={"70%"} spacing={"1rem"} p={"1rem"}>
        { todos.map(todo => <TodoItem deleteHandler={deleteHandler} completeHandler={completeHandler}
        editHandler={editHandler} key={todo.id} todo={todo}/>)}
      </Stack>
      <TextField label="Add Todo" variant="outlined" fullWidth value={title} onChange={(e)=>{setTitle(e.target.value)}} onKeyDown={(e)=>{
        if(e.key === "Enter") submitHandler();
      }}/>
      <Button variant="contained" fullWidth sx={{marginY:"1rem"}} onClick={submitHandler}>Add</Button>
    </Container>
  )
}

export default App
