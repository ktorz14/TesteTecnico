using MySql.Data.MySqlClient;
using System;

namespace Contract
{
    public class IConnectionFactory
    {
        static MySqlConnection GetConnection
        {
            get
            {
                var connString = "Server=localhost;Database=livraria;Uid=root;Pwd=root";
                var connection = new MySqlConnection(connString);
                return connection;
            }
        }
    }
}
