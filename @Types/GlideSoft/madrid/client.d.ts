//SCOPED GlideSoft Definition File. In combination with JSConfig.json I provide you intellisense for ServiceNow APIs.


/**
 * The GlideAjax class enables a client script to call server-side code in a script include. To use GlideAjax in a client script, follow these general steps. * * Create a GlideAjax instance by calling the GlideAjax constructor. As the argument to the constructor, specify the name of the script include class that contains the method you want to call. Call the addParam method with the sysparm_name parameter and the name of the script-include method you want to call. (Optional) Call the addParam method one or more times to provide the script-include code with other parameters it needs. Execute the server-side code by calling getXML(). Note: getXML() is the preferred method for executing the code, because it is asynchronous and does not hold up the execution of other client code. Another method, getXMLWait(), is also available but is not recommended. Using getXMLWait() ensures the order of execution, but can cause the application to seem unresponsive, significantly degrading the user experience of any application that uses it. getXMLWait() is not available to scoped applications. * * 
 * 
 * 
 */
declare class GlideAjax {



    /**
     * Constructor for GlideAjax.
     * 
     * @class_name The name of the server-side class that contains the method you want to execute.
     */
    constructor(class_name: String);

    /**
     * Specifies a parameter name and value to be passed to the server-side function associated with this GlideAjax object.You can execute addParam multiple times with different parameters and values. Note: The first call to addParam should be with the parameter sysparm_name and the name of the server-side method you want to call. The server-side code does not execute until the client script calls getXML().
     * 
     * @parm_name The name of the parameter to pass. (The name must begin with the sysparm_ .)
     * @parm_value The value to assign to parm_name.
     */
    addParam(parm_name: String, parm_value: String);

    /**
     * Retrieves the results from a server-side method called from the client via getXMLWait().
     * 
     */
    getAnswer();

    /**
     * Sends the server a request to execute the method and parameters associated with this GlideAjax object.The server processes the request asynchronously and -- when ready -- returns the results via the function specified as the callback_function.
     * 
     * @callback The name of the callback function to process the results returned by the server.
     * @example
     * var comments = gel("dialog_comments").value;
     * var ga = new GlideAjax('validateComments'); //Call script include to escape text
     * ga.addParam('sysparm_name', 'validateComments');
     * ga.addParam('sysparm_comments', comments);
     * ga.getXML(callback);
     *  
     * return false;
     *  
     * function callback(response) {
     *   var comments = response.responseXML.documentElement.getAttribute("answer");
     *   comments = trim(comments);
     *   if (comments == "") {
     *      //If comments are empty, alert the user and stop submission
     *      alert("Please enter your comments before submitting.");
     *   } else {
     *     //If there are comments, close the dialog window and submit them
     *     GlideDialogWindow.get().destroy(); //Close the dialog window
     *     g_form.setValue("comments", comments); //Set the "Comments" field with comments in the dialog
     *   }
     */
    getXML(callback: Function);

    /**
     * Call the processor asynchronously and get the answer element of the response in XML format.
     * 
     * @callback The callback function. The function receives the answer element of the response in XML format as an argument.
     * @example
     * function updateAttachmentCount(sysid) {
     *     var ga = new GlideAjax('AttachmentAjax');
     *     ga.addParam('sysparm_type', 'attachmentCount');
     *     ga.addParam('sysparm_value', sysid);
     *     ga.getXMLAnswer(numberOfAttachments, null, sysid); // callback: numberOfAttachments
     * }
     * 
     * function numberOfAttachments(answer, sysid) {
     * 	// we want to know there are 5 attachments, not 5.0 attachments
     * 	var number = parseInt(answer);
     * 	var buttons = $$('.attachmentNumber_' + sysid);
     * 	if (buttons[0] == undefined)
     * 		$('header_attachment_list_label').down().innerHTML = number;
     * 	else {
     * 		for (var i = 0; i &lt; buttons.length; i++) {
     * 			buttons[i].innerHTML = number;
     * 		}
     * 	}
     * }
     */
    getXMLAnswer(callback: Function);

    /**
     * Sends the server a request to execute the method and parameters associated with this GlideAjax object.The server processes the request synchronously and will not process further requests from the client until finished. To retrieve the results, the client must call getAnswer(). Using getXMLWait() ensures the order of execution, but can cause the application to seem unresponsive, significantly degrading the user experience of any application that uses it. We recommend using getXML() instead. Note: getXMLWait() is not available to scoped applications.
     * 
     * @example
     * var ga = new GlideAjax('HelloWorld');
     *       ga.addParam('sysparm_name','helloWorld');
     *       ga.addParam('sysparm_user_name',"Bob");
     *       ga.getXMLWait();
     *       alert(ga.getAnswer());
     */
    getXMLWait();

}

/**
 * The GlideAjaxV3 API provides the ability to asynchronously execute server-side scripts from a client-side script. The GlideAjaxV3 API can be used in client-side scripts using ListV2 and ListV3 APIs.
 * 
 * 
 */
declare class GlideAjaxV3 {



    /**
     * Creates an instance of the GlideAjaxV3 class.
     * 
     * @processor The name of the processor (server-side script) to call.
     * @targetURL (Optional) Override the xmlhttp processor url. If this parameter is not specified, the default is xmlhttp.do.
     */
    constructor(processor: String, targetURL: String);

    /**
     * Creates an instance of the GlideAjaxV3 class.
     * 
     * @processor The name of the processor (server-side script) to call.
     */
    constructor(processor: String);

    /**
     * Set a name-value pair to be sent to the processor.
     * 
     * @name The name of the parameter. This usually has the prefix 'sysparm_'.
     * @value The parameter value.
     */
    addParam(name: String, value: String);

    /**
     * Call the processor asynchronously and get the answer element of the response in JSON format.
     * 
     * @callback The callback function. The function receives the answer element of the response as a JSON object.
     */
    getJSON(callback: Function);

    /**
     * Returns the value of the specified parameter.
     * 
     * @name The name of the parameter to return.
     * @returns The specified parameter's value.
     */
    getParam(name: String): String;

    /**
     * Returns the name-value pairs for the request.
     * 
     * @returns The request's name-value pairs.
     */
    getParams(): Object;

    /**
     * Returns the server-side script that the request is going to use.This returns the 'sysparm_processor' parameter.
     * 
     * @returns The value of the request's sysparm_processor parameter.
     */
    getProcessor(): String;

    /**
     * Returns the target URL.
     * 
     * @returns The URL where the Ajax request will be sent.
     */
    getURL(): String;

    /**
     * Call the processor asynchronously and get the response in XML format.
     * 
     * @callback The callback function. The function receives the response as an argument.
     */
    getXML(callback: Function);

    /**
     * Call the processor asynchronously and get the answer element of the response in XML format.
     * 
     * @callback The callback function. The function receives the answer element of the response in XML format as an argument.
     * @example
     * function autofillPhoneNumber(sysid) {
     *     var ga = new GlideAjax('x_abc_myscope.AjaxUtils');
     *     ga.addParam('sysparm_type', 'getPhoneNumberForUser');
     *     ga.addParam('sysparm_user', sysid);
     *     ga.getXMLAnswer(function(answer) {
     *         g_form.setValue('phone_number', answer);
     *     });
     * }
     */
    getXMLAnswer(callback: Function);

    /**
     * Sets a callback function to be called if the Ajax request fails.
     * 
     * @callback The function to be called if the Ajax request fails. The callback function has one parameter, the XMLHttpRequest object.
     */
    setErrorCallback(callback: Function);

    /**
     * Sets the request's server-side script. The server-side script is also called the processor.This sets the 'sysparm_processor' parameter.
     * 
     * @serverScript The server-side script (processor) to receive the request.
     */
    setProcessor(serverScript: String);

}

/**
 * The GlideDialogWindow API provides methods for displaying a dialog in the current window and frame. Use these methods in scripts anywhere that you can use a client-side JavaScript. These methods are most often called from a UI action with the Client check box selected. * * Note: GlideDialogWindow does not function with List v3. Either use List v2 or the GlideModalV3 API.
 * 
 * 
 */
declare class GlideDialogWindow {



    /**
     * Provides methods for displaying a dialog in the current window and frame.Use these methods in scripts anywhere that you can use a client-side JavaScript. These methods are most often called from a UI Action with the Client check box selected.
     * 
     * @id Name of the UI page to load into the dialog window.
     * @readOnly Optional. Flag that indicates whether the dialog window is read only (true) or read/write (false). Default: false
     * @width Optional. Size (in pixels) to set the width of the dialog window.
     * @height Optional. Size (in pixels) to set the height of the dialog window.
     * @example
     * // Creates a dialog window
     * var gdw = new GlideDialogWindow('show_list');
     * 
     * // Creates a read-only dialog window
     * var gdw = new GlideDialogWindow('show_list', true);
     * 
     * // Creates a dialog window that is 400 pixels wide
     * var gdw = new GlideDialogWindow('show_list', false, 400); 
     * 
     * // Creates a dialog window that is 400 pixels wide and 200 pixels tall
     * var gdw = new GlideDialogWindow('show_list', false, 400, 200); 
     */
    constructor(id: String, readOnly: Boolean, width: Number, height: Number);

    /**
     * Adjusts the body height of a dialog window to be the window height minus the header height.You typically call this method after calling GlideDialogWindow - setSize().
     * 
     * @example
     * var gdw = new GlideDialogWindow('show_list');
     *       gdw.setTitle('Test');
     *       gdw.setSize(750,300);
     *       gdw.adjustBodySize();
     *       gdw.render();
     */
    adjustBodySize();

    /**
     * Closes the dialog window.
     * 
     * @example
     * //Destroy the current dialog window.
     *       GlideDialogWindow.get().destroy();
     */
    destroy();

    /**
     * Renders the dialog window.
     * 
     * @example
     * var gdw = new GlideDialogWindow('show_list');
     *       gdw.setTitle('Test');
     *       gdw.setSize(750,300);
     *       gdw.setPreference('table', 'u_test_list');
     *       gdw.setPreference('title', 'A New Title');
     *       gdw.render();
     */
    render();

    /**
     * Sets a given window property to a specified value.Any window property can be set using this method.
     * 
     * @name The window property to set.
     * @value The value for the window property.
     * @example
     * var gdw = new GlideDialogWindow('show_list');
     *       gdw.setTitle('Test');
     *       gdw.setSize(750,300);
     *       gdw.setPreference('table', 'u_test_list');
     *       gdw.setPreference('title', 'A New Title');
     */
    setPreference(name: String, value: String);

    /**
     * Sets the size of the dialog window.If you do not pass width and height parameters, a default size is used.
     * 
     * @width The width of the dialog window.
     * @height The height of the dialog window.
     * @example
     * var gdw = new GlideDialogWindow('show_list');
     *       gdw.setSize(750,300);
     */
    setSize(width: Number, height: Number);

    /**
     * Sets the title of the dialog window.
     * 
     * @title The title for the current window.
     * @example
     * //var gdw = new GlideDialogWindow('show_list');
     *       gdw.setTitle('test');
     */
    setTitle(title: String);

}

/**
 * The GlideDocument class provides the ability to search a DOM element, a document, or a JQuery element. The GlideDocumentV3 API can be used in client-side scripts using ListV2 and ListV3 APIs. The GlideDocument APIs are accessed using the g_document global object.
 * 
 * 
 */
declare class GlideDocumentV3 {



    /**
     * Returns a node found in the specified DOM based context or created from the HTML context.
     * 
     * @selector The selector expression
     * @context (Optional) A DOM Element, document, or JQuery object to be searched.
     * @returns The node that matches the selector.
     */
    getElement(selector: StringorObject, context: StringorObject): node;

    /**
     * Returns a node list found in the specified DOM based context or created if an HTML context is specified.
     * 
     * @selector The selector expression
     * @context (Optional) A DOM Element, document, or JQuery object to be searched.
     * @returns A list of nodes that matches the selector.
     */
    getElements(selector: StringorObject, context: StringorObject): nodelist;

}

/**
 * Use the GlideFlow JavaScript API for client-side interactions with actions, flows, and subflows. Use the GlideFlow API anywhere in the platform that accepts client scripts. The action, flow, or subflow must be set as client callable, and have a valid ACL using the Manage Security feature in Flow designer. * * Some of the methods within GlideFlow return promise objects. A promise represents the eventual result of an asynchronous operation. For more information on promises, see Promise - Javascript MDN or AngularJS documentation. * * Using this API, you can: Start actions, flows, or subflows via a script. Get an existing execution. Get the status and any available outputs. Wait for the completion of an action, flow, or subflow. * * There is no constructor for the GlideFlow class. Access GlideFlow methods using the GlideFlow global object.
 * 
 * 
 */
declare class GlideFlow {



    /**
     * Get an existing execution instance by ID.
     * 
     * @executionId The ID of the execution to be retrieved.
     * @example
     * 
     * // Get an existing action and await completion
     * (function() {
     * 	GlideFlow.getExecution('79cd437e0b202300a150a95e93673ae3')
     * 		.then(function(execution) {
     * 			return execution.awaitCompletion();
     * 		}, errorResolver)
     * 		.then(function(completion) {
     * 
     * 			var status = completion.status;
     * 			console.log(status);
     * 
     * 			// Available Outputs:
     * 			var outputs = completion.outputs;
     * 			console.log(outputs);
     * 		}, errorResolver());
     * 
     * 	function errorResolver(error) {
     * 		// Handle errors in error resolver
     * 		console.error(error);
     * 	}
     * })();
     * @returns A promise of an execution object.
     */
    getExecution(executionId: String): Object;

    /**
     * Start an action.
     * 
     * @scopedName The scoped name of the flow to be executed.
     * @inputs An object containing inputs defined for the action.
     * @example
     * 
     * // Start an action and await completion.
     * (function() {
     * 	var inputs = {};
     * 
     * 	inputs['input1'] = 'string input'; // String
     * 
     * 	GlideFlow.startAction('global.action_name', inputs)
     * 		.then(function(execution) {
     * 			return execution.awaitCompletion();
     * 		}, errorResolver)
     * 		.then(function(completion) {
     * 			var status = completion.status;
     * 			console.log(status);
     * 
     * 			// Available Outputs:
     * 			var outputs = completion.outputs;
     * 			console.log(outputs);
     * 		}, errorResolver());
     * 
     * 	function errorResolver(error) {
     * 		// Handle errors in error resolver
     * 		console.error(error);
     * 	}
     * })();
     * @returns An object containing details on the action execution.
     */
    startAction(scopedName: String, inputs: Object): Object;

    /**
     * Start a flow.
     * 
     * @scopedName The scoped name of the flow to be executed.
     * @inputs An object containing inputs defined for the flow.
     * @example
     * 
     * // Start a Flow
     * (function() {
     *       var inputs = {};
     *       inputs['current'] = { // GlideRecord 
     *         table : 'incident', 
     *         sys_id : '79cd437e0b202300a150a95e93673ae3'  
     *     };
     *         inputs['table_name'] = 'incident';
     *          GlideFlow.startFlow('global.flow_name', inputs)
     * 		.then(
     * 			function(execution) {
     * 				console.log('Started flow_name with execution id :' + execution.getExecutionId());
     * 			},
     * 			function(error) {
     * 				console.log('Unable to start flow: ' + error);
     * 			}
     * 		);
     * })();
     * @returns An object containing details on the flow execution.
     */
    startFlow(scopedName: String, inputs: Object): Object;

    /**
     * Start a subflow.
     * 
     * @scopedName The scoped name of the flow to be executed.
     * @inputs An object containing inputs used for the subflow.
     * @example
     * 
     * // Start an action and await completion.
     * (function() {
     * 	var inputs = {};
     * 
     * 	inputs['input1'] = 'string input'; // String
     * 
     * 	GlideFlow.startSubflow('global.subflow_name', inputs)
     * 		.then(function(execution) {
     * 			return execution.awaitCompletion();
     * 		}, errorResolver)
     * 		.then(function(completion) {
     * 			var status = completion.status;
     * 			console.log(status);
     * 
     * 			// Available Outputs:
     * 			var outputs = completion.outputs;
     * 			console.log(outputs);
     * 		}, errorResolver());
     * 
     * 	function errorResolver(error) {
     * 		// Handle errors in error resolver
     * 		console.error(error);
     * 	}
     * })();
     * @returns An object containing details on the subflow execution.
     */
    startSubflow(scopedName: String, inputs: Object): Object;

}

/**
 * The GlideForm API provides methods to customize forms. GlideForm.js is the JavaScript class containing the methods. The global object g_form is used to access GlideForm methods. GlideForm methods are only used on the client. These methods are used to make custom changes to the form view of records. All validation of examples was done using Client Scripts. * * Some of these methods can also be used in other client scripts (such as Catalog Client Scripts or Wizard Client Scripts), but must first be tested to determine whether they will work as expected. * * Note: The methods getControl(), getHelpTextControl(), getElement(), and getFormElement() are deprecated for mobile devices. For information on using GlideForm for mobile, see Mobile Client GlideForm (g_form) Scripting and Migration . * * There is no constructor for the GlideForm class. Access GlideForm methods using the g_form global object.
 * 
 * 
 */
declare class GlideForm {



    /**
     * Adds an icon on a field’s label.Adding the same item twice is prevented; however, you can add the same icon with a different title. Note: This method is not supported by Service Catalog.
     * 
     * @fieldName The field name.
     * @icon The font icon to show next to the field. Supported icons - icon-user, icon-user-group, icon-lightbulb, icon-home, icon-mobile, icon-comment, icon-mail, icon-locked, icon-database, icon-book, icon-drawer, icon-folder, icon-catalog, icon-tab, icon-cards, icon-tree-right, icon-tree, icon-book-open, icon-paperclip, icon-edit, icon-trash, icon-image, icon-search, icon-power, icon-cog, icon-star, icon-star-empty, icon-new-ticket, icon-dashboard, icon-cart-full, icon-view, icon-label, icon-filter, icon-calendar, icon-script, icon-add, icon-delete, icon-help, icon-info, icon-check-circle, icon-alert, icon-sort-ascending, icon-console, icon-list, icon-form, and icon-livefeed.
     * @title The text title for the icon.
     * @example
     * g_form.addDecoration('caller_id', 'icon-star', 'preferred member');
     */
    addDecoration(fieldName: String, icon: String, title: String);

    /**
     * Adds an icon on a field’s label.Adding the same item twice is prevented; however, you can add the same icon with a different title. Note: This method is not supported by Service Catalog.
     * 
     * @fieldName The field name.
     * @icon The font icon to show next to the field. Supported icons - icon-user, icon-user-group, icon-lightbulb, icon-home, icon-mobile, icon-comment, icon-mail, icon-locked, icon-database, icon-book, icon-drawer, icon-folder, icon-catalog, icon-tab, icon-cards, icon-tree-right, icon-tree, icon-book-open, icon-paperclip, icon-edit, icon-trash, icon-image, icon-search, icon-power, icon-cog, icon-star, icon-star-empty, icon-new-ticket, icon-dashboard, icon-cart-full, icon-view, icon-label, icon-filter, icon-calendar, icon-script, icon-add, icon-delete, icon-help, icon-info, icon-check-circle, icon-alert, icon-sort-ascending, icon-console, icon-list, icon-form, and icon-livefeed.
     * @title The text title for the icon.
     * @color A CSS color.
     * @example
     * g_form.addDecoration('caller_id', 'icon-star', 'Mark as Favorite', 'color-green');
     */
    addDecoration(fieldName: String, icon: String, title: String, color: String);

    /**
     * Displays the error message at the top of the form.
     * 
     * @message The message to display.
     * @example
     * g_form.addErrorMessage('This is an error');
     */
    addErrorMessage(message: String);

    /**
     * Adds an informational message to the top of the form.
     * 
     * @message The message to display.
     * @example
     * g_form.addInfoMessage('The top five fields in this form are mandatory');
     */
    addInfoMessage(message: String);

    /**
     * Adds a choice to the end of a choice list field.
     * 
     * @fieldName The name of the field.
     * @choiceValue The value to be stored in the database.
     * @choiceLabel The value displayed.
     * @example
     * g_form.addOption('priority', '6', '6 - Really Low');
     */
    addOption(fieldName: String, choiceValue: String, choiceLabel: String);

    /**
     * Adds a choice to the choice list field at the position specified.
     * 
     * @fieldName The field name.
     * @choiceValue The value stored in the database.
     * @choiceLabel The value displayed.
     * @choiceIndex Order of the choice in the list. The index is into a zero based array.
     * @example
     * g_form.addOption('priority', '2.5', '2.5 - Moderately High', 3);
     */
    addOption(fieldName: String, choiceValue: String, choiceLabel: String, choiceIndex: Number);

    /**
     * Removes all informational and error messages from the top of the form.Removes informational and error messages added with g_form.addInfoMessage() and g_form.addErrorMessage().
     * 
     * @example
     * g_form.clearMessages();
     */
    clearMessages();

    /**
     * Removes all options from the choice list.
     * 
     * @fieldName Name of the field.
     */
    clearOptions(fieldName: String);

    /**
     * Removes any value(s) from the field.
     * 
     * @fieldName Name of the field.
     */
    clearValue(fieldName: String);

    /**
     * Prevents file attachments from being added.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     */
    disableAttachments();

    /**
     * Allows file attachments to be added. Shows the paper clip icon.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     */
    enableAttachments();

    /**
     * Used to draw attention to a particular field. Flashes the specified color the specified number of times in the specified field.This method is not supported by Service Catalog.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     * @widgetName Specifies the field in the as .<fieldname.
     * @color RGB color or acceptable CSS color.
     * @count Specifies how long the label will flash. use 2 for a 1-second flash use 0 for a 2-second flash use -2 for a 3-second flash use -4 for a 4-second flash 
     * @example
     * g_form.flash("incident.number", "#FFFACD", 0);
     */
    flash(widgetName: String, color: String, count: Number);

    /**
     * Returns the most recent action name, or, for a client script, the sys_id of the UI action clicked.Note: Not available in Wizard client scripts.
     * 
     * @example
     * function onSubmit() {
     *    var action = g_form.getActionName();
     *    alert('You pressed ' + action);
     * }
     * @returns The current action name.
     */
    getActionName(): String;

    /**
     * Returns a Boolean value for the specified field.
     * 
     * @fieldName Name of the field.
     * @returns Returns false if the field value is false or undefined; otherwise returns true.
     */
    getBooleanValue(fieldName: String): Boolean;

    /**
     * Returns the HTML element for the specified field.Compound fields may contain several HTML elements. This method is generally not necessary as there are built-in methods that use the fields on a form.If the field is a reference field and the control is a choice list, getControl() may not return a control as expected. In this case, use sys_select.&lt;table name&gt;.&lt;field name&gt;.This method is not available in mobile scripts or Service Portal scripts.
     * 
     * @fieldName Name of the field.
     * @returns The field's HTML element.
     */
    getControl(fieldName: String): HTMLElement;

    /**
     * Returns the decimal value of the specified field.
     * 
     * @fieldName The name of the field.
     * @example
     * function onChange(control, oldValue, newValue, isLoading) {
     *    alert(g_form.getDecimalValue('percent_complete'));
     * }
     * @returns The decimal value of the specified field.
     */
    getDecimalValue(fieldName: String): String;

    /**
     * Returns the HTML element specified by the parameter.Compound fields may contain several HTML elements. This method is generally not necessary as there are built-in methods that use the fields on a form.This method is not available in mobile scripts or Service Portal scripts.
     * 
     * @id The field id.
     * @returns The field's HTML element.
     */
    getElement(id: String): HTMLElement;

    /**
     * Returns the HTML element for the form.This method is not available in mobile scripts or Service Portal scripts.
     * 
     * @returns The HTML element for the form.
     */
    getFormElement(): HTMLFormElement;

    /**
     * Returns the HTML element of the help text for the specified field.This method is applicable to service catalog variables only.
     * 
     * @fieldName Name of the field.
     * @returns Help text field's HTML element.
     */
    getHelpTextControl(fieldName: String): HTMLElement;

    /**
     * Returns the integer value of the field.
     * 
     * @fieldName The field name.
     * @returns Integer value of the field.
     */
    getIntValue(fieldName: String): Number;

    /**
     * Returns the plain text value of the field label.
     * 
     * @fieldName The field name
     * @example
     * if (g_user.hasRole('itil')) {
     *     var oldLabel = g_form.getLabelOf('comments');
     *     g_form.setLabelOf('comments', oldLabel + ' (Customer visible)');
     * }
     * @returns The label text.
     */
    getLabelOf(fieldName: String): String;

    /**
     * Returns the option element for a selected box named fieldName where choiceValue matches the option value.
     * 
     * @fieldName Name of the field.
     * @choiceValue Value of the option.
     * @returns The HTMLElement for the option. Returns null if the field or option is not found.
     */
    getOption(fieldName: String, choiceValue: String): HTMLElement;

    /**
     * Returns the GlideRecord for a specified field.If a callback function is present, this routine runs asynchronously. The browser (and script) processing continues normally until the server returns the reference value, at which time, the callback function is invoked. If a callback function is not present, this routine runs synchronously and processing halts (causing the browser to appear to hang) while waiting on a server response.Callback function support for ServiceCatalogForm.getReference is available.
     * 
     * @fieldName Name of the field.
     * @callBack Name of the call back function.
     * @example
     * function onChange(control, oldValue, newValue, isLoading) {
     *     g_form.getReference('caller_id', doAlert); // doAlert is our callback function
     * }
     *  
     * function doAlert(caller) { // reference is passed into callback as first arguments
     *    if (caller.vip === 'true')
     *       alert('Caller is a VIP!');
     * }
     * @returns GlideRecord object for the specified field. If the specified reference cannot be found, it returns an initialized GlideRecord object where currentRow = -1 and rows.length = 0.
     */
    getReference(fieldName: String, callBack: Function): GlideRecord;

    /**
     * Returns all section names, whether visible or not.
     * 
     * @returns The section names.
     */
    getSectionNames(): Arrayofstrings;

    /**
     * Returns an array of the form's sections.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     * @example
     * function onChange(control, oldValue, newValue, isLoading) {
     *    //this example was run on a form divided into sections (Change form)
     *    // and hid a section when the "state" field was changed
     *    var sections = g_form.getSections();
     *    if (newValue == '2') {
     *       g_form.setSectionDisplay(sections[1], false);
     *    } else {
     *       g_form.setSectionDisplay(sections[1], true);
     *    }
     * }
     * @returns The form's sections.
     */
    getSections(): ArrayofHTMLelements;

    /**
     * Returns the name of the table to which this record belongs.On the server side, the table for the current record can be retrieved with current.sys_class_name or current.getTableName().
     * 
     * @example
     * function onLoad() {
     *     if (g_form.isNewRecord()) {
     *         var tableName = g_form.getTableName(); //Get the table name
     *     }
     * }
     * @returns Name of the table.
     */
    getTableName(): String;

    /**
     * Returns the sys_id of the record displayed in the form.
     * 
     * @example
     * function onLoad() {
     *    var incSysid = g_form.getUniqueValue();
     *    alert(incSysid);
     * }
     * @returns The record's sys_id.
     */
    getUniqueValue(): String;

    /**
     * Returns the value of the specified field.
     * 
     * @fieldName The field name.
     * @example
     * function onChange(control, oldValue, newValue, isLoading) {
     *    alert(g_form.getValue('short_description'));
     * }
     * @returns The value of the specified field.
     */
    getValue(fieldName: String): String;

    /**
     * Hides all field messages.
     * 
     */
    hideAllFieldMsgs();

    /**
     * Hides all field messages of the specified type.
     * 
     * @type The type of message, info or error.
     */
    hideAllFieldMsgs(type: String);

    /**
     * Hides the error message placed by showErrorBox().Whenever possible, use hideFieldMsg() rather than this method whenever possible.
     * 
     * @fieldName The name of the field or control.
     */
    hideErrorBox(fieldName: String);

    /**
     * Hides the last message placed by showFieldMsg().
     * 
     * @fieldName Name of the field.
     */
    hideFieldMsg(fieldName: String);

    /**
     * Hides the messages placed by showFieldMsg().
     * 
     * @fieldName Name of the field.
     * @clearAll When true, all messages for the field are cleared. When false, only the last message is removed.
     * @example
     * g_form.hideFieldMsg('impact', true);
     */
    hideFieldMsg(fieldName: String, clearAll: Boolean);

    /**
     * Hides the specified related list on the form.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     * @listTableName Name of the related list. Use the sys_id to hide a list through a relationship.
     */
    hideRelatedList(listTableName: String);

    /**
     * Hides all related lists on the form.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     */
    hideRelatedLists();

    /**
     * Returns true while a live update is being done on the record the form is showing.This can be used in an onChange() client script to determine if a change to the record is because of a live update from another session. The client script can then decide what action to take, or not to take. This applies to systems using UI16 with live forms enabled.
     * 
     * @returns Returns true if a live update is happening on the record displayed by the form.
     */
    isLiveUpdating(): Boolean;

    /**
     * Returns true if the field is mandatory.
     * 
     * @fieldName Name of the field.
     * @returns True if the field is required, false otherwise.
     */
    isMandatory(fieldName: String): Boolean;

    /**
     * Returns true if the record has never been saved.
     * 
     * @example
     * function onLoad() {
     *    if(g_form.isNewRecord()){
     *       alert('New Record!');
     *    }
     * }
     * @returns Returns true if the record has not been saved; otherwise false.
     */
    isNewRecord(): Boolean;

    /**
     * Returns true if the section is visible.
     * 
     * @returns Returns true when the section is visible; otherwise, false is returned.
     */
    isSectionVisible(): Boolean;

    /**
     * You can update a list collector variable.
     * 
     * @fieldName Name of the slush bucket.
     * @example
     * g_form.refreshSlushbucket('bucket');
     */
    refreshSlushbucket(fieldName: String);

    /**
     * Removes the icon from the specified field that matches the icon and title.Note: This method is not supported by Service Catalog.
     * 
     * @fieldName Field name.
     * @icon Name of the icon to remove.
     * @title The icon's text title (name).
     * @example
     * function onChange(control, oldValue, newValue, isLoading) {
     * 	// if the caller_id field is not present, then we can't add an icon anywhere
     * 	if (!g_form.hasField('caller_id'))
     * 		return;
     *  
     * 	if (!newValue)
     * 		return;
     *  
     * 	g_form.getReference('caller_id', function(ref) {
     * 		g_form.removeDecoration('caller_id', 'icon-star', 'VIP');
     *  
     * 		if (ref.getValue('vip') == 'true')
     * 			g_form.addDecoration('caller_id', 'icon-star', 'VIP');			
     * 	});
     * }
     */
    removeDecoration(fieldName: String, icon: String, title: String);

    /**
     * Removes the icon from the specified field that matches the icon, title, and color.Note: This method is not supported by Service Catalog.
     * 
     * @fieldName Field name.
     * @icon Name of the icon to remove.
     * @title The icon's text title (name).
     * @color A CSS color
     * @example
     * g_form.removeDecoration('caller_id', 'icon-star', 'VIP', 'blue');
     */
    removeDecoration(fieldName: String, icon: String, title: String, color: String);

    /**
     * Removes the specified option from the choice list.
     * 
     * @fieldName Name of the field.
     * @choiceValue The value stored in the database. This is not the label.
     * @example
     * g_form.removeOption('priority', '1');
     */
    removeOption(fieldName: String, choiceValue: String);

    /**
     * Saves the record without navigating away (update and stay).
     * 
     */
    save();

    /**
     * Makes the specified field available or unavailable.
     * 
     * @fieldName Name of the field.
     * @disable When true disables the field. When false enables the field.
     */
    setDisabled(fieldName: String, disable: Boolean);

    /**
     * Displays or hides a field.This method cannot hide a mandatory field with no value. If the field is hidden, the space is used to display other items. Whenever possible, use a UI policy instead of this method.
     * 
     * @fieldname Name of the field.
     * @display When true displays the field, when false hides the field.
     * @example
     * function onChange(control, oldValue, newValue, isLoading, isTemplate) {
     *    //If the page isn't loading
     *    if (!isLoading) {
     *       //If the new value isn't blank
     *       if (newValue != '') {
     *          g_form.setDisplay('priority', false);   
     *       }
     *       else 
     *          g_form.setDisplay('priority', true);
     *       }
     *    }
     */
    setDisplay(fieldname: String, display: Boolean);

    /**
     * Sets the plain text value of the field label.Note: This method is not supported by Service Catalog.
     * 
     * @fieldName The field name.
     * @label The field text label.
     * @example
     * if (g_user.hasRole('itil')) {
     *     var oldLabel = g_form.getLabelOf('comments');
     *     g_form.setLabelOf('comments', oldLabel + ' (Customer visible)');
     * }
     */
    setLabelOf(fieldName: String, label: String);

    /**
     * Makes the specified field mandatory.Whenever possible, use a UI policy rather than this method.
     * 
     * @fieldName Name of the field.
     * @mandatory When true makes the field mandatory. When false makes the field optional.
     */
    setMandatory(fieldName: String, mandatory: Boolean);

    /**
     * Makes the specified field read only or editable.Whenever possible, use a UI policy instead of this method.To make a mandatory field read-only, you must first remove the mandatory requirement for that field by using the setMandatory() method.
     * 
     * @fieldName Name of the field.
     * @readOnly When true makes the field read only. When false makes the field editable.
     */
    setReadOnly(fieldName: String, readOnly: Boolean);

    /**
     * Shows or hides a section.
     * 
     * @sectionName The section name is lower case with an underscore replacing the first space in the name, and with the remaining spaces being removed, for example "Section Four is Here" becomes "section_fourishere". Other non-alphanumeric characters, such as ampersand (&), are removed. Section names can be found by using the getSectionNames() method.
     * @display When true shows the section. When false hides the section.
     * @returns Returns true when successful.
     */
    setSectionDisplay(sectionName: String, display: Boolean): Boolean;

    /**
     * Sets the value of a field.When defining a value in a choice list, be sure to use number value rather than the label.To improve performance by preventing a round trip, include a display value in addition to the value, use setValue(fieldName, value, displayValue).
     * 
     * @fieldName Name of the field.
     * @value Value in the database.
     * @example
     * g_form.setValue('short_description', 'replace this with appropriate text');
     */
    setValue(fieldName: String, value: String);

    /**
     * Sets the value and display value of the specified field.When defining a value in a choice list, be sure to use number value rather than the label.To improve performance by preventing a round trip when setting the value for a reference field, use this method not setValue(fieldName, value). When setting multiple reference values for a list collector field, arrays can be passed in the second and third parameters.
     * 
     * @fieldName Name of the field.
     * @value System ID for the reference value in the database. Can be an array of system IDs if the field is a glide-list.
     * @displayValue Display name for the referenced value in the database. Can be an array of display names if the field is a glide-list.
     * @example
     * g_form.setValue('assigned_to', userSysID, userName);
     * @example
     * g_form.setValue('glide-list_field_name', sysIDArray, displayNameArray);
     */
    setValue(fieldName: String, value: String, displayValue: String);

    /**
     * Displays or hides the field.If the field is hidden, the space is left blank. This method cannot hide mandatory fields with no value.Use UI Policy rather than this method whenever possible.
     * 
     * @fieldName The field name.
     * @display When true displays the field. When false hides the field.
     * @example
     * function onChange(control, oldValue, newValue, isLoading, isTemplate) {
     *    //If the page isn't loading
     *    if (!isLoading) {
     *       //If the new value isn't blank
     *       if(newValue != '') {
     *          g_form.setVisible('priority', false); 
     *       }
     *       else
     *          g_form.setVisible('priority', true); 
     *       }
     *    }
     */
    setVisible(fieldName: String, display: Boolean);

    /**
     * Displays an error message under the specified form field (either a control object or the name of the field). If the control or field is currently off the screen, the form scrolls to the control or field.A global property (glide.ui.scroll_to_message_field) is available that controls automatic message scrolling when the form field is off screen (scrolls the form to the control or field). The showFieldMsg() method is a similar method that requires a type parameter.
     * 
     * @name The name of the control or field.
     * @message The message to be displayed.
     */
    showErrorBox(name: String, message: String);

    /**
     * Displays an error message under the specified form field (either a control object or the name of the field). If the control or field is currently off the screen and the scrollForm parameter is true, the form scrolls to the control or field.A global property (glide.ui.scroll_to_message_field) is available that controls automatic message scrolling when the form field is off screen (scrolls the form to the control or field). The showFieldMsg() method is a similar method that requires a type parameter.
     * 
     * @name Name of the field or control.
     * @message Message to display.
     * @scrollForm When true scrolls the form to the field. When false the form does not scroll to the field.
     */
    showErrorBox(name: String, message: String, scrollForm: Boolean);

    /**
     * Displays either an informational or error message under the specified form field (either a control object or the name of the field). If the control or field is off the screen, the form is scrolled to the field.A global property (glide.ui.scroll_to_message_field) is available that controls automatic message scrolling when the form field is off screen (scrolls the form to the control or field).The showErrorBox() method is a shorthand method that does not require the type parameter.
     * 
     * @field Name of the field or control.
     * @message Message to display.
     * @type "error","info", or "warning".
     * @example
     * g_form.showFieldMsg('impact','Low impact response time can be one week','info');
     */
    showFieldMsg(field: String, message: String, type: String);

    /**
     * Displays either an informational or error message under the specified form field (either a control object or the name of the field). If the control or field is currently off the screen and scrollForm is true, the form is scrolled to the field.A global property (glide.ui.scroll_to_message_field) is available that controls automatic message scrolling when the form field is off screen (scrolls the form to the control or field).The showErrorBox() method is a shorthand method that does not require the type parameter.
     * 
     * @field Name of the field or control.
     * @message Message to display.
     * @type "error","info", or "warning".
     * @scrollForm When true, the form scrolls to the field if it is off screen. When false, the form does not scroll.
     * @example
     * g_form.showFieldMsg('impact','Low impact not allowed with High priority','error',false);
     */
    showFieldMsg(field: String, message: String, type: String, scrollForm: Boolean);

    /**
     * Displays the specified related list on the form.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     * @listTableName Name of the related list.
     */
    showRelatedList(listTableName: String);

    /**
     * Displays all the form's related lists.This method is not available on the mobile platform. If this method is run on a mobile platform, no action occurs.
     * 
     */
    showRelatedLists();

    /**
     * Saves the record.The user is taken away from the form, returning them to where they were.
     * 
     */
    submit();

    /**
     * Performs the UI action specified by the parameter.
     * 
     * @verb An action_name from a sys_ui_action record. The action name must be for a visible form button.
     */
    submit(verb: String);

}

/**
 * You can create a globally unique identifier. You access the GlideGuidV3 methods using the g_guid global object.
 * 
 * 
 */
declare class GlideGuidV3 {



    /**
     * Creates a globally unique identifier 32 characters long, or as specified with the optional length argument.
     * 
     * @stringLength The desired string length, must be between 1 and 32 inclusive. This parameter is optional. If not specified, the returned string will be 32 characters long.
     * @returns The globally unique identifier.
     */
    generate(stringLength: Number): String;

}

/**
 * Use GlideListV3 to manipulate lists. You access the GlideListV3 methods by using the g_list global object. These methods are used in UI context menus and UI actions. The g_list object is not available for related lists on the form link UI action.
 * 
 * 
 */
declare class GlideListV3 {



    /**
     * Adds a single term to the list query filter.
     * 
     * @filter Query string condition to add.
     */
    addFilter(filter: String);

    /**
     * Returns the GlideList object for the specified DOM element.
     * 
     * @DomElement The DOM element ID for which you want the GlideList object.
     * @returns The GlideList object for the specified DOM element. Returns null if the DOM element is not found.
     */
    get(DomElement: Object): Object;

    /**
     * Returns the GlideList object for specified list.
     * 
     * @listId The list name.
     * @returns The GlideList object for the specified list, or null if not found.
     */
    get(listId: String): Object;

    /**
     * Returns a comma-separated list of sys_ids for checked items in the list. Does not return items that are not allowed to be executed.
     * 
     * @returns Comma-separated list of the sys_ids for checked items in the list. Does not return items that are not allowed to be executed.
     */
    getChecked(): String;

    /**
     * Returns the sysparm_fixed query.The fixed query is the part of the query that cannot be removed from the breadcrumb (i.e., it is fixed for the user). It is specified by including a sysparm_fixed_query parameter for the application module.
     * 
     * @returns The fixed query string for the list.
     */
    getFixedQuery(): String;

    /**
     * Returns the form's target attribute.
     * 
     * @returns The form's target attribute.
     */
    getFormTarget(): String;

    /**
     * Returns the field or comma-separated list of fields that are used to group the list.
     * 
     * @returns The field or comma-separated list of fields used to group the list.
     */
    getGroupBy(): String;

    /**
     * Returns the name of the list, which is usually the table name.
     * 
     * @returns The list name.
     */
    getListName(): String;

    /**
     * Returns the first field used to order the list.
     * 
     * @returns The field used to order the list, or an empty string if the list is not sorted.
     */
    getOrderBy(): String;

    /**
     * Returns the name of the parent table (the table associated with the form).
     * 
     * @returns The parent table name.
     */
    getParentTable(): String;

    /**
     * Returns the encoded query string for the list.
     * 
     * @options The options can be one or more of the following. orderby - include ORDERBY in the query groupby - include GROUPBY in the query fixed - include sysparm_fixed_query in the query all - include all the options in the query 
     * @returns Encoded query string for the list.
     */
    getQuery(options: Object): String;

    /**
     * Returns the referring URL.
     * 
     * @returns Returns the parent form's URL, or '*' if there is no parent form.
     */
    getReferringUrl(): String;

    /**
     * Returns the related list field that associates the related list to the parent form.
     * 
     * @returns Field that connects the list to the parent form.
     */
    getRelated(): String;

    /**
     * Returns the related list type.
     * 
     * @returns The relationship table type.
     */
    getRelatedListType(): String;

    /**
     * Returns the relationship record id, if this is type REL related list.
     * 
     * @returns The sys_id of the relationship record.
     */
    getRelationshipId(): String;

    /**
     * Returns the number of rows returned by the query.
     * 
     * @returns The number of rows returned by the query.
     */
    getRowCount(): Number;

    /**
     * Returns the number of rows to be displayed on a page.
     * 
     * @returns The number of rows to be displayed on a page.
     */
    getRowsPerPage(): Number;

    /**
     * Returns the table name of the list.
     * 
     * @returns The list's table name.
     */
    getTableName(): String;

    /**
     * Returns the list title.
     * 
     * @returns The list title.
     */
    getTitle(): String;

    /**
     * Returns the view used to display the list.
     * 
     * @returns The name of the view
     */
    getView(): String;

    /**
     * Returns true if the list has been personalized by the user.
     * 
     * @returns True if the list layout has changed.
     */
    isUserList(): Boolean;

    /**
     * Refreshes the list. The orderBy part of the list filter is ignored so that the list's natural ordering is used.
     * 
     * @firstRow (Optional) The first row to display in the list. If not specified, the list's current first row is used.
     * @additionalParams (Optional) Name- value pairs that are submitted with the list refresh request.
     */
    refresh(firstRow: Number, additionalParams: Object);

    /**
     * Refreshes the list using the orderBy fields.
     * 
     * @firstRow (Optional) The first row to display in the list. If not specified, the list's current first row is used.
     * @additionalParams (Optional) Name- value pairs that are submitted with the list refresh request.
     */
    refreshWithOrderBy(firstRow: Number, additionalParams: Object);

    /**
     * Sets the encoded query string for the list ignoring the orderBy and groupBy parts of the query string.
     * 
     * @filter An encoded query string.
     * @saveOrderBy The default is false. When true uses the orderBy part of the query.
     * @saveGroupBy The default is false. When true uses the groupBy part of the query.
     */
    setFilter(filter: String, saveOrderBy: Boolean, saveGroupBy: Boolean);

    /**
     * Sets the encoded query string for the list, and then refreshes the list using the new filter.This preserves the groupby and orderby parameters.
     * 
     * @filter Encoded query string.
     */
    setFilterAndRefresh(filter: String);

    /**
     * Sets the first row to be displayed when the list is refreshed.
     * 
     * @firstRow The row number in the list.
     */
    setFirstRow(firstRow: Number);

    /**
     * Specifies where to display the response from the form.
     * 
     * @target The form.target attribute value to use.
     */
    setFormTarget(target: String);

    /**
     * Sets the groupBy criteria for the list, for a single field or multiple fields.For a single field, use field or groupByField. The groupBy prefix is optional. For multiple fields use field1^field2^field3 or groupByField1^groupByField2^groupByField3.
     * 
     * @String The group by criteria for the list.
     */
    setGroupBy(String: groupBy);

    /**
     * Sets the orderBy criteria for the list.For a single order by field use orderBy field or orderByDescField. For multiple fields, use orderByField1^orderByField2^orderByField3. orderBy specifies ascending order and orderByDesc specifies descending. These prefix strings are optional. If not specified orderBy is assumed.
     * 
     * @orderBy Single or multiple order by fields.
     */
    setOrderBy(orderBy: String);

    /**
     * Sets the parent form referring url.
     * 
     * @url The parent form's URL
     */
    setReferringUrl(url: String);

    /**
     * Set the number of rows to display on a page.
     * 
     * @numRows The number of rows to display on a page.
     */
    setRowsPerPage(numRows: Number);

    /**
     * Displays or hides all of the groups within the list and saves the current collapsed/expanded state of the groups as a user preference.
     * 
     * @showFlag When true, displays the groups within the list.
     */
    showHideGroups(showFlag: Boolean);

    /**
     * Displays or hides the list and saves the current collapsed/expanded state of the list as a user preference.
     * 
     * @showFlag When true, displays the list.
     */
    showHideList(showFlag: Boolean);

    /**
     * Sort the list in ascending order.
     * 
     * @field The field to be used to sort the list.
     */
    sort(field: String);

    /**
     * Sorts the list in descending order.
     * 
     * @field The field used to sort the list.
     */
    sortDescending(field: String);

    /**
     * Toggles the list display between collapsed and expanded, and saves the state as a user preference.
     * 
     */
    toggleList();

    /**
     * Toggles the list display between collapsed and expanded, but does not save the state as a user preference.
     * 
     */
    toggleListNoPref();

}

/**
 * GlideMenu methods are used in UI Context Menus, in the onShow scripts to customize UI Context Menu items. There is no constructor for the GlideMenu class. Access GlideMenu methods using the g_menu global object. g_menu is the UI Context Menu that is about to be shown. The onShow script can make changes to the appearance of the menu before it is displayed using these methods. g_item is the current UI Context Menu item that is about to be shown. It is used in several of the g_menu methods to specify an item. 
 * 
 * 
 */
declare class GlideMenu {



    /**
     * Clears the image for an item.
     * 
     * @item Specifies the item to have its image removed from display.
     * @example
     * g_menu.clearImage(g_item);
     */
    clearImage(item: GlideMenuItem);

    /**
     * Clears any selection images from items in the menu.
     * 
     */
    clearSelected();

    /**
     * Returns a menu item by item ID.It can be necessary to find an item in a menu so that it can be changed before being displayed. Each menu item may be assigned a unique ID when the menu item is created (either from a UI Context Menu entry or from the addAction() method in the Dynamic Script Action).
     * 
     * @itemID Specifies the item to be returned.
     * @returns The menu item
     */
    getItem(itemID: String): GlideMenuItem;

    /**
     * Disables a menu item so that it cannot be selected. The disabled menu item is displayed in a lighter color (grayed out) to indicate it is disabled.
     * 
     * @item The item to be disabled.
     * @example
     * g_menu.setDisabled(g_item);
     */
    setDisabled(item: GlideMenuItem);

    /**
     * Enables the specified menu item.
     * 
     * @item The item to be enabled.
     * @example
     * g_menu.setEnabled(g_item);
     */
    setEnabled(item: GlideMenuItem);

    /**
     * Hides the specified menu item.When hiding menu items, the separator bars are not adjusted, so it is possible to end up with the menu showing two separators in a row.
     * 
     * @item The item to be hidden.
     * @example
     * g_menu.setHidden(g_item);
     */
    setHidden(item: GlideMenuItem);

    /**
     * Sets an image for an item.
     * 
     * @item the item to have the image displayed.
     * @imgSrc the image to attach to the menu item.
     * @example
     * g_menu.setImage(g_item, 'images/checked.gifx');
     */
    setImage(item: GlideMenuItem, imgSrc: String);

    /**
     * Sets the display label for a menu item. The label may contain HTML.
     * 
     * @item the item to be labeled.
     * @label the label to be displayed. The string may contain HTML.
     * @example
     * g_menu.setLabel(g_item, "This is a new label");
     */
    setLabel(item: GlideMenuItem, label: String);

    /**
     * Displays the specified item.
     * 
     * @item The item to be displayed.
     * @example
     * g_menu.setVisible(g_item);
     */
    setVisible(item: GlideMenuItem);

}

/**
 * Displays a form in a GlideModal. General usage of the GlideModalForm class involves creating the object, setting any preferences, and then rendering the GlideModalForm. * * Specify the query parameters that are passed to the form using setPreference(). Any name/value pair that you specify with setPreference() is sent along with the form POST request to display the form. * * The GlideFormModal is set to fill the height of the document window.
 * 
 * 
 */
declare class GlideModalFormV3 {



    /**
     * Creates an instance of the GlideModalForm class.
     * 
     * @title The form title.
     * @tableName The table being shown.
     * @onCompletionCallback The function to call after the form has been submitted and processed on the server. The callback function has the form callbackFunction(String action_verb, String sys_id, String table, String displayValue) where action_verb is the name of the UI action executed. Examples are sysverb_insert (Submit button), sysverb_cancel, sysverb_save (Save button). sys_id is the sys_id of the affected record. table is the name of the table containing the record. displayValue 
     * @example
     * var d = new GlideModalForm('dialog title', 'table_name_or_form_name', [callback on completion of submit])
     *          d.setPreference('name', 'value');
     *          d.render();
     */
    constructor(title: String, tableName: String, onCompletionCallback: Function);

    /**
     * Sets the specified parameter to the specified value.
     * 
     * @name The parameter name.
     * @value The parameter value.
     */
    addParm(name: String, value: String);

    /**
     * Shows the form.
     * 
     */
    render();

    /**
     * Sets the function to be called when the form has been successfully submitted and processed by the server.The callback function has the form callbackFunction(String action_verb, String sys_id, String table, String displayValue) where action_verb is an action_name from a sys_ui_action record. sys_id is the sys_id of the affected record. table is the name of the table containing the record. displayValue 
     * 
     * @callbackFunction The callback function to be called when the form has been successfully processed.
     */
    setCompletionCallback(callbackFunction: Function);

    /**
     * Sets the function to be called after the form has been loaded.
     * 
     * @callbackFunction The function to be called after the form has been loaded. The callback function has the form callBackFunction(GlideModalForm obj)
     */
    setOnloadCallback(callbackFunction: Function);

    /**
     * Sets the object's sys_id preference.
     * 
     * @sys_id The id preference. One of the query parameters passed to the form.
     */
    setSysID(sys_id: String);

}

/**
 * Provides methods for displaying a content overlay. This is a fully-featured replacement for GlideWindow and GlideDialogWindow.Figure 1. Example overlay 
 * 
 * 
 */
declare class GlideModalV3 {



    /**
     * Creates an instance of the GlideModalV3 class.
     * 
     * @id The UI page to load into the modal.
     * @readOnly When true, hides the close button.
     * @width The width in pixels.
     */
    constructor(id: String, readOnly: Boolean, width: Number);

    /**
     * Get a GlideModal object by ID.
     * 
     * @id The element id of the GlideModal object.
     * @returns The object.
     */
    get(id: String): GlideModal;

    /**
     * Returns the value of the specified property.
     * 
     * @name The property name
     * @example
     * var gm = new GlideModal('UI_dialog_name');
     *         //Sets the dialog title
     *         gm.setTitle('Show title');  			      	
     *         //returns the value of the title
     *         var title = gm.getPreference('title');
     *         gm.setWidth(550);
     *         //Opens the dialog
     *         gm.render(); 
     *       
     * @returns The specified property's value
     */
    getPreference(name: String): String;

    /**
     * Renders the UI page in the modal.
     * 
     * @example
     * var gm = new GlideModal("UI_dialog_name");
     *         //Sets the dialog title
     *         gm.setTitle('Show title');  			      	
     *         gm.setWidth(550);
     *         //Opens the dialog
     *         gm.render(); 
     *       
     */
    render();

    /**
     * Display a modal with the specified HTML content.The renderWithContent() method replaces the render() method, and does not request a UI page to render.
     * 
     * @html The HTML content to be shown in the modal.
     */
    renderWithContent(html: Object);

    /**
     * Display a modal with the specified HTML content.The renderWithContent() method replaces the render() method, and does not request a UI page to render.
     * 
     * @html The HTML content to be shown in the modal.
     */
    renderWithContent(html: String);

    /**
     * Set a property that is read by the loaded UI page.
     * 
     * @name The property name
     * @value The property value
     * @example
     * var gm = new GlideModal('UI_dialog_name');
     *         //Sets the dialog title
     *         gm.setTitle('Show title'); 
     *         gm.setPreference('table', 'task'); 			
     *         gm.setPreference('name', 'value');        	
     *         //Opens the dialog
     *         gm.render(); 
     *       
     */
    setPreference(name: String, value: String);

    /**
     * Set the properties and reload the modal.
     * 
     * @properties An array of name-value pairs to be set.
     */
    setPreferenceAndReload(properties: Array<any>);

    /**
     * Sets the title of the modal.
     * 
     * @title The title to be displayed
     * @example
     * var gm = new GlideModal('UI_dialog_name');
     *         //Sets the dialog title
     *         gm.setTitle('Show title'); 
     *         gm.setPreference('name', 'value'); 			      	        
     *         //Opens the dialog
     *         gm.render(); 
     *       
     */
    setTitle(title: String);

    /**
     * Set the width in pixels.The modal is boxed into predefined system sizes.
     * 
     * @width The number of pixels.
     * @example
     * var gm = new GlideModal('UI_dialog_name');
     *         //Sets the dialog title
     *         gm.setTitle('Show title'); 
     *         gm.setPreference('name', 'value'); 			      	
     *         gm.setWidth(550);
     *         //Opens the dialog
     *         gm.render(); 
     *       
     */
    setWidth(width: Number);

    /**
     * Change the view and reload the modal.
     * 
     * @newView The view to use.
     */
    switchView(newView: String);

}

/**
 * Provides methods to control and refresh the navigator and main frame. The GlideNavigation methods are accessed using the g_navigation global object.
 * 
 * 
 */
declare class GlideNavigationV3 {



    /**
     * Redirects to a new URL.
     * 
     * @url The URL to be loaded. It can be any URL supported by the browser.
     * @target The frame to use. If omitted, opens in the current frame.
     */
    open(url: String, target: String);

    /**
     * Opens a popup window.The features parameter is part of the DOM specification. The features are used and passed through. See the Mozilla Developer Network for more information on the feature list.
     * 
     * @url The URL to open.
     * @name The window name
     * @features A comma separated list of features for the popup window.
     * @noStack True to append sysparm_stack=no to the url. This prevents weirdness when using the form back button.
     * @returns The instance of the new window.
     */
    openPopup(url: String, name: String, features: String, noStack: Boolean): Window;

    /**
     * Redirects to a record. The record will be displayed in the navigator.
     * 
     * @tableName The name of the table containing the record to be displayed.
     * @sys_id The sys_id of the record to be displayed.
     */
    openRecord(tableName: String, sys_id: String);

    /**
     * Refreshes the navigator display.
     * 
     */
    refreshNavigator();

    /**
     * Reloads the current frame.
     * 
     */
    reloadWindow();

}

/**
 * You can show messages over the page content. The GlideNotification method is accessed using the g_notification global object. List V3 must be activated for the g_notification object to be available.
 * 
 * 
 */
declare class GlideNotificationV3 {



    /**
     * Displays the specified string over the page content as the specified type of message.
     * 
     * @type The type of message - error, warning, or info.
     * @example
     * // Displays an info message at the top of the screen
     * nowapi.g_notification.show("info", "The record has been updated");
     * 	 
     * // Displays an error message at the top of the screen
     * nowapi.g_notification.show("error", "You need to provide notes!");
     */
    show(type: String);

}

/**
 * GlideRecord is used for database operations. Client-side GlideRecord enables the use of some GlideRecord functionality in client-side scripts, such as client scripts and UI policy scripts. A GlideRecord contains both records and fields. * * Queries made with the client-side GlideRecord are executed on the server. Therefore, a request is made from the client browser to obtain the record data. * * Client-side GlideRecord is not supported in scoped applications. Instead, create a script include and use GlideAjax, or use the REST APIs.
 * 
 * 
 */
declare class GlideRecordV3 {



    /**
     * Creates an instance of the GlideRecord class for the specified table.
     * 
     * @tableName The table to be used.
     * @example
     * var gr = new GlideRecord('incident');
     */
    constructor(tableName: String);

    /**
     * Adds a column to order by in the query.
     * 
     * @column The column by which to order the result set.
     */
    addOrderBy(column: String);

    /**
     * Adds a filter to return records where the field meets the specified condition (field, operator, value).
     * 
     * @fieldName Name of the field to be checked.
     * @operator An operator for the query.
     * @value The value to use.
     */
    addQuery(fieldName: String, operator: Object, value: Object);

    /**
     * Adds a filter to return records where the field is equal to the value (or is in a list of values).
     * 
     * @fieldName Name of the field to be checked.
     * @value The value or list of values on which to query.
     */
    addQuery(fieldName: String, value: Object);

    /**
     * Deletes the current record.
     * 
     * @responseFunction The response function.
     * @returns True if the record was deleted. False if no record was found to delete.
     */
    deleteRecord(responseFunction: Function): Boolean;

    /**
     * Get a record by sysID.
     * 
     * @sysId The sysID of the record for which to search.
     * @returns True if one or more matching records was found. False if no records were found.
     */
    get(sysId: String): Boolean;

    /**
     * Retrieves all query conditions as an encoded query string.
     * 
     * @returns An encoded query string containing all conditions that have been added to the query.
     */
    getEncodedQuery(): String;

    /**
     * Gets the name of the table associated with the GlideRecord.
     * 
     * @returns The table name.
     */
    getTableName(): String;

    /**
     * Determines if there are any more records in the GlideRecord.
     * 
     * @returns True if there are more records in the query set.
     */
    hasNext(): Boolean;

    /**
     * Inserts a new record using the field values that have been set for the current record.
     * 
     * @responseFunction The response function.
     * @returns The sys_id of the inserted record, or null if the record was not inserted.
     */
    insert(responseFunction: Function): String;

    /**
     * Moves to the next record in the GlideRecord.
     * 
     * @returns False if there are no more records in the query set.
     */
    next(): Boolean;

    /**
     * Specifies an orderBy column. May be called more than once to order by multiple columns.
     * 
     * @column The column to add to sort the result set.
     */
    orderBy(column: String);

    /**
     * Performs a query. Takes zero or more parameters. Parameters may be in any order. Any function is considered to be a response function. Any pair of literals is considered a query pair (field : value).Do not make synchronous query calls. Performing a query without a response function makes the call synchronous, which means that the display will wait for the query response before continuing.
     * 
     * @responseFunction The function called when the query results are available. (optional)
     * @name A field name. (optional)
     * @value The field value to check for. (optional)
     * @example
     * // synchronous, no response function, DO NOT USE
     * query(); 
     * // 
     * // asynchronous, calls the responseFunction when done 
     * query(responseFunction) 
     * //
     * // synchronous, adds "category=hardware" to current query conditions, and does a query, DO NOT USE
     * query('category', 'hardware') 
     * //
     * //asynchronous, adds "category=hardware" to current query conditions, does a query, and calls responseFunction 
     * query('category', 'hardware', responseFunction) 
     */
    query(responseFunction: Function, name: String, value: String);

}

/**
 * Access UI scripts from within client-side code. There is no constructor for this class. Access methods using the g_ui_scripts global object in any client-side code, such as client or validation scripts. * * If calling a UI script with UI Type set to Mobile / Service Portal, use the g_ui_scripts['nameOfScript']; syntax. If calling a UI script with the UI Type set to All or Desktop, use the getUIScript() method to load the script. However, this method is not supported in Internet Explorer 11 when called outside of the Angular application environment. If calling a UI script outside of an Angular context using IE11, you must call the script directly. * * Note: This class does not support UI scripts with the Global field set to true.
 * 
 * 
 */
declare class GlideUIScripts {



    /**
     * Calls a UI script with the UI Type set to All or Desktop from a client script or other client-side code. Returns a promise.Use the then() function to perform an asynchronous action after the call resolves.
     * 
     * @scriptName API name of the UI script to run.
     * @example
     * function onLoad() {
     *     //Call the UI script directly If the UI Type is Mobile / Service Portal, for example:
     *     //g_ui_scripts['myUIScript'];
     * 
     *     //Use the method if the UI Type is All or Desktop
     *     g_ui_scripts.getUIScript('myUIScript').then(function(script) {
     *         script.myUIScriptMethod();
     *     }, function() {
     *         console.log('The script did not load');
     *     });
     * }
     * @returns The result of the asynchronous call.
     */
    getUIScript(scriptName: String): Promise;

}

/**
 * Provides methods for manipulating a URI. The GlideURLV3 API can be used in client-side scripts using ListV2 and ListV3 APIs.
 * 
 * 
 */
declare class GlideURLV3 {



    /**
     * Creates an instance of the GlideURL class.
     * 
     * @contextPath A relative path for the URL.
     */
    constructor(contextPath: String);

    /**
     * Adds a query string name-value pair to the URL.
     * 
     * @name Name of the query string parameter.
     * @value Query string value.
     * @example
     * var gu = new GlideURL('incident.do');
     * var url = gu.addParam('sys_id', '-1');
     * 
     * @returns The GlideURL
     */
    addParam(name: String, value: String): String;

    /**
     * Get the entire context path and query string parameters as a single URI.
     * 
     * @additionalParams A name-value pair object that contains parameters that are added to this URL request only. These additional parameters are not saved to the GlideURL object.
     * @returns The GlideURL with the specified additional parameters added to the end.
     */
    getURL(additionalParams: Object): String;

    /**
     * Reloads the current page URL.This refreshes the current page URL, not the URL set in the object.
     * 
     */
    refresh();

}

/**
 * The GlideUser API provides access to information about the current user and current user roles. Using the GlideUser API avoids the need to use the slower GlideRecord queries to get user information. The GlideUser methods and properties are accessed through a global object (g_user) that is only available in client scripts. GlideUser contains name and role information about the current user. is typically used in client scripts and UI policies but is also found in UI actions that run on the client. cannot be used in business rules or UI actions that run on the server. avoids the need for GlideRecord queries to get user information. * * Session information about the current user and current user roles is contained in the client (web browser). All GlideUser methods except getClientData() access the session information that is available by default. The getClientData() method requires setup on the server and use of putClientData() to make session information available.
 * 
 * 
 */
declare class GlideUser {

    /** Returns the current user's first name. */
    firstName: String
    /** The current user's last name. */
    lastName: String
    /** Returns the sys_id of the current user. */
    userID: String
    /** This property is the current user's username, for example gsmith02. It is not the
    user's name, for example George Smith. */
    userName: String


    /**
     * Returns a session client value previously set with putClientData().Session client data is a set of named strings that may be setup on the server (using putClientData()) that then may be used by client scripts (using getClientData()). Can be used during form load time to get information that the client script needs to make decisions about the form, for example, which fields should be visible.
     * 
     * @Key Name of the client data to retrieve.
     * @example
     * var loginLanguage = g_user.getClientData("loginlanguage");
     * @returns Value of the client data.
     */
    getClientData(Key: String): String;

    /**
     * Returns the first and last name of the current user.
     * 
     * @example
     * var formalName = g_user.getFullName();
     * @returns The current user's full name.
     */
    getFullName(): String;

    /**
     * Returns true if the current user has the specified role or the admin role.
     * 
     * @role Role to check
     * @includeDefaults (Optional) Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request. For additional information on roles, see Explicit roles.
     * Default: false
     * @example
     * var isInternal = g_user.hasRole('snc_internal', true);
     * @example
     * var isItil = g_user.hasRole('itil');
     * @returns Returns true if the current user has the specified role or the admin role; otherwise returns false.
     */
    hasRole(role: String, includeDefaults: Boolean): Boolean;

    /**
     * Returns true only if the current user has the specified role.
     * 
     * @role Role to check
     * @includeDefaults (Optional) Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request. For additional information on roles, see Explicit roles.
     * Default: false
     * @example
     * var isInternal = g_user.hasRoleExactly('snc_internal', true);
     * @example
     * var isItil = g_user.hasRoleExactly('itil');
     * @returns Returns true if the current user has the specified role.
     */
    hasRoleExactly(role: String, includeDefaults: Boolean): Boolean;

    /**
     * Returns true if the current user has at least one of the specified roles or has the admin role.
     * 
     * @roles Comma-separated list of roles to check
     * @includeDefaults (Optional) Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request. For additional information on roles, see Explicit roles.
     * Default: false
     * @example
     * var isOK = g_user.hasRoleFromList("itil, maint");
     * @example
     * var isOK = g_user.hasRoleFromList("itil, maint, snc_internal", true);
     * @returns Returns true if the current user has a role in the list or the admin role.
     */
    hasRoleFromList(roles: String, includeDefaults: Boolean): Boolean;

    /**
     * Returns true if the current user has any role.
     * 
     * @includeDefaults (Optional) Flag that indicates whether to include default roles, such as snc_internal and snc_external, in the request. For additional information on roles, see Explicit roles.
     * Default: false
     * @example
     * var yesRole = g_user.hasRoles();
     * @example
     * var yesRole = g_user.hasRoles(true);
     * @returns Returns true if the current user has at least one role.
     */
    hasRoles(includeDefaults: Boolean): Boolean;

}

/**
 * Provides methods to get and format translated messages. The i18N methods are accessed using the g_i18n global object.
 * 
 * 
 */
declare class i18NV3 {



    /**
     * Formats a string containing named tokens with values from a map.
     * 
     * @message The message to have the tokens added.
     * @map The map of name/value pairs to replace in the message.
     * @example
     * // Returns: "The rich young ruler was very very rich"
     * nowapi.i18n.format("The {p1} {p2} {p3} was very very {p1}",{p1: "rich", p2: "young", p3: "ruler"});
     * @returns The formatted string
     */
    format(message: String, map: Object): String;

    /**
     * Retrieves a translated message.If the specified string exists in the database for the current language, then the translated message is returned. If the specified string does not exist for the current language, then the English version of the string is returned. If the string does not exist at all in the database, then the ID itself is returned.
     * 
     * @msgKey The message to be retrieved.
     * @callback The function to be called when the message has been retrieved. The callback function has one argument, a string that is the translated message.
     */
    getMessage(msgKey: String, callback: Function);

    /**
     * Retrieves a set of messages.If the specified string exists in the database for the current language, then the translated message is returned. If the specified string does not exist for the current language, then the English version of the string is returned. If the string does not exist at all in the database, then the ID itself is returned.
     * 
     * @msgKeys An array of keys specifying the messages to be retrieved.
     * @callback The function to be called when the messages have been retrieved. The callback function has one argument, an object containing key-value pairs, where key is the requested message key, and the value is the translated string.
     */
    getMessages(msgKeys: Array<any>, callback: Function);

}

/**
 * The NotifyClient API allows you use Notify telephony functionality, such as making and receiving calls, from a web browser. Several NotifyClient methods take a callback function as a parameter. Because NotifyClient calls are made asynchronously, these methods cannot return a value directly. Use the callback function to parse the returned data, such as by assigning variables or making other API calls.
 * 
 * 
 */
declare class NotifyClient {



    /**
     * Instantiates a new Notify WebRTC Client object.
     * 
     * @initializeVendorClientLazily Flag that indicates whether to use the autoSelectVendorCallback function passed in the setCallerId() method to automatically set the caller's associated vendor (notifyConfig.vendor does not need to be defined in the constructor). false: Default. Do not use the autoSelectVendorCallback function to set the caller's vendor. The vendor must be set in the constructor. true: Use the autoSelectVendorCallback function to define the vendor when the caller ID is set. 
     * @notifyConfig JSON object that contains the configuration settings for the Notify WebRTC Client.
     * @notifyConfigautoLoadScriptResources Flag that indicates how to load the core JS library needed by the vendor client. false: Default. Use vendor specific codes to load the required vendor JS library (enables backwards compatibility). true: Use notifyClient.js to load the core JS library. 
     * @notifyConfigcallerId Registered Notify number to use. Do not directly set this value. Use the method notifyClient.setCallerID() to set this value.
     * @notifyConfigforceRefreshToken Flag that indicates whether to auto-renew expired client tokens. false: Do not automatically renew client tokens when they expire. true: Default. Automatically renew client tokens when they expire. 
     * @notifyConfigskipParentId Flag that indicates whether to immediately invoke the onIncoming caller for incoming calls. false: Default. Do not immediately invoke the onIncoming event handler. true: Immediately invoke the onIncoming event handler. By setting this flag, if there is another call, where the &lt;Dial&gt;&lt;Client&gt; Twiml caused the incoming call, then setting this flag causes the system to auto poll the backend. This auto poll obtains the parent notify_call reference. 
     * @notifyConfigvendor Vendor to which the caller belongs. SNC.Notify.Vendor.TWILIO_DIRECT SNC.Notify.Vendor.TWILIO (older, deprecated Twilio driver) 
     * @example
     * jQuery(function () {
     * 
     *   var notifyConfig = {
     *     autoLoadScriptResources: true // This will take care of auto loading the JS resources needed by the client (if any)
     *   };
     *   var client = new SNC.Notify.Client(notifyConfig, true); // The second argument ensures that the proper vendor for the given number is auto determined
     *   client.setCallerId('valid_notify_long_number', function () {
     *     // This is called after the vendor has been determined.
     * 
     *     if (!notifyConfig.vendor) // Means this number has no compatible vendor
     *       return;
     * 
     *     client.addEventListener(SNC.Notify.STD_EVENTS.ONLINE, function () {
     *       // Ability to call is available
     *     });
     *     client.addEventListener(SNC.Notify.STD_EVENTS.OFFLINE, function () {
     *       // Ability to call is _not_ available right now
     *     });
     *     client.addEventListener(SNC.Notify.STD_EVENTS.ERROR, function (msg, code) {
     *       // Some error happened
     *     });
     *       //... register other event handlers here
     *       //Show UI elements which can be used to invoke client.call() and other APIs
     *     client.init(); // This is important to call this.
     *     });
     * });
     */
    constructor(initializeVendorClientLazily: Boolean, notifyConfig: Object, notifyConfigautoLoadScriptResources: Boolean, notifyConfigcallerId: Number, notifyConfigforceRefreshToken: Boolean, notifyConfigskipParentId: Boolean, notifyConfigvendor: Constant);

    /**
     * Registers an event handler to listen for changes in a Notify client.Using this method you can register multiple listeners. Each listener must be a separate method call.
     * 
     * @event Name of the event to listen for. Instead of passing strings, use the constants defined in SNC.Notify.STD_EVENTS. CALL_START: call has started and is in progress. CALL_CANCEL: caller canceled the call. CALL_INIT: WebRTC connected to a call (incoming or outgoing). CALL_DISCONNECT: current call has been disconnected. ERROR: Error occurred. Parameters: message(string), errCode(string) message: error message to display. errCode: Optional. Associated error code. INCOMING_CALL: Call is coming in. Parameters: from(string), to(string), callId(string), parentId(string), sysId(string), isFromClient(boolean) from: caller's phone number. to: called phone number. callId: SID of the call. parentId: parent notify_call reference. If skipParentId is set to true, this parameter should not be passed. sysId: WebRTC-to-WebRTC calls only. Unique identifier (sys_id) of the caller. isFromClient: WebRTC-to-WebRTC calls only. Flag that indicates whether the call is from another WebRTC client. CALL_MUTE: client is muted. CALL_UNMUTE: client is unmuted. OFFLINE: WebRTC session is not active. ONLINE: WebRTC session is ready. Must be set after calling the init() method. 
     * @example
     * jQuery(function () {
     * 
     *   var notifyConfig = {
     *     autoLoadScriptResources: true // This will take care of auto loading the JS resources needed by the client (if any)
     *   };
     *   var client = new SNC.Notify.Client(notifyConfig, true); // The second argument ensures that the proper client for the given number is auto determined
     *   client.setCallerId('valid_notify_long_number', function () {
     *     // This is called after the client has been determined.
     * 
     *     if (!notifyConfig.vendor) // Means this number has no compatible client
     *       return;
     * 
     *     client.addEventListener(SNC.Notify.STD_EVENTS.ONLINE, function () {
     *       // Ability to call is available
     *     });
     *     client.addEventListener(SNC.Notify.STD_EVENTS.OFFLINE, function () {
     *       // Ability to call is _not_ available right now
     *     });
     *     client.addEventListener(SNC.Notify.STD_EVENTS.ERROR, function (msg, code) {
     *       // Some error happened
     *     });
     *       //... register other event handlers here
     *      
     *     client.init(); // This is important to call this.
     *     });
     * });
     * @example
     * var dereg = notifyClient.addEventListener(SNC.Notify.STD_EVENTS.ONLINE, function () {
     *  ... 
     *  }); 
     *  dereg(); 
     *   // The event listener function is no longer triggered.
     * @returns Function to use to de-register a listener.
     */
    addEventListener(event: String): Function;

    /**
     * Calls the specified phone number or the phone number associated with a specified user.
     * 
     * @identifier JSON object that contains either a phone number to call or the sys_id of a WebRTC user. Passing a user sys_id causes the call to be made through browser-to-browser communication.You can obtain the user sys_id from the Notify WebRTC Session table.
     * Note: If you provide both a phone number and user sys_id, the method only uses the phone number.
     * @example
     * notifyClient.call({
     *     phoneNumber: "+18001112223"
     * });
     * @example
     * notifyClient.call({
     *     userId: "6816f79cc0a8016401c5a33be04be441"
     * });
     * @example
     * $j("#pickupCallBtn").on("click", function() {
     * 	notifyClient.hangupCall();
     * });
     * @example
     * onConnect: function(status) {  
     *   // webRTC receives a call connection event (incoming or outgoing).
     *   if (status == SNC.Notify.Status.OPEN) {
     *     setStatus(getTimeStamp() + " -- Successfully established call");
     *     showHangupButton();
     *   }
     * },
     */
    call(identifier: Object);

    /**
     * Kills the current Notify client, rendering it unusable.
     * 
     */
    destroy();

    /**
     * Forwards an ongoing incoming or outgoing phone call to either a different phone number or a different WebRTC client.
     * 
     * @argument JSON object that contains the necessary information for forwarding the call to either a phone number or a WebRTC client (user sys_id). You can obtain this sys_id from the Notify WebRTC Session table.
     * @example
     * var arg = {
     *     type: "number",
     *     id: "+17012345678",
     *     dtmf: "1234"
     * }
     * client.forwardCall(arg);
     * @example
     * var arg = {
     *     type: "userId",
     *     id: "6816f79cc0a8016401c5a33be04be441"
     * }
     * client.forwardCall(arg);
     */
    forwardCall(argument: Object);

    /**
     * Returns a list of clients available to accept calls.This method excludes the current client from the list. The equivalent Notify-getAvailableClients() method does not filter any user.
     * 
     * @callback Function to use to parse the list of clients. This function accepts a single parameter, an array of JSON objects with the following format:[{ sys_id: "...", // user's sys_id name: "..." // user's name
     * }]
     */
    getAvailableClients(callback: Function);

    /**
     * Returns the parent call identifier for a specified call identifier, if one exists.Depending on the telephony provider, there may be a delay before the parent call identifier is returned; therefore you must provide a callback function.
     * 
     * @callId Unique identifier of the call for which to return the parent call identifier.
     * @callback Function that obtains the JSON object that contains either the parent call identifier or an error message if the identifier could not be obtained after several tries.
     * @example
     * notifyClient.getParentId( callId, function(jsonObj) {} );
     * @example
     * {
     * 	parentId: "xyz",
     * 	error: "msg"
     * }
     * @returns Parent call identifier.
     */
    getParentId(callId: String, callback: Function): String;

    /**
     * Returns the normalized status of the current call.
     * 
     * @example
     * clientStatus = notifyClient.getStatus();
     * @returns Current status of the call. The values returned by the telephony provider API are normalized by replacing the returned driver value with its equivalent value as defined in SNC.Notify.Status.
     */
    getStatus(): String;

    /**
     * End the current call.
     * 
     * @example
     * $j("#pickupCallBtn").on("click", function() {
     *     notifyClient.hangupCall();
     * });
     */
    hangupCall();

    /**
     * Initializes the client driver.
     * 
     * @example
     * $j(function() {
     *   notifyClient = new SNC.Notify.Client( notifyConfig );
     *   notifyClient.setCallerId( '+31858889170' );
     *   notifyClient.init();
     * });
     */
    init();

    /**
     * Mute or unmute the current client.
     * 
     * @muted Mutes or unmutes the current call. false: (or any non-true value) unmutes the current call. true: mutes the current call. 
     * @example
     * notifyClient.mute( "true" );
     */
    mute(muted: Boolean);

    /**
     * Answers and connects to an incoming call from a WebRTC client.Call this method when there is a notification of an incoming call.
     * 
     * @example
     * $j("#pickupCallBtn").on("click", function() {
     *     notifyClient.pickupCall();
     * });
     */
    pickupCall();

    /**
     * Send one or more DTMF-valid digits over the current call.
     * 
     * @digits One or more DTMF-valid digits.
     * @example
     * notifyClient.SendDtmf( "1246AF" ) {} );
     */
    sendDtmf(digits: String);

    /**
     * Sets the caller ID for the current client session.You can change or update the caller ID at any time however, the caller ID must belong to the same vendor.
     * 
     * @value Phone number to use to make and receive calls.
     * @autoSelectVendorCallback Optional.initializeVendorClientLazily must be set to "true" in the constructor to use this function, otherwise an error is thrown. Name of the callback function to call once the vendor is automatically set for the specified phone number. With this option, the vendor does not need to be specified in the constructor (notifyConfig.vendor). Auto vendor selection is an asynchronous operation. Therefore, this callback is required to indicate when it is safe to call notifyConfig.init(), as this method requires that the vendor be set before it is called. In addition, you must also check if notifyConfig.vendor has been set in the callback to ensure that a vendor has been specified.
     * @example
     * $j(function() {
     *   notifyClient = new SNC.Notify.Client( notifyConfig );
     *   notifyClient.setCallerId( '+31858889170' );
     *   notifyClient.init();
     * });
     */
    setCallerId(value: String, autoSelectVendorCallback: Function);

    /**
     * Sets the availability of an active WebRTC client agent.This type of availability is different than an agent being in a call. In this case, an active WebRTC client may be connected and not on a call, but may not want to receive calls.Calling this method updates the Available field value on the Notify Client Connected Session [notify_client_session] record associated with this client session. You can get a list of available clients using the getAvailableClients() method.
     * 
     * @available Flag that indicates whether an active WebRTC client wants to receive calls. false: client does not want to receive calls. true: client does want to receive calls. 
     */
    setClientAvailable(available: boolean);

}

/**
 * Provides the ability to load scripts asynchronously. The ScriptLoader API can be used in client-side scripts using ListV2 and ListV3 APIs. * * You access the ScriptLoader methods by using the global object ScriptLoader.
 * 
 * 
 */
declare class ScriptLoader {



    /**
     * Loads scripts asynchronously.
     * 
     * @scripts An array of scripts.
     * @callback The function called when the scripts have been loaded. The callback function has no arguments.
     */
    getScripts(scripts: Array<any>, callback: Function);

    /**
     * Gets scripts asynchronously.
     * 
     * @filePath A path, including the file name, that contains one or more scripts.
     * @callback The function to be called after the scripts have been loaded. The callback function has no arguments.
     */
    getScripts(filePath: String, callback: Function);

}

/**
 * You can show messages on a screen reader. The spAriaUtil service is an angular service included as part of the Service Portal angular application. The spAriaUtil service is available in the client script block of Service Portal widgets. 
 * 
 * 
 */
declare class spAriaUtil {



    /**
     * Announce a message to a screen reader.The sendLiveMessage() method injects text into an aria-live region on the page. The default setting for an aria-live region is assertive, which means that messages are announced immediately. This can annoy and confuse users if used too frequently.
     * 
     * @message The message to be shown.
     * @example
     * function(spAriaUtil) {
     *   // widget controller 
     * 
     *   spAriaUtil.sendLiveMessage('Hello world!');
     * }
     */
    sendLiveMessage(message: String);

}

/**
 * The spModal class provides an alternative way to show alerts, prompts, and confirmation dialogs. The SPModal class is available in Service Portal client scripts. You can use spModal.open() to display a widget in a modal dialog. The spModal class is a lightweight wrapper for Angular UI bootstrap's $uibModal.
 * 
 * 
 */
declare class spModal {



    /**
     * Displays an alert.
     * 
     * @message The message to display.
     * @example
     * // HTML template 
     * &lt;button ng-click="c.onAlert()" class="btn btn-default"&gt;
     *     Alert
     *   &lt;/button&gt;
     * 
     * // Client script
     * function(spModal) {
     *     var c = this;
     *   c.onAlert = function () {
     *         spModal.alert('How do you feel today?').then(function (answer) {
     *             c.simple = answer;
     *         });
     *     }
     *  }
     * @returns The promise contains a single argument that contains true or false.
     */
    alert(message: String): Boolean;

    /**
     * Displays a confirmation message.
     * 
     * @message The message to display.
     * @example
     * // HTML template 
     *  &lt;button ng-click="c.onConfirm()" class="btn btn-default"&gt; Confirm &lt;/button&gt; 
     * &lt;span&gt;{{c.confirmed}}&lt;/span&gt;   
     * 
     * // Client script
     * function(spModal) {
     *   var c = this;
     *   c.onConfirm = function() {
     *         c.confirmed = "asking";
     *         spModal.confirm("Can you confirm or deny this?").then(function(confirmed) {
     *             c.confirmed = confirmed; // true or false
     *         })
     *     }
     *  } 
     * @example
     * //HTML template 
     * &lt;button ng-click="c.onConfirmEx()" class="btn btn-default"&gt;
     *     Confirm - HTML message
     *   &lt;/button&gt;
     *   &lt;span&gt;{{c.confirmed}}&lt;/span&gt;
     * 
     * // Client script
     * function(spModal) {
     *   var c = this;
     *   // more control, passing options
     *     c.onConfirmEx = function() {
     *         c.confirmed = "asking";
     *         var warn = '&lt;i class="fa fa-warning" aria-hidden="true"&gt;&lt;/i&gt;';
     *         spModal.open({
     *             title: 'Delete this Thing?',
     *             message: warn + ' Are you &lt;b&gt;sure&lt;/b&gt; you want to do that?'
     *         }).then(function(confirmed) {
     *             c.confirmed = confirmed;
     *         })
     *     }
     * }
     * @returns The promise contains a single argument that contains true or false.
     */
    confirm(message: String): Boolean;

    /**
     * Opens a modal window using the specified options.
     * 
     * @options An object that may have these properties. title - a string that can be HTML that goes in the header. The default is empty. message - a string that can be HTML that goes in the header. The default is empty. buttons - an array that contains the buttons to show on the dialog. The default is Cancel and OK. input - a Boolean. When true shows an input field on the dialog. The default is false. value - a string containing the value of the input field. The default is empty. widget - a string that identifies the widget ID or sys_id to embed in the dialog. The default is empty. widgetInput - an object to send the embedded widget as input. The default is null. shared - a client-side object to share data with the embedded widget client script. size - a string indicating the size of the window. Can be 'sm' or 'lg'. The default is empty. 
     * @example
     * //HTML template
     * &lt;button ng-click="c.onOpen()" class="btn btn-default"&gt;
     *     Prompt with label
     *   &lt;/button&gt;
     *   &lt;div ng-show="c.name"&gt;
     *     You answered &lt;span&gt;{{c.name}}&lt;/span&gt;
     *   &lt;/div&gt;
     * 
     * //Client code
     * function(spModal) {
     *   var c = this;
     *   c.onOpen = function() {
     *         //ask the user for a string
     *         spModal.open({
     *             title: 'Give me a name',
     *             message: 'What would you like to name it?',
     *             input: true,
     *             value: c.name
     *         }).then(function(name) {
     *             c.name = name;
     *         })
     *     }
     * }
     * @example
     * //HTML template
     * &lt;button ng-click="c.onAgree()" class="btn btn-default"&gt;
     *     Agree
     *   &lt;/button&gt;
     *   &lt;div ng-show="c.agree"&gt;
     *     You answered {{c.agree}}
     *   &lt;/div&gt;
     * 
     * //Client script
     * function(spModal) {
     *   var c = this;
     *   c.onAgree = function() {
     *         // ask the user for a string
     *         // note embedded html in message
     *         var h = '&lt;h4&gt;Apple likes people to agree to lots of stuff&lt;/h4&gt;'
     *         // Line feeds added to the following lines for presentation formatting.
     *         var m = 'Your use of Apple software or hardware products is based 
     * on the software license and other terms and conditions in effect for the 
     * product at the time of purchase. Your agreement to these terms is required 
     * to install or use the product. '
     *         spModal.open({
     *             title: 'Do you agree?',
     *             message: h + m,
     *             buttons: [
     *                 {label:'✘ ${No}', cancel: true},
     *                 {label:'✔ ${Yes}', primary: true}
     *             ]
     *         }).then(function() {
     *             c.agree = 'yes';
     *         }, function() {
     *             c.agree = 'no';
     *         })
     *     }
     * }
     * @example
     * //HTML template
     * &lt;button ng-click="c.onWidget('widget-cool-clock')" class="btn btn-default"&gt;
     *     Cool Clock
     *   &lt;/button&gt;
     * 
     * //Client script
     * function(spModal) {
     *   var c = this;
     *   c.onWidget = function(widgetId, widgetInput) {
     *         spModal.open({
     *             title: 'Displaying widget ' + widgetId,
     *             widget: widgetId, 
     *             widgetInput: widgetInput || {}
     *         }).then(function(){
     *             console.log('widget dismissed');
     *         })      
     *     }
     * }
     */
    open(options: Object);

    /**
     * Displays a prompt for user input.
     * 
     * @message The message to display.
     * @defaultoptional A default value to use if the user does not provide a response.
     * @example
     * //HTML template
     *  &lt;button ng-click="c.onPrompt()" class="btn btn-default"&gt;
     *     Prompt
     *   &lt;/button&gt;
     *   &lt;div ng-show="c.name"&gt;
     *     You answered &lt;span&gt;{{c.name}}&lt;/span&gt;
     *   &lt;/div&gt;
     * 
     * // Client script
     * function(spModal) {
     *   var c = this;
     *   c.onPrompt = function() {
     *         spModal.prompt("Your name please", c.name).then(function(name) {
     *             c.name = name;
     *         })
     *     }
     * }
     * @returns The promise contains the user's response, or the default value if the user does not enter a response.
     */
    prompt(message: String, defaultoptional: String): String;

}

/**
 * Utility methods to perform common functions in a Service Portal widget client script. 
 * 
 * 
 */
declare class spUtil {



    /**
     * Displays a notification error message.
     * 
     * @message Error message to display.
     * @example
     * spUtil.addErrorMessage("There has been an error processing your request")
     */
    addErrorMessage(message: String);

    /**
     * Displays a notification info message.
     * 
     * @message Message to display.
     * @example
     * spUtil.addInfoMessage("Your order has been placed")
     */
    addInfoMessage(message: String);

    /**
     * Displays a trivial notification message.Trivial messages disappear after a short period of time.
     * 
     * @message Message to display.
     * @example
     * spUtil.addTrivialMessage("Thanks for your order")
     */
    addTrivialMessage(message: String);

    /**
     * Formats a string as an alternative to string concatenation.Use this method to build a string with variables.
     * 
     * @template String template with values for substitution. 
     * @data Object containing variables for substitution.
     * @example
     * spUtil.format('An error ocurred: {error} when loading {widget}', {error: '404', widget: 'sp-widget'})
     * @returns A formatted string.
     */
    format(template: String, data: Object): String;

    /**
     * Returns a widget model by ID or sys_id.Use this method to embed a widget model in a widget client script. The callback function returns the full widget model.
     * 
     * @widgetId Widget ID or sys_id of the widget to embed.
     * @data (Optional) Name/value pairs of parameters to pass to the widget model.
     * @example
     * spUtil.get("widget-cool-clock").then(function(response) {
     *   c.coolClock = response;
     * });
     * @example
     * spUtil.get('pps-list-modal', {title: c.data.editAllocations, 
     *   table: 'resource_allocation', 
     *   queryString: 'GROUPBYuser^resource_plan=' + c.data.sysId, 
     *   view: 'resource_portal_allocations' }).then(function(response) {
     *     var formModal = response;
     *     c.allocationListModal = response;
     *   });  	
     * 
     * @returns Model of the embedded widget.
     */
    get(widgetId: String, data: Object): Object;

    /**
     * Watches for updates to a table or filter and returns the value from the callback function.Allows a widget developer to respond to table updates in real-time. For instance, by using recordWatch(), the Simple List widget can listen for changes to its data table. If records are added, removed, or updated, the widget updates automatically.When passing the $scope argument into the recordWatch() function, be sure to inject $scope into the parameters of your client script function.Tables that are periodically subject to a high frequency of database events are blacklisted from recordWatch() to prevent event storms.
     * 
     * @$scope Scope of the data object updated by the callback function.
     * @table Watched table.
     * @filter Filter for fields to watch.
     * @callback Optional. Parameter to define the callback function.
     * @example
     * //A simple recordWatch function.
     * spUtil.recordWatch($scope, "live_profile", "sys_id=" + liveProfileId);
     * 
     * //In a widget client script
     * function(spUtil, $scope) {
     *   // widget controller 
     *   var c =this;
     * 
     *   // Registers a listener on the incident table with the filter active=true, 
     *   // meaning that whenever something changes on that table with that filter, 
     *   // the callback function is executed.    
     *   // The callback function takes a single parameter 'response', which contains 
     *   // the property 'data'. The 'data' property contains information about the changed record. 
     *   spUtil.recordWatch($scope, "incident", "active=true", function(response) {
     *         
     *     // Returns the data inserted or updated on the table 
     *     console.log(response.data);   
     *     
     *     });
     * }
     * 
     * @returns Return value of the callback function.
     */
    recordWatch($scope: Object, table: String, filter: String, callback: Function): Promise;

    /**
     * Calls the server and replaces the current options and data with the server response.Calling spUtil.refresh() is similar to calling server.refresh(). However, when you call spUtil.refresh(), you can define the $scope object.
     * 
     * @$scope The scope defined for the update.
     * @returns The updated options and data objects.
     */
    refresh($scope: Object): Object;

    /**
     * Updates the data object on the server within a given scope.This method is similar to server.update(), but includes a $scope parameter that defines the scope to pass over.
     * 
     * @$scope The scope defined for the update.
     * @returns The updated data object.
     */
    update($scope: Object): Object;

}

/**
 * Use a StopWatch object to measure the duration of operations. The StopWatch API can be used in client-side scripts using ListV2 and ListV3 APIs.
 * 
 * 
 */
declare class StopWatch {



    /**
     * Creates an instance of the StopWatch class using the specified date as the initial value.
     * 
     * @initialDate The initial date for the object.
     */
    constructor(initialDate: Date);

    /**
     * Creates an instance of the StopWatch class.Uses the current time as the start time.
     * 
     */
    constructor();

    /**
     * Returns the number of milliseconds since the timer started.
     * 
     * @returns The number of milliseconds since the timer started.
     */
    getTime(): Number;

    /**
     * Resets the timer to the current time.
     * 
     */
    restart();

    /**
     * The elapsed time as HH:MM:SS.SSS.
     * 
     * @returns The elapsed time formatted as HH:MM:SS.SSS.
     */
    toString(): String;

}


/**
 * A JSON String of Data will be returned. Recommend logging value to see content.
 */

declare interface JSONString {}
declare class g_form extends GlideForm{}
declare class g_list extends GlideListV3{}
declare class g_menu extends GlideMenu{}