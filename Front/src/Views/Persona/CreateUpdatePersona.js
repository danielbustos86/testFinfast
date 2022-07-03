import React, { useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import apiClient from "../../http-common";
import Swal from "sweetalert2";
import { Card,CardHeader,CardContent} from '@mui/material';
import MaskedInput from 'react-text-mask'
import createRutMask from 'text-mask-rut';
import { format } from 'rut.js'

const rutMask = createRutMask();

const CreateUpdatePersona = ({
values,
setValues,
handleInputChange,
handleInputChangeRut,
regiones,
regionSel,
setRegionSel,
ciudades,
CiudadSel,
setCiudadSel,
comunas,
comunaSel,
setComunaSel,
SaveorEdit,
sexos
})=>{

return (
        <Box component="form" noValidate sx={{ mt: 1 }}>

        <TextField
            margin="normal"
            required
            fullWidth
            id="run"
            label="Rut"
            name="rut"
            autoComplete="Rut"
            autoFocus
            onChange={handleInputChangeRut}
            value={values.rut}
          >
        </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombres"
            label="Nombres"
            name="nombres"
            autoComplete="Nombres"
            autoFocus
            onChange={handleInputChange}
            value={values.nombres}
            
          />
            <TextField
            margin="normal"
            required
            fullWidth
            id="run"
            label="Apellido Paterno"
            name="apellidoPat"
            autoComplete="Apellido Paterno"
            autoFocus
            onChange={handleInputChange}
            value={values.apellidoPat}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            id="run"
            label="Apellido Materno"
            name="apellidoMat"
            autoComplete="Apellido Materno"
            autoFocus
            onChange={handleInputChange}
            value = {values.apellidoMat}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            value={values.email}
          />
          <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
<RadioGroup
  aria-labelledby="demo-radio-buttons-group-label"
  name="sexo"
  onChange={handleInputChange}
  value={values.sexo}
>

{sexos.map(item => (
  
  <FormControlLabel value={item.codigo} control={<Radio />} label={item.nombre} />
  
))}


</RadioGroup>
<TextField
            margin="normal"
            required
            fullWidth
            id="fechanac"
            label="Fecha Nacimiento"
            name="fechaNac"
            autoComplete="Fecha Nacimiento"
            autoFocus
            type="date"
            onChange={handleInputChange}
            value={values.fechaNac}
          />
<div style={{marginBottom:"15px"}}>
<Autocomplete
    disablePortal
    id="comboregion"
    name = "comboregion"
    onChange={(event, newValue) => {
      setValues({
          ...values,
          regionId: newValue.codigo,
      })
      setRegionSel({ codigo: newValue.codigo, nombre: newValue.nombre })

  }}
  options={regiones}
  getOptionLabel={(regiones) => regiones.nombre}
  value={{ codigo: regionSel.codigo, nombre: regionSel.nombre }}
    sx={{ width: '100%'}}
    renderInput={(params) => <TextField {...params} label="Región" name="regionsel" />}

  />
  

  </div>

  <div style={{marginBottom:"15px"}}>

<Autocomplete
    disablePortal
    id="combociudad"
    onChange={(event, newValue) => {
      setValues({
          ...values,
          ciudadId: newValue.codigo,
      })
      setCiudadSel({ codigo: newValue.codigo, nombre: newValue.nombre })

  }}
  options={ciudades}
  getOptionLabel={(ciudades) => ciudades.nombre}
  value={{ codigo: CiudadSel.codigo, nombre: CiudadSel.nombre }}

    sx={{ width: '100%' }}
    renderInput={(params) => <TextField {...params} label="Ciudad" />}
  />
  </div>
  <div style={{marginBottom:"15px"}}>

<Autocomplete
    disablePortal
    id="combocomuna"
    
    onChange={(event, newValue) => {
      setValues({
          ...values,
          comunaId: newValue.codigo,
      })
      setComunaSel({ codigo: newValue.codigo, nombre: newValue.nombre })

  }}
  options={comunas}
  getOptionLabel={(comunas) => comunas.nombre}
  value={{ codigo: comunaSel.codigo, nombre: comunaSel.nombre }}
    sx={{ width: '100%' }}
    renderInput={(params) => <TextField {...params} label="Comuna" />}
  />
  </div>

         
          <TextField
            margin="normal"
            required
            fullWidth
            name="direccion"
            label="Dirección"
            id="direccion"
            autoComplete="Dirección"
            onChange={handleInputChange}
            value={values.direccion}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="telefono"
            label="Telefono"
            id="telefono"
            autoComplete="Telefono"
            type="number"
            onChange={handleInputChange}
            value={values.telefono}
          />
 <TextField
            margin="normal"
            required
            fullWidth
            name="observaciones"
            label="observaciones"
            id="observacion"
            autoComplete="Observación"
            multiline
            rows={4}
            onChange={handleInputChange}
            value={values.observaciones}
          />
          

          
        </Box>
)

}
export default CreateUpdatePersona