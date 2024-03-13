import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'

function App() {
  const [pacientes, setPacientes] = useState([])
  const [pacienteEd, setPacienteEd] = useState([]);

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);


  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(pacienteEd => pacienteEd.id !== id);

    setPacientes(pacientesActualizados)
  }
  return (
    <div className="container mx-auto mt-14">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          pacienteEd={pacienteEd}
          setPacienteEd={setPacienteEd}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPacienteEd={setPacienteEd}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
