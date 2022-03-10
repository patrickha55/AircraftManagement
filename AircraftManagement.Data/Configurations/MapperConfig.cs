using AircraftManagement.Data.DTOs.AircraftDTOs;
using AircraftManagement.Data.DTOs.RoleDTOs;
using AircraftManagement.Data.Entities;
using AutoMapper;

namespace AircraftManagement.Data.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Aircraft, AircraftDTO>().ReverseMap();
            CreateMap<Aircraft, AircraftDetailDTO>().ReverseMap();

            CreateMap<Role, RoleDTO>().ReverseMap();
            CreateMap<Role, RoleDetailDTO>().ReverseMap();
        }
    }
}
