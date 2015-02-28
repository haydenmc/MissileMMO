using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MissileMMO.Game.Entities
{
    public class GameEntity
    {
        [JsonProperty("entityId")]
        public Guid EntityId { get; set; }
        [JsonProperty("entityName")]
        public string EntityName { get
            {
                return this.GetType().Name;
            }
        }
        public GameEntity()
        {
            this.EntityId = Guid.NewGuid();
        }

        virtual public void Update() { }
    }
}
