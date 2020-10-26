async function postAPICall(data, apiCallDetails) {
    return new Promise(function (resolve, reject) {
        fetch(
            reqURL + apiCallDetails.url,
            {
                headers: headers,
                agent: sslConfiguredAgent,
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => {
                console.log('Processing Request:' + apiCallDetails.call);
                console.log(response.statusCode);
                if (apiCallDetails.call == "findAccount") {
                    resolve(data.userAccount);
                }
                else {
                    resolve(data);
                }
            })
            .catch(err => {
                console.log(err);
                resolve("error")
            })
    });
};

// get API call function
async function getAPICall(apiCallDetails) {
    return new Promise(function (resolve, reject) {
        console.log("Starting getAPICall function");
        fetch(
            reqURL + apiCallDetails.url,
            {
                headers: headers,
                agent: sslConfiguredAgent,
                method: apiCallDetails.method
            })
            .then(response => response.json())
            .then(data => {
                console.log('Processing Request:' + apiCallDetails.call);
                console.log(response.statusCode);
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                resolve("error");
            })
    });
}

function utilfunctionTest (apiCallDetails) {
    return "from utilfunctionTest " + apiCallDetails;
}

module.exports = { postAPICall: postAPICall, getAPICall: getAPICall, utilfunctionTest: utilfunctionTest };