'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;

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


// =================================================================================
// App Logic
// =================================================================================

const handlers = {

	'LAUNCH': function() {
        app.tell('Welcome to Emerald. Start by opening a project you created in our webapp');

    },    

    //'TestState' : {

    	/*'EndTestIntent' : function() {

    	},*/

    	'StartTestIntent' : function() {
    		app.tell("This has been mapped to the StartTestIntent");
    	},

    	'WizardIntent' : function(command) {
    		app.tell("This is the famous wizard of Oz and he helps you to " + command);
    	},

   // },

/*
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

    },

    'Unhandled' : function() {

    },

    'END' : function() {

    } */

};
