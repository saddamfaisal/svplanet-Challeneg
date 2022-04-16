using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Models
{

    [DynamoDBTable("Plant")]
    public class Plant
    {
        [DynamoDBHashKey]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string ImageSource { get; set; }

    }
}
