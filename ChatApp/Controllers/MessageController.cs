using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using ChatApp.Hubs;
using Microsoft.AspNetCore.SignalR;
using ChatApp.Utils;
using Newtonsoft.Json;

namespace ChatApp.Controllers
{
    
    public class Message
    {
        public required string sender { get; set; }
        public required string receiver { get; set; }
        public string? messageText { get; set; } 
        public int? messageId { get; set; }
        public string? timestamp { get; set;}
    }

    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {

        private IConfiguration _configuration;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly ConnectionTableDB _connectionTableDB;
        public MessageController(IHubContext<ChatHub> hubContext, IConfiguration configuration, ConnectionTableDB connectionTableDB)
        {
            _configuration = configuration;
            _hubContext = hubContext;
            _connectionTableDB = connectionTableDB;
        }

        [HttpGet]
        [Route("")]
        public JsonResult GetMessage([FromQuery] Message message)
        {
            string query = $"select * from dbo.Messages where (sender = '{message.sender}' and receiver = '{message.receiver}') or (sender = '{message.receiver}' and receiver = '{message.sender}') order by timestamp";
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
                Console.WriteLine(ex.Message);
                return new JsonResult(ex.Message);
            }

            return new JsonResult(table);
        }

        [HttpPost]
        [Route("")]
        public async Task<JsonResult> CreateMessage([FromBody] Message  message)
        {
            string query = "insert into dbo.Messages (sender,receiver,messageText) values(@sender,@receiver,@messageText)";
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
                        myCommand.Parameters.AddWithValue("@sender", message.sender);
                        myCommand.Parameters.AddWithValue("@receiver", message.receiver);
                        myCommand.Parameters.AddWithValue("@messageText", message.messageText);

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

        [HttpDelete]
        [Route("")]
        public JsonResult DeleteMessage([FromQuery] Message message)
        {
            string query = $"delete from dbo.Messages where (sender = '{message.sender}' and receiver = '{message.receiver}') or (sender = '{message.receiver}' and receiver = '{message.sender}')";
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
                Console.WriteLine(ex.Message);
                return new JsonResult(ex.Message);
            }

            return new JsonResult(table);
        }

        [HttpGet]
        [Route("all")]
        public JsonResult GetAllMessage(string sender)
        {
            string query = $"select * from dbo.Messages where (sender = '{sender}' or receiver = '{sender}') order by messageId";
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
                Console.WriteLine(ex.Message);
                return new JsonResult(ex.Message);
            }

            JsonResult res = new JsonResult(table);
            Dictionary<string, string> users = new Dictionary<string, string>();

            foreach (DataRow row in table.Rows)
            {
                var messaageId = row.Field<int>(0);
                var sender_n = row.Field<string>(1);
                var receiver = row.Field<string>(2);
                var messageText = row.Field<string>(3);
                if (sender_n == sender)
                {
                    users[$"{sender}+{receiver}"] = messageText;
                }
                else
                {
                    users[$"{receiver}+{sender_n}"] = messageText;
                }
            }

            return new JsonResult(users);
        }
    }
}
