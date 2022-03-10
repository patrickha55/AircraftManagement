using System.Collections.Generic;
using AircraftManagement.Data.Entities;

namespace AircraftManagement.Data.Repositories
{
    public interface IRoleRepository
    {
        void Create(Role role);
        void Delete(int id);
        Role GetRole(int id);
        List<Role> GetRoles();
        void Update(int id, Role role);
    }
}