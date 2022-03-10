using AircraftManagement.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using AircraftManagement.Data.Entities;
using AircraftManagement.Data.Repositories;
using AutoMapper;
using Xunit;

namespace AircraftManagementTest
{
    public class AircraftsControllerTest
    {
        private readonly AircraftsController _aircraftsController;
        private readonly Mock<IAircraftRepository> _aircraftRepository;
        private readonly Mock<IRoleRepository> _roleRepository;
        private readonly IMapper _mapper;

        public AircraftsControllerTest(IMapper mapper)
        {
            _mapper = mapper;
            _aircraftRepository = new Mock<IAircraftRepository>();
            _roleRepository = new Mock<IRoleRepository>();
            _aircraftsController = new AircraftsController(_aircraftRepository.Object, _mapper, _roleRepository.Object);
        }

        [Fact]
        public void Get_AllAircrafts_ShouldReturnOkActionResult()
        {
            // arrage
            _aircraftRepository.Setup(a => a.Gets())
                .Returns(new List<Aircraft> { new Aircraft(), new Aircraft(), new Aircraft() });

            //act
            var actionResult = _aircraftsController.Get().Result as OkObjectResult;

            // assert
            Assert.IsType<OkObjectResult>(actionResult);

            var aircrafts = Assert.IsType<List<Aircraft>>(actionResult.Value);

            Assert.Equal(3, aircrafts.Count);
        }

        [Fact]
        public void Get_AnAircraft_ShouldReturnOkActionResult()
        {
            // arrage
            var aircraft = new Aircraft
            {
                Id = 1,
                Manufacturer = "Airbus",
                Model = "A380",
                RoleId = 3
            };

            _aircraftRepository.Setup(a => a.Get(1))
                .Returns(aircraft);

            //act
            var actionResult = _aircraftsController.Get(1).Result as OkObjectResult;

            // assert
            Assert.IsType<OkObjectResult>(actionResult);

            var result = Assert.IsType<Aircraft>(actionResult.Value);
            Assert.True(result.Model == aircraft.Model);
        }

        [Theory]
        [InlineData(4)]
        [InlineData(5)]
        public void Get_ANonExistingAircraft_ShouldReturnNotFoundActionResult(int id)
        {
            //arrange 
            _aircraftRepository.Setup(a => a.Get(id))
                .Returns((Aircraft)null);

            var actionResult = _aircraftsController.Get(id);

            Assert.IsType<NotFoundResult>(actionResult.Result);
        }

        [Fact]
        public void GetAircraft_AnExistingAircraft_ShouldReturnOkActionResult()
        {
            const string model = "A380";

            _aircraftRepository.Setup(a => a.GetAircraft(model))
                .Returns(new Aircraft
                {
                    Id = 1,
                    Manufacturer = "Airbus",
                    Model = "A380",
                    RoleId = 3
                });

            //act
            var actionResult = _aircraftsController.GetAircraftByModel(model).Result as OkObjectResult;

            // assert
            Assert.IsType<OkObjectResult>(actionResult);

            var result = Assert.IsType<Aircraft>(actionResult.Value);
            Assert.True(result.Model == model);
        }

        [Fact]
        public void Post_NewAircraft_ShouldReturnCreatedAtActionResult()
        {
            var aircraft = new Aircraft
            {
                Id = 4,
                Model = "Antonov An-225 Mriya",
                Manufacturer = "Antonov",
                RoleId = 1
            };

            _aircraftRepository.Setup(a => a.Create(aircraft));

            var actionResult = _aircraftsController.Post(aircraft).Result as CreatedAtActionResult;

            Assert.IsType<CreatedAtActionResult>(actionResult);

            var createdAircraft = Assert.IsType<Aircraft>(actionResult.Value);
            Assert.True(createdAircraft.Model == aircraft.Model);
        }

        [Fact]
        public void Put_ExistingAircraft_ShouldReturnNoContentResult()
        {
            var aircraft = new Aircraft
            {
                Id = 2,
                Model = "Antonov An-225 Mriya",
                Manufacturer = "Antonov",
                RoleId = 1
            };

            _aircraftRepository.Setup(a => a.Get(2))
                .Returns(new Aircraft
                {
                    Id = 2,
                    Manufacturer = "Lockheed Martin",
                    Model = "C5 Galaxy GlobeMaster",
                    RoleId = 1
                });

            _aircraftRepository.Setup(a => a.Update(2, aircraft));

            var actionResult = _aircraftsController.Put(2, aircraft);

            Assert.IsType<NoContentResult>(actionResult);
        }

        [Theory]
        [InlineData(4)]
        [InlineData(5)]
        public void Put_ExistingAircraftWithInvalidId_ShouldReturnStatusCode500(int id)
        {
            var aircraft = new Aircraft
            {
                Id = 2,
                Model = "Antonov An-225 Mriya",
                Manufacturer = "Antonov",
                RoleId = 1
            };

            _aircraftRepository.Setup(a => a.Get(id))
                .Returns(aircraft);

            _aircraftRepository.Setup(a => a.Update(id, aircraft))
                .Throws<ArgumentException>();

            var result = _aircraftsController.Put(id, aircraft) as ObjectResult;

            Assert.Equal(500, result?.StatusCode);
        }

        [Theory]
        [InlineData(4)]
        [InlineData(5)]
        public void Put_NonExistingAircraft_ShouldReturnNotFoundResult(int id)
        {
            _aircraftRepository.Setup(a => a.Get(id))
                .Returns((Aircraft)null);

            var actionResult = _aircraftsController.Put(id, new Aircraft());

            Assert.IsType<NotFoundResult>(actionResult);
        }

        [Fact]
        public void Delete_ExistingAircraft_ShouldReturnNoContentResult()
        {
            _aircraftRepository.Setup(a => a.Get(2))
                .Returns(new Aircraft
                {
                    Id = 2,
                    Manufacturer = "Lockheed Martin",
                    Model = "C5 Galaxy GlobeMaster",
                    RoleId = 1
                });

            var actionResult = _aircraftsController.Delete(2);

            Assert.IsType<NoContentResult>(actionResult);
        }

        [Theory]
        [InlineData(4)]
        [InlineData(5)]
        public void Delete_NonExistingAircraft_ShouldReturnNotFoundResult(int id)
        {
            _aircraftRepository.Setup(a => a.Get(id))
                .Returns((Aircraft)null);

            var actionResult = _aircraftsController.Delete(id);

            Assert.IsType<NotFoundResult>(actionResult);
        }
    }
}