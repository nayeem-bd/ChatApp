using ChatApp.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Data;
using System.Data.SqlClient;

namespace ChatApp.Controllers
{
    public class User
    {
        public required string email { get; set; }
        public required string firstName { get; set; }
        public required string lastName { get; set; }
    }
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IHubContext<ChatHub> _hubContext;
        public UserController(IHubContext<ChatHub> hubContext, IConfiguration configuration)
        {
            _configuration = configuration;
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("")]
        public JsonResult GetUser([FromQuery]string email="")
        {
            string query = "select * from dbo.UserTable";
            if (email != "") query += $" where email='{email}'";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("ChatAppDBCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    myCon.Open();
                    using(SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }catch(Exception ex) { 
                return new JsonResult(ex.Message);
            }

            return new JsonResult(table);
        }
        [HttpPost]
        [Route("")]
        public async Task<JsonResult> CreateUser([FromBody] User user)
        {
            string query = "insert into dbo.UserTable values(@email,@firstName,@lastName)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("ChatAppDBCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@email", user.email);
                        myCommand.Parameters.AddWithValue("@firstName", user.firstName);
                        myCommand.Parameters.AddWithValue("@lastName", user.lastName);
                        
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
                await _hubContext.Clients.All.SendAsync("ReceiveNewUser", user.email);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }

            return new JsonResult(table);
        }

        [HttpGet]
        [Route("list")]
        public JsonResult GetUserList([FromQuery] string email = "")
        {
            string query = "select * from dbo.UserTable";
            if (email != "") query += $" where email != '{email}'";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("ChatAppDBCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }

            return new JsonResult(table);
        }

    }
}
