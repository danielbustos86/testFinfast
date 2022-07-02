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
    public class ComunasController : ControllerBase
    {
        private readonly PersonDbContext _context;

        public ComunasController(PersonDbContext context)
        {
            _context = context;
        }

        // GET: api/Comunas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComuna()
        {
            return await _context.Comuna.ToListAsync();
        }

        // GET: api/Comunas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComuna(short id,short ciudadId)
        {
            var comuna = await _context.Comuna.Where(x => x.RegionCodigo == id && x.CiudadCodigo== ciudadId).ToListAsync();

            if (comuna == null)
            {
                return NotFound();
            }

            return comuna;
        }

        // PUT: api/Comunas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComuna(short id, Comuna comuna)
        {
            if (id != comuna.RegionCodigo)
            {
                return BadRequest();
            }

            _context.Entry(comuna).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComunaExists(id))
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

        // POST: api/Comunas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Comuna>> PostComuna(Comuna comuna)
        {
            _context.Comuna.Add(comuna);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ComunaExists(comuna.RegionCodigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetComuna", new { id = comuna.RegionCodigo }, comuna);
        }

        // DELETE: api/Comunas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comuna>> DeleteComuna(short id)
        {
            var comuna = await _context.Comuna.FindAsync(id);
            if (comuna == null)
            {
                return NotFound();
            }

            _context.Comuna.Remove(comuna);
            await _context.SaveChangesAsync();

            return comuna;
        }

        private bool ComunaExists(short id)
        {
            return _context.Comuna.Any(e => e.RegionCodigo == id);
        }
    }
}
