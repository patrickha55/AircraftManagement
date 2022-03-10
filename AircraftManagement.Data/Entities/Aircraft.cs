using System.ComponentModel.DataAnnotations;

namespace AircraftManagement.Data.Entities
{
    public class Aircraft
    {
        [Required]
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Model { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Manufacturer { get; set; }
        public string Image { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
