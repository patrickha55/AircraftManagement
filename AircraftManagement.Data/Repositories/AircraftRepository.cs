using System;
using System.Collections.Generic;
using System.Linq;
using AircraftManagement.Data.Entities;

namespace AircraftManagement.Data.Repositories
{
    public class AircraftRepository : IAircraftRepository
    {
        private readonly List<Aircraft> _aircrafts = new List<Aircraft>
        {
            new Aircraft
            {
                Id = 1,
                Manufacturer = "Airbus",
                Model = "A380",
                Image = "https://localhost:5001/images/a380.jpg",
                RoleId = 3
            },
            new Aircraft
            {
                Id = 2,
                Manufacturer = "Lockheed Martin",
                Model = "C5 Galaxy GlobeMaster",
                Image = "https://localhost:5001/images/c5-galaxy.jpg",
                RoleId = 1
            },
            new Aircraft
            {
                Id = 3,
                Manufacturer = "Lockheed Martin",
                Model = "F22 Raptor",
                Image = "https://localhost:5001/images/f22.jpg",
                RoleId = 2
            },
            new Aircraft
            {
                Id = 4,
                Manufacturer = "Boeing",
                Model = "AH-64 Apache",
                Image = "https://localhost:5001/images/apache.jpg",
                RoleId = 4
            }
        };

        public List<Aircraft> Gets() => _aircrafts;

        public Aircraft Get(int id) => _aircrafts.SingleOrDefault(a => a.Id == id);

        public Aircraft GetAircraft(string model)
        {
            Aircraft result = null;

            foreach (var aircraft in _aircrafts)
            {
                result = model switch
                {
                    "A380" => _aircrafts.SingleOrDefault(a => a.Model.Contains(model)),
                    "747" => _aircrafts.SingleOrDefault(a => a.Model.Contains(model)),
                    "C5 Galaxy" => _aircrafts.SingleOrDefault(a => a.Model.Contains(model)),
                    _ => result
                };
            }

            return result;
        }

        public void Create(Aircraft aircraft) => _aircrafts.Add(aircraft);

        public void Update(int id, Aircraft aircraft)
        {
            var currentAircraft = Get(id);

            if (id != aircraft.Id)
                throw new ArgumentException("Invalid Id");

            currentAircraft.Manufacturer = aircraft.Manufacturer;
            currentAircraft.Model = aircraft.Model;
            currentAircraft.RoleId = aircraft.RoleId;
            currentAircraft.Image = aircraft.Image;
        }

        public void Delete(int id)
        {
            var currentAircraft = Get(id);

            _aircrafts.Remove(currentAircraft);
        }
    }
}
