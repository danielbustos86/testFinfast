using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackTest2022.Models
{
    public partial class Comuna
    {
        public Comuna()
        {
            Persona = new HashSet<Persona>();
        }

        [Key]
        public short RegionCodigo { get; set; }
        [Key]
        public short CiudadCodigo { get; set; }
        [Key]
        public short Codigo { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }
        public int CodigoPostal { get; set; }
        public int CodigoLibroClaseElectronico { get; set; }

        [ForeignKey("RegionCodigo,CiudadCodigo")]
        [InverseProperty("Comuna")]
        public virtual Ciudad Ciudad { get; set; }
        [InverseProperty("Comuna")]
        public virtual ICollection<Persona> Persona { get; set; }
    }
}
