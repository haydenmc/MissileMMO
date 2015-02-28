using Microsoft.AspNet.SignalR;
using MissileMMO.Game.Entities;
using MissileMMO.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MissileMMO.Game
{
    public class GameLoop
    {
        private readonly static Lazy<GameLoop> _instance =
            new Lazy<GameLoop>(() => new GameLoop());
        public static GameLoop Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        private int WorldWidth = 1024;
        private int WorldHeight = 768;
        private long ElapsedTicks = 0;

        private ConcurrentDictionary<Guid, GameEntity> WorldEntities = new ConcurrentDictionary<Guid, GameEntity>();

        private readonly TimeSpan UpdateInterval =
            TimeSpan.FromMilliseconds(16.666); // 60 fps
        private readonly Timer _updateLoop;
        private readonly TimeSpan BroadcastInterval =
            TimeSpan.FromMilliseconds(33.333); // 30 fps
        private readonly Timer _broadcastLoop;
        private readonly IHubContext _hubContext;

        public GameLoop()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<MissileHub>();
            _updateLoop = new Timer(
                Update,
                null,
                UpdateInterval,
                UpdateInterval);
            _broadcastLoop = new Timer(
                Broadcast,
                null,
                BroadcastInterval,
                BroadcastInterval);
        }

        public void AddEntity(GameEntity entity)
        {
            WorldEntities.TryAdd(entity.EntityId, entity);
        }

        private void Update(object state)
        {
            ElapsedTicks++;
            if (ElapsedTicks % (60*10) == 0)
            {
                var r = new Random();
                var b = new Bomb(r.Next(WorldWidth), 0, Math.PI / 2, 2);
                WorldEntities.TryAdd(b.EntityId, b);
            }
            foreach (var i in WorldEntities.Values)
            {
                i.Update();
            }
        }

        private void Broadcast(object state)
        {
            _hubContext.Clients.All.updateGameEntities(WorldEntities.Values);
        }
    }
}
