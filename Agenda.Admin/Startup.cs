using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Agenda3.Admin.Startup))]
namespace Agenda3.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
