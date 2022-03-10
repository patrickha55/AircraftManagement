using AircraftManagement.Data.DTOs.AircraftDTOs;
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
    public class AircraftsController : ControllerBase
    {
        private readonly IAircraftRepository _aircraftRepository;
        private readonly IMapper _mapper;

        public AircraftsController(IAircraftRepository aircraftRepository, IMapper mapper)
        {
            _aircraftRepository = aircraftRepository;
            _mapper = mapper;
        }

        // GET: api/<AircraftsController>
        [HttpGet]
        public ActionResult<List<AircraftDTO>> Get()
        {
            var aircrafts = _aircraftRepository.Gets();

            var aircraftDTOs = _mapper.Map<List<AircraftDTO>>(aircrafts);

            return Ok(aircraftDTOs);
        }

        // GET api/<AircraftsController>/5
        [HttpGet("{id:int}")]
        public ActionResult<AircraftDTO> Get(int id)
        {
            var aircraft = _aircraftRepository.Get(id);

            if (aircraft is null) return NotFound();

            var aircraftDTO = _mapper.Map<AircraftDTO>(aircraft);

            return Ok(aircraftDTO);
        }

        [HttpGet("model")]
        public ActionResult<List<string>> GetAircraftByModel([FromQuery] string model)
        {
            if (model == "") return BadRequest();

            var aircraft = _aircraftRepository.GetAircraft(model);

            if (aircraft is null) return NotFound();

            return Ok(aircraft);
        }

        // POST api/<AircraftsController>
        [HttpPost]
        public ActionResult<AircraftDTO> Post([FromBody] Aircraft aircraft)
        {
            _aircraftRepository.Create(aircraft);

            var aircraftDTO = _mapper.Map<AircraftDTO>(aircraft);

            return CreatedAtAction(nameof(Get), new { id = aircraftDTO.Id }, aircraftDTO);
        }

        // PUT api/<AircraftsController>/5
        [HttpPut("{id:int}")]
        public ActionResult Put(int id, [FromBody] Aircraft aircraft)
        {
            try
            {
                var currentAircraft = _aircraftRepository.Get(id);

                if (currentAircraft is null) return NotFound();

                _aircraftRepository.Update(id, aircraft);

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // DELETE api/<AircraftsController>/5
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var aircraft = _aircraftRepository.Get(id);

            if (aircraft is null) return NotFound();

            _aircraftRepository.Delete(id);

            return NoContent();
        }
    }
}
