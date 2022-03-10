using AircraftManagement.Data.DTOs.RoleDTOs;

namespace AircraftManagement.Data.DTOs.AircraftDTOs
{
    public class AircraftDetailDTO : AircraftDTO
    {
        public RoleDTO Role { get; set; }
    }
}
