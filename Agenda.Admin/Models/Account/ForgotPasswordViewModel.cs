using System.ComponentModel.DataAnnotations;

namespace Agenda3.Admin.Models
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}