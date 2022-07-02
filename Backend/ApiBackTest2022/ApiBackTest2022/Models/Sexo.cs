using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackTest2022.Models
{
    public partial class Sexo
    {
        public Sexo()
        {
            Persona = new HashSet<Persona>();
        }

        [Key]
        public short Codigo { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }
        [Required]
        [StringLength(1)]
        public string Letra { get; set; }

        [InverseProperty("SexoCodigoNavigation")]
        public virtual ICollection<Persona> Persona { get; set; }
    }
}
