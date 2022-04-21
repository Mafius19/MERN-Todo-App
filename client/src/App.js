import { useEffect } from "react";
import Preloader from "./components/Preloader";
import { readTodos } from "./functions";

function App() {

  useEffect(() => {
    const fetchData = async() => {
      const result = await readTodos();
      console.log(result);
    }
    fetchData()
  }, []);
  return (
    <div className="container">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate" />
              <label htmlFor="Content">Content</label>
            </div>
          </div>
        </form>
        <Preloader />
        <div class="collection">
          <a href="#!" class="collection-item">Alvin</a>
          <a href="#!" class="collection-item active">Alvin</a>
          <a href="#!" class="collection-item">Alvin</a>
          <a href="#!" class="collection-item">Alvin</a>
        </div>
      </div>
    </div>
  );
}

export default App;
