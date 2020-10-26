
const { postAPICall } = require("./utils/util");

async function findAccount(agent) {
    console.log("Finding account.");

    let contactContext = agent.getContext('contact_info').parameters;
    const email = contactContext.Email;;
    const userid = contactContext.UserID;
    userSession.AssistanceType = contactContext.AssistanceType;

    if (contactContext.AssistanceType == null || contactContext.AssistanceType == '') {
        agent.setFollowupEvent('start_over');
    }
    else {
        if (email !== null && email !== '' && userid !== null && userid !== '') {
            var findAccountData = JSON.stringify({
                userId: userid,
                emailAddressText: email
            });

            var apiCallDetails = {
                call: 'findAccount',
                url: 'findAccount'
            };
            console.log("Calling find account API");
            var results = await postAPICall(findAccountData, apiCallDetails);
            console.log(results);

            if (results == null) {
                agent.setFollowupEvent('no_user_account');  //calls intent 9yy
            } else if (results == "error") {
                console.log("API call error");
                agent.setFollowupEvent('actionfailure');  //calls intent 9y
            }
            else {
                userSession.userData = results;
                console.log("Returned from find account API");
                agent.setFollowupEvent(`launch_checkAccountStatus`); //calls 3a Check account status
            }
        };
    }
}

// checks the status of the account
async function checkAccountStatus(agent) {
    var accountStatus = userSession.userData.accountStatus;
    userSession.userAccountId = userSession.userData.userAccountId;

    if (accountStatus == "ACTIVE") {
        if (userSession.userData.selfServiceAllowedIndicator == true) {
            if (userSession.AssistanceType == "unlocking your account" && userSession.userData.accountLockedIndicator == false) {
                agent.setFollowupEvent('false_unlock'); // calls intent 9xx
            } else if (userSession.AssistanceType == "resetting your password" && userSession.userData.passwordResetAllowedIndicator == false) {
                agent.setFollowupEvent('password_reset_not_allowed'); // calls intent 9xy
            }
            else {
                await getSecurityQuestions();
            }
        } else {
            agent.setFollowupEvent('self_service_not_allowed'); // calls intent 9zx
        }
    }
    else if (accountStatus == "INACTIVE") {
        agent.setFollowupEvent('inactive_account');
    }
    else if (accountStatus == "PENDING_APPROVAL") {
        agent.setFollowupEvent('pending_account');
    }
    else {
        agent.add("Sorry, I am currently unable to complete your request.  Please try again or for further assistance, please contact the help desk at 1-800-258-2736 during our normal business hours of Monday - Friday: 8:00 A.M. - 5:00 P.M. ET.");
    }
}


module.exports = { findAccount: findAccount, checkAccountStatus: checkAccountStatus};