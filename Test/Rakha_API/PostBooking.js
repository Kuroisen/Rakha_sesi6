const assert = require('assert');
const { time } = require('console');
const { json } = require('stream/consumers');
const Ajv = require("ajv")
const ajv = new Ajv()
const schema =
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "job": {
        "type": "string"
      },
      "id": {
        "type": "string"
      },
      "createdAt": {
        "type": "string"
      }
    },
    "required": [
      "name",
      "job",
      "id",
      "createdAt"
    ]
  }
describe('2. API Create User', function(){
    it('Success Create User With Code 201', async function () {
        this.timeout(50000)
        const url = 'https://reqres.in/api/users'
        const DataCreate = {
             "name": "Rakha",
             "job": "Project Documentor"
        }
        const response = await fetch(url, {
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(DataCreate) 
        });
        const dataResponse = await response.json()
        const validate = ajv.compile(schema)
        const valid = validate(dataResponse)
        if (!valid){
            console.log(validate.error);
        }
        assert.ok(valid, "response JSON must same with schema")
        assert.strictEqual(response.status,201);
        
        console.log("Response Result : "+JSON.stringify(dataResponse,null,1))
        console.log("Response Result : "+JSON.stringify(dataResponse.id,null,1))
    })
})