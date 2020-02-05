import React, {useState, useEffect} from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// 3 Conceitos fundamentais do React
//
// Componente -> É uma função que retorna um conteudo HTML, CSS ou ate mesmo js como ação de sumir um botão. DRY
// Dicas: Vai usar sempre que repetir codigo DRY...; Sempre começa com letra maiuscula; 1 omponente por arquivo;
// Propiedade -> É um argumento passado pelo xml, em cada momento pode agir de uma forma. Exemplo um post com texto
// Estado     -> É uma informação mantida pelo componente
// React possui o conceito de imultabilidade, o que nunca vai mudar um valor e sim criar um valor apartir do anterior

// App é uma função que retorna o HTML (JSX) JavaScript + XML
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    const hasDev = devs.filter(dev => (dev.github_username === data.github_username));
    
    if(hasDev.length === 0) {
      setDevs([...devs, response.data])
    }  
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}          
        </ul>
      </main>
    </div>
  );
}

export default App;
