//Inisiasi variabel
const assert = require('assert');
const { time } = require('console');
const { json } = require('stream/consumers');

//Inisiasi variabel modul ajv
const Ajv = require("ajv")
const ajv = new Ajv()

//Inisiasi variabel untuk schema validation
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
  
//menjalankan API untuk membuat user
describe('2. API Create User', function(){
    it('Success Create User With Code 201', async function () {
        this.timeout(50000)
        const url = 'https://reqres.in/api/users'

        //Body untuk pembuatan data
        const DataCreate = {
             "name": "Rakha",
             "job": "Project Documentor"
        }
        //Header dan post yang digunakan
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