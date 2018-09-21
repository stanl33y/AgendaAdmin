using Agenda3.Admin.Controllers.Api.Funcionarios;
using Agenda3.Admin.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Agenda3.Admin.Areas.Funcionarios.Controllers
{
    public class AgendaController : Controller
    {
        public ActionResult Index() { return PartialView(); }

        public ActionResult Gerenciar() { return PartialView(); }
    }
}