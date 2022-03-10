using System.Collections.Generic;

namespace AircraftManagement.Data.Entities {
    public class Role {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Aircraft> Aircrafts { get; set; }      
    }
}