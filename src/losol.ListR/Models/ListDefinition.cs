using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace losol.ListR.Models
{
    public class ListDefinition
    {
        public string ListGuid { get; set; }
        public string UserGuid { get; set; }
        public virtual ICollection<ListItem> ListItems { get; set; }
    }
}
