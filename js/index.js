var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
        app.register();
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
    register: function() {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
            app.myLog.value+=JSON.stringify(['registerDevice status: ', status])+"\n";
            app.storeToken(status.deviceToken);
        });
    },
    myLog: document.getElementById("log"),
    storeToken: function(token) {
        console.log("Token is " + token);
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("POST","http://127.0.0.1:8888",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("token="+token+"&message=pushnotificationtester");
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4) {
                //a response now exists in the responseTest property.
                console.log("Registration response: " + xmlhttp.responseText);
                app.myLog.value+="Registration server returned: " + xmlhttp.responseText;
            }
        }
    }
};
