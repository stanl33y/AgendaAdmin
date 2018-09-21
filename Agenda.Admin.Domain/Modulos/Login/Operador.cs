using Agenda3.Admin.Domain.Funcionarios;
using System;
using System.Collections.Generic;

namespace Agenda3.Admin.Domain.Login
{
    public class Operador
    {
        public Operador()
        {
            this.Agendas = new List<Agenda>();
        }

        //ID
        public short OperadorID { get; set; }

        //Foreign Keys
        
        //Fields
        public string Identificador { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool Administrador { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime? DataExpiracao { get; set; }
        public DateTime? LockoutEndDateUtc { get; set; }
        public int AccessFailedCount { get; set; }
        public byte Situacao { get; set; }

        //Virtual Properties
        public virtual ICollection<Agenda> Agendas { get; set; }
    }
}
