import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";
import Header from './Componentes/Header';

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      const repositorie = response.data;
    
      setRepositories(repositorie);
    });
  },[]);
  
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Repositório ${Date.now()}`,
      url: "github/miguelgontijo",
      techs: ["GoStack","NodeJS","React"]
    });

    const repositorie = response.data;

    setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id);

    if (response.status === 204 ){
      setRepositories(repositories.filter(repo => repo.id !== id ));
    }
  }

  return (
    <>

      <Header title="Repositories" />

      <ul data-testid="repository-list">
        {
          repositories.map(repo => 
                            <li key={repo.id}> 
                              {repo.title} 
                              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
                            </li> )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
