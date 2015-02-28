using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MissileMMO.Game.Entities
{
    class Bomb : GameEntity
    {
        [JsonProperty("x")]
        private int x { get; set; }
        [JsonProperty("y")]
        private int y { get; set; }
        [JsonProperty("beginX")]
        private int beginX { get; set; }
        [JsonProperty("beginY")]
        private int beginY { get; set; }
        [JsonProperty("direction")]
        private double direction { get; set; }
        [JsonProperty("velocity")]
        private double velocity { get; set; }
        public Bomb(int x, int y, double direction, double velocity) : base()
        {
            this.beginX = x;
            this.beginY = y;
            this.x = x;
            this.y = y;
            this.direction = direction;
            this.velocity = velocity;
        }

        override public void Update()
        {
            this.x += (int)(this.velocity * Math.Cos(this.direction));
            this.y += (int)(this.velocity * Math.Sin(this.direction));
        }
    }
}
