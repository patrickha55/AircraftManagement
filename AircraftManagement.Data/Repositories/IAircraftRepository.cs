using System.Collections.Generic;
using AircraftManagement.Data.Entities;

namespace AircraftManagement.Data.Repositories
{
    public interface IAircraftRepository
    {
        List<Aircraft> Gets();
        Aircraft Get(int id);
        void Create(Aircraft aircraft);
        void Update(int id, Aircraft aircraft);
        void Delete(int id);
        Aircraft GetAircraft(string model);
    }
}