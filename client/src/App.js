import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: '', content: '' });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    let currentTodo = currentId!=0?todos.find(todo=>todo._id===currentId):{title:'',content:''}
    setTodo(currentTodo)
  }, [currentId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result)
    }
    fetchData()
  }, [currentId]);

  const clear = () => {
    setCurrentId(0)
    setTodo({ title: '', content: '' })
  }

  useEffect(() => {
    const clearField = (e) => {
      if(e.keyCode === 27){
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  },[])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(currentId === 0) {
      const result = await createTodo(todo)
      setTodos([...todos, result])
      clear();
    } else {
      await updateTodo(currentId, todo)
      clear();
    }
    // console.log(result)
  }

  const removeTodo = async(id) => {
    await deleteTodo(id);
    const todosCopy = [...todos]
    todosCopy.filter(todo => todo._id !== id);
    setTodos(todosCopy);
  }

  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate" 
                onChange={e => setTodo({ ...todo, title: e.target.value })} 
                value={todo.title}/>
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate" onChange={e => setTodo({ ...todo, content: e.target.value })} 
              value={todo.content}/>
              <label htmlFor="Content">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>
        {
          !todos ? <Preloader /> : todos.length > 0 ?
            <ul className="collection">
              {todos.map(item => (
                <li key={item._id} 
                className="collection-item"
                onClick={() => setCurrentId(item._id)}>
                  <div>
                    <h5>{item.title}</h5>
                    <p> {item.content}
                    <a href="#!" className="secondary-content" onClick={() => removeTodo(item._id)}>
                      <i className="material-icons">delete</i>
                    </a>
                    </p>
                  </div>
                </li>

              ))
              }
            </ul>
            :
            <div><h5>Nothing to do</h5></div>
        }

      </div>
    </div>
  );
}

export default App;
