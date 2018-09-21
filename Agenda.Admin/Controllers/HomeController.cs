using Agenda3.Admin.Repository;
using System.Web.Mvc;
using System.Linq;

namespace Agenda3.Admin.Controllers
{
    public class HomeController : Controller
    {

        public readonly IUnitOfWork Repository;
        public HomeController() : this(new AgendaAdminUnitOfWork()) { }
        public HomeController(IUnitOfWork repository)
        {
            this.Repository = repository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Inicio()
        {
            return PartialView();
        }

        public ActionResult _Menu()
        {
            var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == User.Identity.Name).First();

            ViewBag.UsuarioLogado = operador.Nome;

            return PartialView();
        }

        #region Acesso Anonimo
        [AllowAnonymous]
        public ActionResult AcessoNegado()
        {
            if (Request.IsAjaxRequest())
                return PartialView();

            return View();
        }
        #endregion
    }
}