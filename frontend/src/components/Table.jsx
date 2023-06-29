
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
// import { addToDo, getAllToDo, deleteToDo } from "../utils/HandleApi";
const Table = ({title,  description,updateMode, deleteToDo}) => {

    return (
      <div className="todo">
            <div className="text">{title}</div>
            <div className="text">{description}</div>
            <div className="icons">
                <EditNoteIcon className='icon' style={{cursor:"pointer"}} onClick={updateMode} />
                <DeleteForeverIcon className='icon' style={{cursor:"pointer"}} onClick={deleteToDo} />
            </div>
        </div>
    );
  };
  
  export default Table;