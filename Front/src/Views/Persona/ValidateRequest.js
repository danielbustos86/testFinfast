export const ValidaRequest = (values)=>{
    var error = ""

    if(values.nombres=="")
    {
        error = error + '-'+'Nombre'
    }
    
    if(values.rut=="")
    {
        error = error + '-'+'Rut'
    }
    if(values.apellidoPat=="")
    {
        error = error + '-'+'Apellido Paterno'
    }
    if(values.apellidoMat=="")
    {
        error = error + '-'+'Apellido Materno'
    }

    if(values.email=="")
    {
        error = error + '-'+'Email'
    }else{
       let valido= /\S+@\S+/.test(values.email)
       if(!valido)
       {
        error = error + '-'+'Formato Email no valido'
       }
    }
   
    if(values.fechaNac =="1900-01-01")
    {
        error = error + '-'+'Fecha Nacimiento'
    }
    if(values.regionId ==0)
    {
        error = error + '-'+'Region'
    }

    if(values.ciudadId ==0)
    {
        error = error + '-'+'Ciudad'
    }
    if(values.direccion =="")
    {
        error = error + '-'+'Dirección'
    }
    if(values.comunaId==0)
    {
        error = error + '-'+'Comuna'
    }
    if(values.observaciones =="")
    {
        error = error + '-'+'Observaciones'
    }
    if(values.telefono ==0)
    {
        error = error + '-'+'Telefono'
    }
    
    return error
}
