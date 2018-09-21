using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Data.Entity;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Agenda3.Admin.Repository;
using Agenda3.Admin.Domain;
using Agenda3.Admin.Domain.Login;
using Agenda3.Admin.Identity;
using Agenda3.Admin.Entity.Identity;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Agenda3.Admin.Controllers.Api.Login
{
    [RoutePrefix("api/Operadores")]
    public class OperadoresController : ApiController
    {
        public readonly IUnitOfWork Repository;
        private readonly short AuditoriaMenu;
        private readonly string AuditoriaTabela;
        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }
        public OperadoresController() : this(new AgendaAdminUnitOfWork()) { }
        public OperadoresController(IUnitOfWork repository) {
            this.AuditoriaMenu = 11;
            this.AuditoriaTabela = "LogOperador";
            this.Repository = repository;
        }

        public IHttpActionResult Get()
        {
            var dados = Repository.Login.OperadorRepository.Get()
                .Select(p => new OperadorViewModel
                {
                    Administrador = p.Administrador,
                    Nome = p.Nome,
                    DataCadastro = p.DataCadastro,
                    DataExpiracao = p.DataExpiracao,
                    Identificador = p.Identificador,
                    OperadorID = p.OperadorID,
                }).OrderBy(p => p.Identificador);
            return Ok(dados);
        }

        public IHttpActionResult GetById(int id)
        {
            var dados = Repository.Login.OperadorRepository.Get(filter: p => p.OperadorID == id)
                            .Select(p => new OperadorViewModel
                            {
                                Administrador = p.Administrador,
                                DataCadastro = p.DataCadastro,
                                DataExpiracao = p.DataExpiracao,
                                Identificador = p.Identificador,
                                Nome = p.Nome,
                                OperadorID = p.OperadorID
                            })
                            .FirstOrDefault();

            if (dados == null)
                return NotFound();

            return Ok(dados);
        }

        [HttpPost]
        public IHttpActionResult AddOperador(Operador vm)
        {
            try
            {
                vm.LockoutEnabled = true;

                //Verifica se já existe operador com o mesmo identificador cadastrado.
                var dados = Repository.Login.OperadorRepository.Get(filter: p => p.Identificador == vm.Identificador).FirstOrDefault();

                if (dados != null)
                    return Conflict();

                if (!ModelState.IsValid)
                    return StatusCode(HttpStatusCode.NotAcceptable);

                var user = new ApplicationUser
                {
                    UserName = vm.Identificador,
                    DataCadastro = DateTime.Now,
                    DataExpiracao = vm.DataExpiracao,
                    Administrador = vm.Administrador,
                    Situacao = Convert.ToByte(vm.Situacao),
                    Email = vm.Email,
                    EmailConfirmed = true
                };

                var result = UserManager.Create(user, vm.Senha);

                if (!result.Succeeded)
                    return StatusCode(HttpStatusCode.NotAcceptable);

                var userBd = Repository.Login.OperadorRepository.Get(filter: p => p.Identificador == vm.Identificador).FirstOrDefault();

                return Ok(userBd);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }

        public IHttpActionResult Put(Operador vm)
        {
            try
            {
                if (!ModelState.IsValid)
                    return StatusCode(HttpStatusCode.NotAcceptable);

                var dados = Repository.Login.OperadorRepository.Get(filter: p => p.OperadorID == vm.OperadorID).FirstOrDefault();

                var dadosConfirm = Repository.Login.OperadorRepository.Get(filter: p => p.Identificador == vm.Identificador).FirstOrDefault();

                if (dadosConfirm != null)
                {
                    if (dadosConfirm.OperadorID != vm.OperadorID)
                        return Conflict();
                }

                if (dados == null)
                    return NotFound();

                dados.Identificador = vm.Identificador;
                dados.Nome = vm.Nome;
                dados.Situacao = vm.Situacao;
                dados.DataExpiracao = vm.DataExpiracao;
                dados.Administrador = vm.Administrador;

                Repository.SaveChanges();

                if (vm.Senha != "")
                {
                    string PasswordResetToken = UserManager.GeneratePasswordResetToken(vm.OperadorID);

                    var result = UserManager.ResetPassword(vm.OperadorID, PasswordResetToken, vm.Senha);

                    if (!result.Succeeded)
                        return StatusCode(HttpStatusCode.NotAcceptable);
                }

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
                var dados = Repository.Login.OperadorRepository.GetByID(id);

                if (dados == null)
                    return NotFound();

                Repository.Login.OperadorRepository.Delete(dados);
                Repository.SaveChanges();

                return Ok(dados);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }
    }

    public class OperadorCargosViewModel
    {
        public Operador Operador { get; set; }
        public List<short> Cargos { get; set; }
    }

    public class OperadorViewModel
    {
        public short OperadorID { get; set; }
        public short FuncionarioID { get; set; }
        public short LogGrupoAcessoID { get; set; }
        public string Identificador { get; set; }
        public string Nome { get; set; }
        public string GrupoAcesso { get; set; }
        public bool Administrador { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime? DataExpiracao { get; set; }
    }
}