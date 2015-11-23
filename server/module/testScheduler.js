var sayHello = function(){
    var hello = "hello server";
    console.log(hello);
    return hello;
    //I want to update my calendar
    //do I have to set up a route to the client-side to access that calendar?
    //do an ajax call to some route that gets caught by my app.js ?
    //http.get('/scheduleUpdate')
};

//sayHello();
module.exports = sayHello;