using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using losol.ListR.Data;
using losol.ListR.Models;

namespace losol.ListR.Controllers
{
    public class ListItemsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ListItemsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: ListItems
        public async Task<IActionResult> Index()
        {
            return View(await _context.ListItem.ToListAsync());
        }

        // GET: ListItems/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);
            if (listItem == null)
            {
                return NotFound();
            }

            return View(listItem);
        }

        // GET: ListItems/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ListItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AddedDate,Category,Description,IsDone,IsImportant,No,Unit")] ListItem listItem)
        {
            if (ModelState.IsValid)
            {
                listItem.Id = Guid.NewGuid();
                _context.Add(listItem);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(listItem);
        }

        // GET: ListItems/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);
            if (listItem == null)
            {
                return NotFound();
            }
            return View(listItem);
        }

        // POST: ListItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("AddedDate,Category,Description,IsDone,IsImportant,No,Unit")] ListItem listItem)
        {
            if (id != listItem.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(listItem);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ListItemExists(listItem.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            return View(listItem);
        }

        // GET: ListItems/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);
            if (listItem == null)
            {
                return NotFound();
            }

            return View(listItem);
        }

        // POST: ListItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var listItem = await _context.ListItem.SingleOrDefaultAsync(m => m.Id == id);
            _context.ListItem.Remove(listItem);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool ListItemExists(Guid id)
        {
            return _context.ListItem.Any(e => e.Id == id);
        }
    }
}
