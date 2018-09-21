using System.Web.Mvc;
using System.Web.Routing;

namespace Agenda3.Admin
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "ClienteResponderQuestionario",
                url: "questionario/{hash}",
                defaults: new { controller = "Home", action = "QuestionarioClienteHash" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
