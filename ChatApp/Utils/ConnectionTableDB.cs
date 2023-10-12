using ChatApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace ChatApp.Utils
{
    public class ConnectionTableDB
    {
        private IConfiguration _configuration;
        public ConnectionTableDB(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public JsonResult CreateConnection(string email, string conId)
        {
            string query = "insert into dbo.ConnectionTable (email,connectionId) values(@email,@conId)";
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
                        myCommand.Parameters.AddWithValue("@email", email);
                        myCommand.Parameters.AddWithValue("@conId", conId);

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
        public JsonResult DeleteConnection(string conId)
        {
            string query = $"delete from dbo.ConnectionTable where connectionId = '{conId}'";
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
        public JsonResult GetConnection(string email)
        {
            string query = $"select * from dbo.ConnectionTable where email = '{email}'";
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
