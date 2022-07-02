using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackTest2022.Models
{
    public partial class Persona
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(30)]
        public string Run { get; set; }
        public int RunCuerpo { get; set; }
        [Required]
        [StringLength(1)]
        public string RunDigito { get; set; }
        [StringLength(95)]
        public string Nombre { get; set; }
        [Required]
        [StringLength(45)]
        public string Nombres { get; set; }
        [Required]
        [StringLength(25)]
        public string ApellidoPaterno { get; set; }
        [StringLength(25)]
        public string ApellidoMaterno { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
        public short SexoCodigo { get; set; }
        [Column(TypeName = "date")]
        public DateTime? FechaNacimiento { get; set; }
        public short? RegionCodigo { get; set; }
        public short? CiudadCodigo { get; set; }
        public short? ComunaCodigo { get; set; }
        [Column(TypeName = "text")]
        public string Direccion { get; set; }
        public int? Telefono { get; set; }
        [Column(TypeName = "text")]
        public string Observaciones { get; set; }

        [ForeignKey("RegionCodigo,CiudadCodigo,ComunaCodigo")]
        [InverseProperty("Persona")]
        public virtual Comuna Comuna { get; set; }
        [ForeignKey(nameof(SexoCodigo))]
        [InverseProperty(nameof(Sexo.Persona))]
        public virtual Sexo SexoCodigoNavigation { get; set; }
    }
}
