using System;
using AircraftManagement.Data.Entities;
using AircraftManagement.Data.Repositories;
using Xunit;
using FluentAssertions;

namespace AircraftManagementTest
{
    public class AircraftRepositoryTest
    {
        private readonly IAircraftRepository _aircraftRepository;

        public AircraftRepositoryTest()
        {
            _aircraftRepository = new AircraftRepository();
        }

        [Fact]
        public void Gets_TotalAircraftsCount_ShouldReturnValidCountNumber()
        {
            // act
            var count = _aircraftRepository.Gets().Count;

            // assert
            count.Should().Equals(4);
        }

        [Fact]
        public void Get_NonExistingId_ShouldReturnNull()
        {
            // act
            var aircraft = _aircraftRepository.Get(5);

            // assert
            Assert.False(aircraft != null);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        public void Get_VariousIds_ShouldReturnValidData(int id)
        {
            // act
            var aircraft = _aircraftRepository.Get(id);

            // assert
            Assert.True(aircraft != null);
        }

        [Theory]
        [InlineData("A380")]
        [InlineData("747")]
        public void GetAircraft_ExistingAircraft_ReturnAValidAircraft(string model)
        {
            // act
            var aircraft = _aircraftRepository.GetAircraft(model);

            Assert.True(aircraft != null);
        }

        [Theory]
        [InlineData("Su-24")]
        [InlineData("F22")]
        public void GetAircraft_NonExistingAircraft_ReturnNull(string model)
        {
            // act
            var aircraft = _aircraftRepository.GetAircraft(model);

            Assert.True(aircraft == null);
        }

        [Fact]
        public void Create_NewAircraft_ShouldAddToTheExistingList()
        {
            // act
            var aircraft = new Aircraft
            {
                Id = 5,
                Manufacturer = "Lockheed Martin",
                Model = "F16 Fighting Falcon",
                RoleId = 4
            };

            _aircraftRepository.Create(aircraft);


            Assert.Equal(5, _aircraftRepository.Gets().Count);
            Assert.True(_aircraftRepository.Get(5) != null);
        }

        [Fact]
        public void Update_ExistingAircraft_ShouldUpdateTheExistingList()
        {
            var aircraft = new Aircraft
            {
                Id = 3,
                Manufacturer = "Lockheed Martin",
                Model = "F16 Fighting Falcon",
                RoleId = 4
            };

            _aircraftRepository.Update(3, aircraft);

            Assert.True(_aircraftRepository.Get(3).Model == "F16 Fighting Falcon");
        }

        [Theory]
        [InlineData(3)]
        [InlineData(2)]
        public void Update_ExistingAircraft_ShouldThrowArgumentException(int id)
        {
            //act
            var aircraft = new Aircraft
            {
                Id = 1,
                Manufacturer = "Lockheed Martin",
                Model = "F16 Fighting Falcon",
                RoleId = 4
            };

            Action action = () => _aircraftRepository.Update(id, aircraft);

            //assert
            ArgumentException exception = Assert.Throws<ArgumentException>(action);

            Assert.Equal("Invalid Id", exception.Message);
        }

        [Fact]
        public void Delete_ExistingAircraft_ShouldRemoveItFromTheExistingList()
        {
            //act
            _aircraftRepository.Delete(1);

            //assert
            Assert.True(_aircraftRepository.Get(1) == null);
        }
    }
}
