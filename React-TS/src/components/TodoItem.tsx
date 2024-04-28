import { Button, Checkbox, Paper, Typography ,Stack, TextField} from "@mui/material";
import { useState } from "react";

type PropsType = {
    todo: TodoItemType;
    deleteHandler: (id:string)=>void;
    completeHandler: (id:string)=>void;
    editHandler: (id:string,title:string)=>void;
}
const TodoItem = ({todo,deleteHandler,completeHandler,editHandler}:PropsType) => {
    const [editActive,setEditActive] = useState<boolean>(false);
    const [textVal,setTextVal] = useState<string>(todo.title);
  return (
    <Paper  sx={{padding:"1rem"}}>
        <Stack direction={"row"} alignItems={"center"}>
            {
                editActive ? (
                    <TextField sx={{marginRight:"auto"}} value={textVal} onChange={(e)=>{setTextVal(e.target.value)}} onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            editHandler(todo.id,textVal);
                            setEditActive(false);
                        }
                    }}/>
                ) : (
                <Typography variant="h6" sx={{marginRight:"auto"}}>{todo.title}</Typography>)
            }
            <Checkbox checked={todo.Iscompleted} onChange={()=>{completeHandler(todo.id)}}/>
            <Button variant="contained" color="error" sx={{marginRight:"1rem"}} onClick={()=>{deleteHandler(todo.id)}}>Delete</Button>
            <Button variant="contained" color="primary" onClick={()=>{setEditActive(!editActive)}}>Edit</Button>
        </Stack>
    </Paper>
  )
}

export default TodoItem