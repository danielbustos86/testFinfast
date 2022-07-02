using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackTest2022.Models
{
    public partial class Ciudad
    {
        public Ciudad()
        {
            Comuna = new HashSet<Comuna>();
        }

        [Key]
        public short RegionCodigo { get; set; }
        [Key]
        public short Codigo { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [ForeignKey(nameof(RegionCodigo))]
        [InverseProperty(nameof(Region.Ciudad))]
        public virtual Region RegionCodigoNavigation { get; set; }
        [InverseProperty("Ciudad")]
        public virtual ICollection<Comuna> Comuna { get; set; }
    }
}
