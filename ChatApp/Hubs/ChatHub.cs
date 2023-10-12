using ChatApp.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ChatApp.Hubs
{
    public class ConnectionInfo
    {
        public  int id { get; set; }
        public string email { get; set; }
        public string connectionId { get; set; }

    }
    public class ChatHub:Hub
    {
        private readonly ConnectionTableDB _connectionTableDB;
        public ChatHub(ConnectionTableDB connectionTableDB)
        {
            _connectionTableDB = connectionTableDB;
        }
        public override async Task OnConnectedAsync()
        {
            var email = Context.GetHttpContext().Request.Query["email"];
            var conId = Context.ConnectionId;
            _connectionTableDB.CreateConnection(email,conId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _connectionTableDB.DeleteConnection(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendNewUserRegistered(string email)
        {
            await Clients.All.SendAsync("ReceiveNewUser", email);
        }

        public async Task SendMessage(string email,string message)
        {
            try
            {
                JsonResult res = _connectionTableDB.GetConnection(email);
                if (res != null)
                {
                    List<ConnectionInfo> data = JsonConvert.DeserializeObject<List<ConnectionInfo>>(JsonConvert.SerializeObject(res.Value));
                    var connectionIds = data.Select(data => data.connectionId).ToList<string>();
                    await Clients.Clients(connectionIds).SendAsync("ReceiveMessage",email, message);
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

    }
}
