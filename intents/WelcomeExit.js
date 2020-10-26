
function welcome(agent) {
    agent.add('Hi, I am assistant. I can help you in various service. How can I help you today?');
}


function defaultFallback(agent) {
    agent.add('Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me.');
}
module.exports = { welcome: welcome, defaultFallback: defaultFallback };