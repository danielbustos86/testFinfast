using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiBackTest2022.Models;
using ApiBackTest2022.Repository;

namespace ApiBackTest2022.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly PersonDbContext _context;

        public PersonasController(PersonDbContext context)
        {
            _context = context;
        }

        // GET: api/Personas
        [HttpGet]
        public  IActionResult GetPersona()
        {
            var listaPersonas = (from p in _context.Persona
                              join c in _context.Comuna on p.ComunaCodigo equals c.Codigo 
                                
                              join r in _context.Region on p.RegionCodigo equals r.Codigo
                              where p.RegionCodigo == c.RegionCodigo && p.CiudadCodigo ==c.CiudadCodigo
                              select new
                              {
                                  id = p.Id,
                                  rut = p.Run,
                                  nombres = p.Nombres,
                                  nombre = p.Nombre,
                                  apellidoPat = p.ApellidoPaterno,
                                  apellidoMat = p.ApellidoMaterno,
                                  email = p.Email,
                                  sexo = p.SexoCodigo,
                                  fechaNac = p.FechaNacimiento.ToString(),
                                  comuCodigo = p.ComunaCodigo,
                                  comunaNombre = c.Nombre,
                                  regionId = p.RegionCodigo,
                                  regionNombre = r.Nombre,
                                  ciudadCodigo = p.CiudadCodigo,
                                  ciudadNombre = c.Nombre,
                                  direccion = p.Direccion,
                                  observaciones = p.Observaciones,
                                  telefono = p.Telefono
                              }).ToList();

            return Ok(listaPersonas) ;
        }

        // GET: api/Personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Persona>> GetPersona(Guid id)
        {
            var persona = await _context.Persona.FindAsync(id);

            if (persona == null)
            {
                return NotFound();
            }

            return persona;
        }

        // PUT: api/Personas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona(Guid id, Persona persona)
        {
        
            if (id != persona.Id)
            {
                return BadRequest();
            }

            _context.Entry(persona).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Personas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Persona>> PostPersona(Persona persona)
        {
            _context.Persona.Add(persona);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersona", new { id = persona.Id }, persona);

        }

        // DELETE: api/Personas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Persona>> DeletePersona(Guid id)
        {
            var persona = await _context.Persona.FindAsync(id);
            if (persona == null)
            {
                return NotFound();
            }

            _context.Persona.Remove(persona);
            await _context.SaveChangesAsync();

            return persona;
        }

        private bool PersonaExists(Guid id)
        {
            return _context.Persona.Any(e => e.Id == id);
        }
    }
}
