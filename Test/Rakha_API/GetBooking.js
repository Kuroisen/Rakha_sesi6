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
      "data": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number"
          },
          "email": {
            "type": "string"
          },
          "first_name": {
            "type": "string"
          },
          "last_name": {
            "type": "string"
          },
          "avatar": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        ]
      },
      "support": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "text": {
            "type": "string"
          }
        },
        "required": [
          "url",
          "text"
        ]
      }
    },
    "required": [
      "data",
      "support"
    ]
}
describe('1. API GetList User', function(){
    it('Success Get Data id', async function () {
        this.timeout(5000)
        const response = await fetch('https://reqres.in/api/users?id=7');
        const dataResponse = await response.json()
        const validate = ajv.compile(schema)
        const valid = validate(dataResponse)
        if (!valid){
            console.log(validate.error);
        }
        assert.ok(valid, "response JSON must same with schema")
    })
    
    it('Success With code 200', async function () {

        const response = await fetch('https://reqres.in/api/users?id=7');
        const dataResponse = await response.json()
        
        console.log(`Response API : ${JSON.stringify(dataResponse, null, 1)}`);
        
        assert.strictEqual(response.status,200);
        assert.strictEqual(dataResponse.data.first_name,"Michael");
    })

    it('List User is not found with code 404', async function(){
        const response = await fetch('https://reqres.in/api/users?id=100000');
        assert.strictEqual(response.status,404);
    })
})