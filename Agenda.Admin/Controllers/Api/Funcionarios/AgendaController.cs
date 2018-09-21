using System.Web.Http;
using System.Linq;
using System.Data.Entity;
using Agenda3.Admin.Repository;
using Agenda3.Admin.Domain.Funcionarios;
using System.Net;
using System;

namespace Agenda3.Admin.Controllers.Api.Funcionarios
{
    [RoutePrefix("api/Agenda")]
    public class AgendaController : ApiController
    {
        public readonly IUnitOfWork Repository;
        public AgendaController(): this(new AgendaAdminUnitOfWork()) {}
        public AgendaController(IUnitOfWork repository)
        {
            this.Repository = repository;
        }
        
        [HttpGet]
        public IHttpActionResult Get()
        {
            var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

            var result = from item in Repository.Funcionarios.AgendaRepository.Get(p => p.OperadorID == operador.OperadorID)
                         select new AgendaViewModel { AgendaID = item.AgendaID, title = item.Titulo, type = item.Marcador, startsAt = item.DataInicio, endsAt = item.DataFim, editable = true, deletable = true, draggable = true, resizable = true, incrementsBadgeTotal = true };

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {

            var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

            var dados = Repository.Funcionarios.AgendaRepository.Get(filter: p => p.AgendaID == id && p.OperadorID == operador.OperadorID)
                            .AsNoTracking()
                            .FirstOrDefault();

            if (dados == null)
                return NotFound();

            return Ok(dados);
        }

        [HttpPost]
        public IHttpActionResult AddCompromisso(Agenda vm)
        {
            try
            {
                if (!ModelState.IsValid)
                    return StatusCode(HttpStatusCode.NotAcceptable);

                var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

                vm.OperadorID = operador.OperadorID;

                Repository.Funcionarios.AgendaRepository.Insert(vm);
                Repository.SaveChanges();

                return Ok(vm);
            }
            catch (Exception ex)
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }

        public IHttpActionResult Put(Agenda vm)
        {
            try
            {
                if (!ModelState.IsValid)
                    return StatusCode(HttpStatusCode.NotAcceptable);

                var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

                var dados = Repository.Funcionarios.AgendaRepository.Get(filter: p => p.AgendaID == vm.AgendaID && vm.OperadorID == operador.OperadorID)
                                        .FirstOrDefault();

                if (dados == null)
                    return NotFound();

                dados.Titulo = vm.Titulo;
                dados.Descricao = vm.Descricao;
                dados.DataInicio = vm.DataInicio;
                dados.DataFim = vm.DataFim;
                dados.Marcador = vm.Marcador;

                Repository.SaveChanges();

                return Ok(dados);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

                var dados = Repository.Funcionarios.AgendaRepository.Get(filter: p => p.AgendaID == id && p.OperadorID == operador.OperadorID)
                    .FirstOrDefault();
                
                if (dados == null)
                    return NotFound();

                Repository.Funcionarios.AgendaRepository.Delete(dados);
                Repository.SaveChanges();

                return Ok(dados);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }
    }

    public class AgendaViewModel
    {
        public short AgendaID { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public System.DateTime startsAt { get; set; }
        public System.DateTime endsAt { get; set; }
        public bool editable { get; set; }
        public bool deletable { get; set; }
        public bool draggable { get; set; }
        public bool resizable { get; set; }
        public bool incrementsBadgeTotal { get; set; }
    }
}
