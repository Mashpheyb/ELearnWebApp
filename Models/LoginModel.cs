﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Models
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
    }
}
