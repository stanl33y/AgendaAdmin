using System.Web.Mvc;

namespace Agenda3.Admin.Areas.Funcionarios
{
    public class FuncionariosAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Funcionarios";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Funcionarios_default",
                "Funcionarios/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}