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

function errorReport() {
    console.log("into errorReport");
    agent.setFollowupEvent('actionfailure');
    //agent.add("Sorry, due to technical issues/errors I was unable to complete your request. For further assistance, please contact the help desk at 1-800-258-2736 during our normal business hours of Monday - Friday: 8:00 A.M. - 5:00 P.M. ET.");
}

module.exports = { postAPICall: postAPICall, getAPICall: getAPICall, utilfunctionTest: utilfunctionTest, errorReport: errorReport };