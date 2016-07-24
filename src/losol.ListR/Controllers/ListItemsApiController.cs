using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using losol.ListR.Data;
using losol.ListR.Models;

namespace losol.ListR.Controllers
{
    [Produces("application/json")]
    [Route("api/ListItemsApi")]
    public class ListItemsApiController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ListItemsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ListItemsApi
        [HttpGet]
        public IEnumerable<ListItem> GetListItem()
        {
            return _context.ListItem;
        }

        // GET: api/ListItemsApi/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ListItem listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);

            if (listItem == null)
            {
                return NotFound();
            }

            return Ok(listItem);
        }

        // PUT: api/ListItemsApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListItem([FromRoute] Guid id, [FromBody] ListItem listItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(listItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListItemExists(id))
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

        // POST: api/ListItemsApi
        [HttpPost]
        public async Task<IActionResult> PostListItem([FromBody] ListItem listItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ListItem.Add(listItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ListItemExists(listItem.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetListItem", new { id = listItem.Id }, listItem);
        }

        // DELETE: api/ListItemsApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ListItem listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);
            if (listItem == null)
            {
                return NotFound();
            }

            _context.ListItem.Remove(listItem);
            await _context.SaveChangesAsync();

            return Ok(listItem);
        }

        private bool ListItemExists(Guid id)
        {
            return _context.ListItem.Any(e => e.Id == id);
        }
    }
}