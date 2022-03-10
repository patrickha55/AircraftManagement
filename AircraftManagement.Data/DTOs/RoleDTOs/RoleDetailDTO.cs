using AircraftManagement.Data.DTOs.AircraftDTOs;
using System.Collections.Generic;

namespace AircraftManagement.Data.DTOs.RoleDTOs
{
    public class RoleDetailDTO : RoleDTO
    {
        public List<AircraftDTO> Aircrafts { get; set; }
    }
}
