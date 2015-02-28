using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using MissileMMO.Game;

namespace MissileMMO.Hubs
{
    public class MissileHub : Hub
    {

        // Is set via the constructor on each creation
        private GameLoop _gameLoop;
        public MissileHub()
	        : this(GameLoop.Instance)
	    {
        }
        public MissileHub(GameLoop gameLoop)
        {
            _gameLoop = gameLoop;
        }

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