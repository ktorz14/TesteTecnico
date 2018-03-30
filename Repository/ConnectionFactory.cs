using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class ConnectionFactory
    {
            static public MySqlConnection GetConnection
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
