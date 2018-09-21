using System.ComponentModel.DataAnnotations;

namespace Agenda3.Admin.Models
{
    public class ChangePasswordViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        public string SenhaAtual { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string NovaSenha { get; set; }

        [DataType(DataType.Password)]
        [Compare("NovaSenha", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmarNovaSenha { get; set; }
    }
}