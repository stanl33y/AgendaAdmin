using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Agenda3.Admin.Models;
using Agenda3.Admin.Identity;
using Agenda3.Admin.Entity.Identity;
using Agenda3.Admin.Repository;
using Agenda3.Admin.Entity;
using Agenda3.Admin.Domain.Login;
using System.Text;
using System.Net.Mail;

namespace Agenda3.Admin.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly IUnitOfWork Repository;
        private readonly IdentityContext RepositoryIdentity;

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }

        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        public AccountController()
        {
            this.Repository = new AgendaAdminUnitOfWork();
            this.RepositoryIdentity = new IdentityContext();
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager, IUnitOfWork repository)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            Repository = repository;
        }

        #region Login / Logout
        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            ViewBag.Invalid = false;

            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            try
            {
                if (User.Identity.IsAuthenticated)
                    return RedirectToAction("Index", "Home");

                if (!ModelState.IsValid)
                    throw new Exception();

                var result = await SignInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, shouldLockout: true);
                switch (result)
                {
                    case SignInStatus.Success:
                        {
                            var UserIP = Request.ServerVariables["REMOTE_ADDR"];

                            //Registra o log de acesso e zera o AccessFailedCount
                            var operador = Repository.Login.OperadorRepository.Get(p => p.Identificador == model.Login).First();
                            operador.AccessFailedCount = 0;

                            Repository.SaveChanges();

                            return RedirectToAction("Index", "Home");
                        }
                    case SignInStatus.LockedOut:
                        return View("Lockout");
                    case SignInStatus.Failure:
                    default:
                        throw new Exception();
                }
            }
            catch (Exception ex)
            {
                ViewBag.Invalid = true;
                return View();
            }
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        public ActionResult LogOff()
        {
            HttpContext.GetOwinContext().Authentication.SignOut();
            return Json(true);
        }
        #endregion

        #region Esqueceu Senha
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByEmailAsync(model.Email);
                //if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                //{
                //    // Don't reveal that the user does not exist or is not confirmed
                //    return View("ForgotPasswordConfirmation");
                //}

                if (user == null)
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                //await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                //return RedirectToAction("ForgotPasswordConfirmation", "Account");

                var mensagem = new StringBuilder();
                mensagem.AppendLine("<p>Instruções para recuperação de senha.</p>");
                mensagem.AppendLine("<p>Este email permite que você crie uma nova senha de acesso.</p>");
                mensagem.AppendLine("<p>Caso não tenha solicitado a recuperação de sua senha, delete este email.</p>");
                mensagem.AppendLine("<p><a href=\"" + callbackUrl + "\">Clique aqui</a> para criar uma nova senha de acesso.</p>");
                mensagem.AppendLine("<p><em>Essa mensagem foi enviada automaticamente pelo servidor. Por favor não responda este email</em>.</p>");

                var message = new MailMessage();
                message.To.Add(new MailAddress(model.Email));
                message.Subject = "Gestcom - Recuperação de Senha";
                message.Body = mensagem.ToString();
                message.IsBodyHtml = true;

                using (var smtp = new SmtpClient())
                {
                    await smtp.SendMailAsync(message);
                    return RedirectToAction("ForgotPasswordConfirmation", "Account");
                }
            }

            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            //AddErrors(result);
            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }
        #endregion

        #region Alterar Senha
        public ActionResult AlterarSenha()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult AlterarSenha(ChangePasswordViewModel dados)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception();

                var UsuarioLogado = RepositoryIdentity.Users.First(p => p.UserName == User.Identity.Name);
                if (!UserManager.CheckPassword(UsuarioLogado, dados.SenhaAtual))
                    return new HttpStatusCodeResult(404, "Senha atual inválida"); //404 - Not Found

                string PasswordResetToken = UserManager.GeneratePasswordResetToken(UsuarioLogado.Id);

                var result = UserManager.ResetPassword(UsuarioLogado.Id, PasswordResetToken, dados.NovaSenha);

                if (result.Succeeded)
                    return Json("OK");

                return new HttpStatusCodeResult(417, "Não alterado no servidor"); //417 - Expectation Failed

                throw new Exception("Senha Atual Inválida");
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(406, "Não Aceito"); //406 - Not Acceptable
            }
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }
    }
}