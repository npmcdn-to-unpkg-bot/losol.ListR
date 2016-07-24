using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace losol.ListR.Models
{
    public class ListDefinition
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [ScaffoldColumn(false)]
        public Guid Id { get; set; }
        public Guid UserGuid { get; set; }
        public virtual ICollection<ListItem> ListItems { get; set; }
    }
}
