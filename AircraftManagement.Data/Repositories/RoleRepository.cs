using System;
using System.Collections.Generic;
using System.Linq;
using AircraftManagement.Data.Entities;

namespace AircraftManagement.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly List<Role> _roles = new List<Role>
        {
            new Role {
                Id  = 1,
                Name = "Strategic Air Lifter"
            },
            new Role {
                Id = 2,
                Name = "Air Superiority Fighter"
            },
            new Role {
                Id = 3,
                Name = "Wide Body Airliner"
            },
            new Role {
                Id = 4,
                Name = "Attack Helicopter"
            }
        };

        public List<Role> GetRoles() => _roles;

        public Role GetRole(int id) => _roles.SingleOrDefault(r => r.Id == id);

        public void Create(Role role) => _roles.Add(role);

        public void Update(int id, Role role)
        {
            var currentRole = GetRole(id);

            if (id != role.Id)
                throw new ArgumentException("Invalid Id");

            currentRole.Name = role.Name;
        }

        public void Delete(int id)
        {
            var role = GetRole(id);

            _roles.Remove(role);
        }
    }
}