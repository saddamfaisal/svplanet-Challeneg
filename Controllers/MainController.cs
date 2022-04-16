using System;
using System.Collections;
using System.Collections.Generic;
using Amazon.DynamoDBv2;
using Microsoft.AspNetCore.Mvc;
using Project.Data;
using Project.Models;
using System.Linq;
using System.Threading.Tasks;



namespace Project.Controllers
{
    [Route("api/")]

    public class MainController : ControllerBase
    {
        
        private IAmazonDynamoDB dynamoDBClient;
        public MainController(IAmazonDynamoDB dynamoDBClient)
        {
            
            this.dynamoDBClient = dynamoDBClient;
        }

        
        [HttpGet("plants")]
        public async Task<ActionResult<Plant>> GetPlants()
        {
            DynamoDBServices service = new DynamoDBServices(dynamoDBClient);
            var val = await service.GetPlantsAsync();
            return Ok(val);
        }

        
        [HttpPost("plant/{id}")]
        public async Task<ActionResult> UpdateStatus(string name)
        {
            DynamoDBServices watering = new DynamoDBServices(dynamoDBClient);
         
            Plant newPlant = await watering.UpdatePlantStatus(name);
            return Ok(newPlant);
        }

    }

}