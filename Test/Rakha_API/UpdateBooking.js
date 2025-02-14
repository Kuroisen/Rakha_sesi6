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
      "updatedAt": {
        "type": "string"
      }
    },
    "required": [
      "name",
      "job",
      "updatedAt"
    ]
  }
describe('3. API Update User', function(){
    it('Success Update User With Code 201', async function () {
        this.timeout(50000)
        const url = 'https://reqres.in/api/users/639'
        const DataUpdate = {
             "name": "Rakha",
             "job": "SQA"
        }
        const response = await fetch(url, {
            method : "PUT",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(DataUpdate) 
        });
        const dataResponse = await response.json()
        const validate = ajv.compile(schema)
        const valid = validate(dataResponse)
        if (!valid){
            console.log(validate.error);
        }
        assert.ok(valid, "response JSON must same with schema")
        assert.strictEqual(response.status,200);
        
        console.log("Response Result : "+JSON.stringify(dataResponse,null,1))
    })
})