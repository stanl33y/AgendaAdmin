using System.ComponentModel.DataAnnotations;

namespace Agenda3.Admin.Models
{
    public class ForgotViewModel
    {
        [Required]
        public string Email { get; set; }
    }
}