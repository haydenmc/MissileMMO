using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MissileMMO.Hubs
{
    public class MissileHub : Hub
    {
        public override Task OnConnected()
        {
            Clients.All.sayHello("Hi there!");
            return base.OnConnected();
        }
        public void Hello()
        {
            Clients.All.sayHello("Hi there!");
        }
    }
}