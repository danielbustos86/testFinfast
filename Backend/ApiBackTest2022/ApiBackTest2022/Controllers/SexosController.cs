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
    public class SexosController : ControllerBase
    {
        private readonly PersonDbContext _context;

        public SexosController(PersonDbContext context)
        {
            _context = context;
        }

        // GET: api/Sexos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sexo>>> GetSexo()
        {
            return await _context.Sexo.ToListAsync();
        }

        // GET: api/Sexos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sexo>> GetSexo(short id)
        {
            var sexo = await _context.Sexo.FindAsync(id);

            if (sexo == null)
            {
                return NotFound();
            }

            return sexo;
        }

        // PUT: api/Sexos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSexo(short id, Sexo sexo)
        {
            if (id != sexo.Codigo)
            {
                return BadRequest();
            }

            _context.Entry(sexo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SexoExists(id))
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

        // POST: api/Sexos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sexo>> PostSexo(Sexo sexo)
        {
            _context.Sexo.Add(sexo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SexoExists(sexo.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSexo", new { id = sexo.Codigo }, sexo);
        }

        // DELETE: api/Sexos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sexo>> DeleteSexo(short id)
        {
            var sexo = await _context.Sexo.FindAsync(id);
            if (sexo == null)
            {
                return NotFound();
            }

            _context.Sexo.Remove(sexo);
            await _context.SaveChangesAsync();

            return sexo;
        }

        private bool SexoExists(short id)
        {
            return _context.Sexo.Any(e => e.Codigo == id);
        }
    }
}
