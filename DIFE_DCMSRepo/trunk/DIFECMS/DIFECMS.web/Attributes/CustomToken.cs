using Microsoft.Data.SqlClient;

namespace DIFECMS.Web.Attributes
{
    public class CustomToken
    {
        public static string GenerateUserAuthorizeTokenData(string connectionString, string queryString)
        {
            using (SqlConnection connection = new SqlConnection(
                       connectionString))
            {
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                connection.Open();

                string userid = "";
                string usertype = "";
                string name = "";
                string password = "";
                string activestatus = "";
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        userid = reader["Id"].ToString();
                        usertype = reader["UserTypeId"].ToString();
                        name = reader["Name"].ToString();
                        password = reader["Password"].ToString();
                        activestatus = reader["isActive"].ToString();
                    }
                }

                var ExpiryTime = DateTime.Now.AddDays(1);
                return "EN#" + userid + "#" + usertype + "#" + name + "#" + ExpiryTime.ToString("yyyy-MM-dd") + "#" + password + "#" + activestatus;

            }
        }
    }
}
