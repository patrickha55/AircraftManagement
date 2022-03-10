using AircraftManagement.Data.DTOs.RoleDTOs;
using AircraftManagement.Data.Entities;
using AircraftManagement.Data.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AircraftManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RolesController(IMapper mapper, IRoleRepository roleRepository)
        {
            _mapper = mapper;
            _roleRepository = roleRepository;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public ActionResult<List<RoleDTO>> Get()
        {
            var roles = _roleRepository.GetRoles();

            var roleDTOs = _mapper.Map<List<RoleDTO>>(roles);

            return Ok(roleDTOs);
        }

        // GET api/<RolesController>/5
        [HttpGet("{id:int}")]
        public ActionResult<RoleDTO> Get(int id)
        {
            var role = _roleRepository.GetRole(id);

            if (role is null) return NotFound();

            var roleDTO = _mapper.Map<RoleDTO>(role);

            return Ok(roleDTO);
        }

        // POST api/<RolesController>
        [HttpPost]
        public ActionResult<RoleDTO> Post([FromBody] RoleDTO roleDTO)
        {
            _roleRepository.Create(_mapper.Map<Role>(roleDTO));

            return CreatedAtAction(nameof(Get), new { id = roleDTO.Id }, roleDTO);
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id:int}")]
        public ActionResult Put(int id, [FromBody] RoleDTO roleDTO)
        {
            try
            {
                var role = _roleRepository.GetRole(id);

                if (role is null) return NotFound();

                _roleRepository.Update(id, _mapper.Map<Role>(roleDTO));

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var role = _roleRepository.GetRole(id);

            if (role is null) return NotFound();

            _roleRepository.Delete(id);

            return NoContent();
        }
    }
}
