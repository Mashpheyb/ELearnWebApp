using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Models
{
    public class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public Response CreateSuccessRespone(object data, string message)
        {
            return new Response
            {
                Success = true,
                Message = message,
                Data = data
            };
        }

        public Response CreatePermissionGrantedResponse()
        {
            return new Response
            {
                Success = true,
                Message = "Permission Granted"
            };
        }
    }
}
