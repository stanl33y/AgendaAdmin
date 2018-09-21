using Agenda3.Admin.Domain.Login;
using System;

namespace Agenda3.Admin.Domain.Funcionarios
{
    public class Agenda
    {
        //ID
        public short AgendaID { get; set; }

        //Foreign Keys
        public short OperadorID { get; set; }

        //Fields
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string Marcador { get; set; }

        //Virtual Properties
        public virtual Operador Operador { get; set; }
    }
}
