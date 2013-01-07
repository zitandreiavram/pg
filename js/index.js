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
    	app.myLog.value+="Device ready \n";
    	app.register();
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
    register: function() {
    	app.myLog.value+="Register \n";
        var pushNotification = window.plugins.pushNotification;
        app.myLog.value+=JSON.stringify(['obj: ', pushNotification])+"\n";
        app.myLog.value+="Register 2 \n";
        pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
            app.myLog.value+=JSON.stringify(['registerDevice status: ', status])+"\n";
            app.storeToken(status.deviceToken);
        });
        app.myLog.value+="Register 3 \n";
    },
    myLog: document.getElementById("log"),
    storeToken: function(token) {
    	app.myLog.value+="Token is " + token + "\n";
        console.log("Token is " + token);
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("POST","http://127.0.0.1:8888",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("token="+token+"&message=pushnotificationtester");
        app.myLog.value+="Token 2 \n";
        xmlhttp.onreadystatechange=function() {
        	app.myLog.value+="Token 3 \n";
            if (xmlhttp.readyState==4) {
                //a response now exists in the responseTest property.
                console.log("Registration response: " + xmlhttp.responseText);
                app.myLog.value+="Registration server returned: " + xmlhttp.responseText;
            }
        }
        app.myLog.value+="Token 4 \n";
    }
};
