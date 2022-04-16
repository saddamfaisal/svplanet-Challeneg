using System.Threading.Tasks;
using System.Collections.Generic;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.DataModel;
using Project.Models;

namespace Project.Data
{
    public class DynamoDBServices
    {
        IAmazonDynamoDB dynamoDBClient { get; set; }

        public DynamoDBServices(IAmazonDynamoDB dynamoDBClient)
        {
            this.dynamoDBClient = dynamoDBClient;



        }



      public async Task<Plant> UpdatePlantStatus(string pl)
        {
            DynamoDBContext context = new DynamoDBContext(dynamoDBClient);
            Plant plt = await context.LoadAsync<Plant>(pl, default(System.Threading.CancellationToken));
            plt.Status = System.DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss:tt");
            await context.SaveAsync(plt, default(System.Threading.CancellationToken));
            return plt;
        }

        
        public async Task<List<Plant>> GetPlantsAsync()
        {
            ScanFilter scanFilter = new ScanFilter();
            scanFilter.AddCondition("Id", ScanOperator.NotEqual, 0);

            ScanOperationConfig soc = new ScanOperationConfig()
            {
                Filter = scanFilter
            };
            DynamoDBContext context = new DynamoDBContext(dynamoDBClient);
            AsyncSearch<Plant> search = context.FromScanAsync<Plant>(soc, null);
            List<Plant> documentList = new List<Plant>();
            do
            {
                documentList = await search.GetNextSetAsync(default(System.Threading.CancellationToken));
            } while (!search.IsDone);

            return documentList;
        }

        
        
       
    }
}
