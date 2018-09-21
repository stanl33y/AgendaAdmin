using System.Web.Mvc;

namespace Agenda3.Admin.Areas.Login.Controllers
{
    public class OperadorController : Controller
    {
        public ActionResult Index() { return PartialView(); }

        public ActionResult Cadastro() { return PartialView(); }
    }
}