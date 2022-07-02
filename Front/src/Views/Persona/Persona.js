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
import MaskedInput from "react-text-mask";

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
import { Card,CardHeader,CardContent, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText} from '@mui/material';
import ListaPersonas from './ListaPersonas';
import CreateUpdatePersona from './CreateUpdatePersona';
import {  validate, clean, format, getCheckDigit } from 'rut.js'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Test Daniel Bustos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function Persona() {
    const [personas,setPersonas]=useState(null)
  
  const [regiones,setRegiones] = useState([])
  const [ciudades,setCiudades] = useState([])
  const [sexos,setSexos]= useState([])
  const [comunas,setComunas] = useState([])
  const [regionSel,setRegionSel] = useState({codigo:0,nombre:"Seleccione"})
  const [CiudadSel,setCiudadSel] = useState({codigo:0,nombre:"Seleccione"})
  const [comunaSel,setComunaSel] = useState({codigo:0,nombre:"Seleccione"})
  const [openPrincipal,setOpenPrincipal] = useState([])
  const [recargar,setRecargar] = useState(false)
  const [accion,setAccion] =useState("Guardar")
  const [values,setValues] = useState({
      id:"0",
      rut:"",
      nombres:"",
      apellidoPat:"",
      apellidoMat:"",
      email : "",
      sexo : 1,
      fechaNac: "1980-01-01",
      regionId : 0,
      ciudadId : 0,
      comunaId : 0,
      direccion : "",
      observaciones : "",
      telefono : 0

  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
};
const handleInputChangeRut = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: format(value) });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(data.get('regionsel'))
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  const SaveorEdit = () =>{

    if(!validate(values.rut))
    {
        Swal.fire({
            title: "Info",
            text: "El Rut no es válido",
            icon: "warning",
          target: document.getElementById("dialogFormularioMantenedor")
        });
        return
    }
    let largorut =  clean(values.rut).length
    let body = {
        Id : values.id,
        Run: values.rut,
        RunCuerpo : parseInt(clean(values.rut).substr(0,largorut-1)),
        RunDigito : clean(values.rut).substr(-1),
        Nombres : values.nombres,
        ApellidoPaterno:values.apellidoPat,
        ApellidoMaterno :values.apellidoMat,
        Email : values.email,
        SexoCodigo:1,
        FechaNacimiento:values.fechaNac,
        RegionCodigo: values.regionId,
        CiudadCodigo : values.ciudadId,
        ComunaCodigo:values.comunaId,
         Direccion:values.direccion,
         Telefono : parseInt(values.telefono),
         Observaciones :values.observaciones}
      

        if(accion=="Guardar")
        {
          delete body.Id
            Save(body)
        }

   if(accion=="Modificar")
        {
            Update(body)
        }
        
  }

  const Update = (body)=>{
    apiClient
    .put(`Personas/${body.Id}`, body)
    .then(
        (response) => {

            if (response.status ==204) {
                setOpenPrincipal(false)
                Swal.fire({
                    title: "Info",
                    text: "Persona Modificada",
                    icon: "success",
                  
                });
        
            }else{
                Swal.fire({
                    title: "Info",
                    text: "Error al Modificar persona",
                    icon: "error",
                     target: document.getElementById("dialogFormularioMantenedor")
                });
                return;
            } 

        },
        (error) => {

            Swal.fire({
                title: "Info",
                text: "no es posible realizar el registro, informe a soporte",
                icon: "error",
                 target: document.getElementById("dialogFormularioMantenedor")
            });

        }
    )
    .catch((error) => {

        Swal.fire({
            title: "Info",
            text: "no es posible realizar el registro, informe a soporte",
            icon: "error",
            // target: document.getElementById("dialogFormularioTecnico")
        });
    });
  }

  const Save=(body)=>{
    apiClient
    .post("Personas", body)
    .then(
        (response) => {

            if (response.status ==201) {
                setOpenPrincipal(false)
                Swal.fire({
                    title: "Info",
                    text: "Persona registrada",
                    icon: "success",
                  
                });
        
            }else{
                Swal.fire({
                    title: "Info",
                    text: "Error al registrar persona",
                    icon: "error",
                     target: document.getElementById("dialogFormularioMantenedor")
                });
                return;
            } 

        },
        (error) => {

            Swal.fire({
                title: "Info",
                text: "no es posible realizar el registro, informe a soporte",
                icon: "error",
                 target: document.getElementById("dialogFormularioMantenedor")
            });

        }
    )
    .catch((error) => {

        Swal.fire({
            title: "Info",
            text: "no es posible realizar el registro, informe a soporte",
            icon: "error",
            // target: document.getElementById("dialogFormularioTecnico")
        });
    });
  }
  const GetRegiones = async()=>{
    const res = await apiClient.get('/Regions');
    setRegiones(res.data);
    console.log(res.data);
}
const GetCiudades = async(regionId)=>{
    const res = await apiClient.get(`/Ciudad/${regionId}`);
    setCiudades(res.data);
    console.log(res.data);
}
const GetComunas = async(regionId,ciudadId)=>{
    const res = await apiClient.get(`/Comunas/${regionId}?ciudadId=${ciudadId}`);
    setComunas(res.data);
    console.log(res.data);
}

const GetSexo = async()=>{
    const res = await apiClient.get('/Sexos');
    setSexos(res.data);
    console.log(res.data);
}

const GetPersonas = async()=>{
    const res = await apiClient.get('/Personas');
    setPersonas(res.data);
    console.log(res.data);
}


  useEffect(() => {
    GetSexo()
    GetRegiones()
    GetPersonas()
  }, []);
  useEffect(() => {
    if(regionSel.codigo!=0)
    {
        GetCiudades(regionSel.codigo)
    }
  }, [regionSel]);
  useEffect(() => {
    if(!openPrincipal)
    {
        GetPersonas()
    }
  }, [openPrincipal]);
  useEffect(() => {
    if(CiudadSel.codigo!=0)
    {
        GetComunas(regionSel.codigo,CiudadSel.codigo)
    }
  }, [CiudadSel]);
 
  useEffect(() => {
    if(accion=="Guardar")
    {
        Limpiar()
    }
  }, [accion]);
  useEffect(() => {
    if(recargar)
    {
        GetPersonas()
        setRecargar(false)
    }
  }, [recargar]);
  
  
  const Limpiar = () => {
    setValues({
        id:"0",
        rut:"",
        nombres:"",
        apellidoPat:"",
        apellidoMat:"",
        email : "",
        sexo : 1,
        fechaNac: "1980-01-01",
        regionId : 0,
        ciudadId : 0,
        comunaId : 0,
        direccion : "",
        observaciones : "",
        telefono : 0
  
    })
    setRegionSel({codigo:0,nombre:"Seleccione"})
    setCiudadSel({codigo:0,nombre:"Seleccione"})
    setComunaSel({codigo:0,nombre:"Seleccione"})
  }
  const PreEliminar = async () => {

    const confirmaEliminar = await Swal.fire({
        title: "Advertencia",
        text: "Confirma que desea eliminar el registro",
        type: "warning",
        showCancelButton: "Cancelar",
        cancelButtonText: "No",
        confirmButtonText: "Si, confirmo",
        confirmButtonColor: "#00728d",
        cancelButtonColor: "#2979ff",
        // target: document.getElementById("detalle-dialog")
    });
    if (confirmaEliminar.value === true) {

        Eliminar()

    }
    return;
}
const Eliminar = ()=>{
    apiClient
    .delete(`Personas/${values.id}`)
    .then(
        (response) => {

            if (response.status ==200) {
                setRecargar(true)
                Swal.fire({
                    title: "Info",
                    text: "Persona Eliminada",
                    icon: "success",
                  
                });
               
            }else{
                Swal.fire({
                    title: "Info",
                    text: "Error al registrar persona",
                    icon: "error",
                     target: document.getElementById("dialogFormularioMantenedor")
                });
                return;
            } 

        },
        (error) => {

            Swal.fire({
                title: "Info",
                text: "no es posible realizar el registro, informe a soporte",
                icon: "error",
                 target: document.getElementById("dialogFormularioMantenedor")
            });

        }
    )
    .catch((error) => {

        Swal.fire({
            title: "Info",
            text: "no es posible realizar el registro, informe a soporte",
            icon: "error",
            // target: document.getElementById("dialogFormularioTecnico")
        });
    });
} 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" fixed>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mantenedor Persona
          </Typography>
          <Dialog
                id="dialogFormularioMantenedor"
                open={openPrincipal}
                keepMounted
                onClose={() => setOpenPrincipal(false)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogContent>
                    <DialogContentText id="detalle-dialog">

                        
          <CreateUpdatePersona 
          values={values}
          setValues ={setValues}
          handleInputChange={handleInputChange}
          handleInputChangeRut={handleInputChangeRut}
          regiones={regiones}
          regionSel={regionSel}
          setRegionSel={setRegionSel}
          ciudades={ciudades}
          CiudadSel ={CiudadSel}
          setCiudadSel={setCiudadSel}
          comunas = {comunas}
          comunaSel = {comunaSel}
          setComunaSel ={setComunaSel}
          SaveorEdit = {SaveorEdit}
          handleSubmit = {handleSubmit}
          sexos ={sexos}
          />
          </DialogContentText>


            </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        className="btn-sm"
                        color="primary"
                        onClick={() => SaveorEdit()}
                    >
                        {accion}
                    </Button>
                    <Button
                        onClick={() => setOpenPrincipal(false)}
                        color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
          {personas!=null? 
          <ListaPersonas data={personas} 
          setOpenPrincipal={setOpenPrincipal} 
          setValues={setValues}
          setRegionSel ={setRegionSel}
          setCiudadSel = {setCiudadSel}
          setComunaSel = {setComunaSel}
          setAccion ={setAccion}
          PreEliminar ={PreEliminar}
          />
          :<></>}
        </Box>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}