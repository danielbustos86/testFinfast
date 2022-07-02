using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackTest2022.Models
{
    public partial class Region
    {
        public Region()
        {
            Ciudad = new HashSet<Ciudad>();
        }

        [Key]
        public short Codigo { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }
        [Required]
        [StringLength(40)]
        public string NombreOficial { get; set; }
        public int CodigoLibroClaseElectronico { get; set; }

        [InverseProperty("RegionCodigoNavigation")]
        public virtual ICollection<Ciudad> Ciudad { get; set; }
    }
}
