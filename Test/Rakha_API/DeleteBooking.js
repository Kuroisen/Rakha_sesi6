const assert = require('assert');
const { time } = require('console');
const { json } = require('stream/consumers');
describe('4. API Delete User', function(){
    it('Success Update User With Code 201', async function () {
        this.timeout(50000)
        const url = 'https://reqres.in/api/users/639'
        const response = await fetch(url, {
            method : "DELETE",
            headers :{
                "Content-Type" : "application/json"
            }
        });
        assert.strictEqual(response.status,204);
    })
})