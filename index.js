'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
//app.user().data.state = null;

app.setConfig({
    requestLogging: true,
    // other configurations
});


// Listen for post requests
webhook.listen(3000, function() {
    console.log('Local development server listening on port 3000.');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});

var io = require('socket.io-client');
var socket = io('http://localhost:8000');


// =================================================================================
// App Logic
// =================================================================================

const handlers = {

	'LAUNCH': function() {
        app.tell('Welcome to Emerald. Start by opening a project you created in our webapp');
    },

    'NEW_SESSION': function() {
    	if(app.user().data.state != null) {
    		app.toStateIntent(app.user().data.state, app.getIntentName());
    	} else {
    		app.toIntent(app.getIntentName());
    	}
 	},

	'StartTestIntent' : function() {
		app.user().data.state = 'TestState';
		app.followUpState('TestState').tell("The test has been started.");
	},    

    'TestState' : {

    	'EndTestIntent' : function() {
			app.user().data.state = null;
			app.tell("The test has been ended.");
    	},

    	'WizardIntent' : function(command) {
    		socket.emit('wizard message', command);
            app.tell("This is the famous wizard of Oz and he helps you to " + command);
    	},

    	'Unhandled' : function() {
    		app.tell("This command is not allowed in test mode.");
    	}

    },


    'ProjectState' : {
        
        'CloseProjectIntent' : function() {
           // do something
        },

        'ConnectionIntent' : function() {
        	app.tell('The connection is stable and the wizard is logged in.');
        },

        'SwitchProjectIntent' : function() {

        },

        'StartTestIntent' : function() {

        },
    },

    'LoadProjectIntent' : function(project) {
    	
    },

    'ListProjectsIntent' : function() {
    	let speech = app.speechBuilder()
                .addText('Your current projects are:')
                .addBreak('300ms')
               	.addText('Hello World')
                .addBreak('200ms')
            	.addText('Learning Typography')
                .addBreak('200ms')
		app.tell(speech);
    },

    'Unhandled' : function() {

    },

    'END' : function() {

    }

};



