import { useState, useEffect } from 'react'
import Error from './error'

const Formulario = ({ pacientes, setPacientes, pacienteEd, setPacienteEd }) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {

    if (Object.keys(pacienteEd).length > 0) {
      setNombre(pacienteEd.nombre)
      setPropietario(pacienteEd.propietario)
      setEmail(pacienteEd.email)
      setFecha(pacienteEd.fecha)
      setSintomas(pacienteEd.sintomas)

    }
  }, [pacienteEd])

  const generarId = () => {
    const randon = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return randon + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('hay campos vacios')
      setError(true)
      return
    }
    setError(false)

    //objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (pacienteEd.id) {
      //editando registro

      objetoPaciente.id = pacienteEd.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === pacienteEd.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPacienteEd({})
    } else {
      //nrueva registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }



    //reiniiciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}{' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        action=""
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="mascota"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la mascota"
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="propietario"
            type="text"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            placeholder="Nombre de el propietario"
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Escribe tu email
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="escribe tu email"
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="alta"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            placeholder="Escribe los sintomas"
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer translate-all"
          value={pacienteEd.id ? 'Editar Pacinte' : 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
