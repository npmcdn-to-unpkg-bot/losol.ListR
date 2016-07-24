using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace losol.ListR.Models
{
    public class ListItem
    {
        [ScaffoldColumn(false)]
        public string ListItemGuid { get; set; }

        [ScaffoldColumn(false)]
        public string ListGuid { get; set; }

        [Display(Name = "Antall")]
        public float No { get; set; }

        [Display(Name = "Enhet")]
        public string Unit { get; set; }

        [Required]
        [Display(Name = "Beskrivelse")]
        public string Description { get; set; }

        [Display(Name = "Kategori")]
        public string Category { get; set; }

        [Display(Name = "Viktig?")]
        public bool IsImportant { get; set; }

        [Display(Name = "Ferdig?")]
        public bool IsDone { get; set; }

        [Display(Name = "Lagt til Dato")]
        [DataType(DataType.Date)]
        public DateTime AddedDate { get; set; }


    }

}