import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import MaterialTable from "material-table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ListaPersonas = ({data,setOpenPrincipal,
    setValues,
    setRegionSel,
    setCiudadSel,
    setComunaSel,
setAccion,
PreEliminar}) => {
   
    const Seleccionado = (item)=>{
        setValues({
            id : item.id,
            rut:item.rut,
            nombres:item.nombres,
            nombre:item.nombre,
            apellidoPat:item.apellidoPat,
            apellidoMat:item.apellidoMat,
            email : item.email,
            sexo : item.sexo,
            fechaNac: item.fechaNac,
            regionId : item.regionId,
            ciudadId : item.ciudadCodigo,
            comunaId : item.comuCodigo,
            direccion : item.direccion,
            observaciones : item.observaciones,
            telefono : item.telefono
      
        })
        setRegionSel({codigo:item.regionId,nombre:item.regionNombre})
        setComunaSel({codigo:item.comuCodigo,nombre:item.comunaNombre})
        setCiudadSel({codigo:item.ciudadCodigo,nombre:item.ciudadNombre})
  
    }

   
    return(

                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <MaterialTable
                                title={
                                    <>
                                        <Typography
                                        // onClick={() => Nuevo(values)}
                                        >
                                            <IconButton
                                                aria-label="settings"
                                                onClick={() => 
                                                {
                                                    setOpenPrincipal(true)
                                                    setAccion("Guardar")
                                                }
                                                
                                                }
                                            >
                                                <AddCircleOutlineIcon />
                                            </IconButton>{" "}
                                            Nuevo {" "}
                                        </Typography>
                                    </>
                                }
                                data={data}
                                localization={
                                    {
                                        pagination: {
                                            labelDisplayedRows: '{from}-{to} de {count}',
                                            labelRowsPerPage: 'Filas por pagina',
                                            labelRowsSelect: 'filas',
                                            firstAriaLabel: 'Primera pagina',
                                            firstTooltip: 'Primera pagina',
                                            lastAriaLabel: 'Ultima pagina',
                                            lastTooltip: 'Ultima pagina',
                                            nextAriaLabel: 'Próxima pagina',
                                            nextTooltip: 'Próxima pagina',
                                            previousAriaLabel: 'Pagina anterior',
                                            previousTooltip: 'Pagina anterior',
                                        },
                                        toolbar: {
                                            nRowsSelected: '{0} personas seleccionadas.',
                                            searchTooltip: 'Buscar',
                                            searchPlaceholder: 'Buscar',
                                        },
                                        body: {
                                            filterRow: {
                                                filterTooltip: 'Filtrar',
                                            },
                                            emptyDataSourceMessage: 'No hay datos que mostrar.'
                                        }
                                    }
                                }
                                onSelectionChange={
                                    (rows) => console.log(rows)
                                }

                                options={{
                                    selection: false,
                                    print: false,
                                    download: false,
                                    filtering: true,
                                    rowsPerPage: 5,
                                    usePaperPlaceholder: true,
                                    rowsPerPageOptions: [5, 10, 25],
                                    sortColumnDirection: "desc",
                                }}
                                columns={[
                                    { title: "Rut", field: "rut" },
                                    { title: "Nombre", field: "nombre" },
                                    {  title: "Acciones",
                                        render: (item) => {
                                            return (
                                                <>

                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={() => 
                                                            {
                                                                Seleccionado(item)
                                                                setOpenPrincipal(true)
                                                                setAccion("Modificar")
                                                            }
                                                            }
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="settings"
                                                      onClick={() =>
                                                        
                                                        {
                                                            Seleccionado(item)
                                                            PreEliminar(item.id)
                                                        }
                                                    }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            );
                                        },
                                    },
                                ]}
                            />

                        </Grid>
                    </Grid>
          
    )
}
export default ListaPersonas;
