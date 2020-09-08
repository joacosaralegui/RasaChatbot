
//initialization
$(document).ready(function() {

    //Bot pop-up intro
    $("div").removeClass("tap-target-origin")

    //drop down menu for close, restart conversation & clear the chats.
    $('.dropdown-trigger').dropdown();

    // disable user input
    $("#userInput").prop('disabled', true);
    
    //global variables
    bot1 = {
        user_id: "user_1",
        port: "5005",
        response: function(text){
            return '<img class="userAvatar" src=' + "./static/img/userAvatar.jpg" + '><p class="userMsg">' + text + ' </p><div class="clearfix"></div>';
        }
    };

    bot2 = {
        user_id: "user_2",
        port: "5006",
        response: function(text){
            return '<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">' + text + '</p><div class="clearfix"></div>';
        }
    };

    // action forced upon first bot to start conversation
    action_name = "utter_greet";

})

// Bot pop-up intro
document.addEventListener('DOMContentLoaded', function() {
    // Init highlight animation
    var elemsTap = document.querySelector('.tap-target');
    var instancesTap = M.TapTarget.init(elemsTap, {});
    instancesTap.open();
    setTimeout(function() { 
        // Once its done, open the chat and start bot first trigger
        instancesTap.close(); 
        $(".profile_div").toggle();
        $(".widget").toggle();
        // This starts bots interaction
        startConversation();
    }, 100);

});

// ========================== restart conversation ========================
function restartConversation() {
    $(".chats").html("");
    $(".usrInput").val("");
    startConversation();
}

// ========================== let the bot start the conversation ========================
function startConversation() {
    // Start a conversation with Bot2 in Bot1
    var url = `http://localhost:${bot1.port}/conversations/${bot2.user_id}/execute`;

    // send an event to the bot, so that bot can start the conversation by greeting the user
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ "name": action_name, "policy": "MappingPolicy", "confidence": "0.98" }),
        success: function(botResponse, status) {
            if (botResponse.hasOwnProperty("messages")){
                // Whatever we received, place it in bot 1 place
                var messages = botResponse.messages;
                setResponse(messages, bot1);
                // Send message to Bot2
                var lastMessage = messages[messages.length - 1].text;
                setTimeout(function(){
                        send(lastMessage, bot2, bot1)
                    },500);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            // if there is no response from rasa server
            setResponse("");
            console.log("Error from bot end: ", textStatus);
        }
    });
}

//=========== Scroll to the bottom of the chats after new message has been added to chat ======
function scrollToBottomOfResults() {

    var terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

//============== send the user message to rasa server =============================================
function send(message, server, user) {
    var port = server.port; 
    var user_id = server.user_id;

    $.ajax({
        url: "http://localhost:"+port+"/webhooks/rest/webhook",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ message: message, sender: user_id }),
        success: function(Response, status) {
            var message = Response[Response.length - 1].text;
            // if user wants to restart the chat and clear the existing chat contents
            if (message.toLowerCase() == '/restart' || message.toLowerCase() == "/stop") 
                return;
            
            setResponse(Response, server);
            setTimeout(function(){send(message, user, server)},500);

        },
        error: function(xhr, textStatus, errorThrown) {
            // if there is no response from rasa server
            setResponse("");
            console.log("Error from bot end: ", textStatus);
        }
    });
}

//=================== set bot response in the chats ===========================================
function setResponse(response,bot) {

    //display bot response after 500 milliseconds
    //setTimeout(function() {
        //if(isBot2) hideBotTyping();
        if (response.length < 1) {
            //if there is no response from Rasa, send  fallback message to the user
            var fallbackMsg = "Mil disculpas, en este momento estoy muy ocuapdo. Charlamos mas tarde!!!";
            var Response = bot.response(fallbackMsg);
            
            $(Response).appendTo(".chats").hide().fadeIn(100);
            scrollToBottomOfResults();
        } else {
            //if we get response from Rasa
            for (i = 0; i < response.length; i++) {
                //check if the response contains "text"
                if (response[i].hasOwnProperty("text")) {
                    var message = response[i].text;
                    if(message == "/stop")
                        return;

                    var Response = bot.response(message)
                    $(Response).appendTo(".chats").hide().fadeIn(100);
                }
            }
            scrollToBottomOfResults();
        }
    //}, 0);
}

//====================================== Toggle chatbot =======================================
$("#profile_div").click(function() {
    $(".profile_div").toggle();
    $(".widget").toggle();
});

//====================================== functions for drop-down menu of the bot  =========================================

//restart function to restart the conversation.
$("#restart").click(function() {
    restartConversation()
});

//clear function to clear the chat contents of the widget.
$("#clear").click(function() {
    $(".chats").fadeOut("normal", function() {
        $(".chats").html("");
        $(".chats").fadeIn();
    });
});

//close function to close the widget.
$("#close").click(function() {
    $(".profile_div").toggle();
    $(".widget").toggle();
    scrollToBottomOfResults();
});


//======================================bot typing animation ======================================
function showBotTyping() {

    var botTyping = '<img class="botAvatar" id="botAvatar" src="./static/img/sara_avatar.png"/><div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>'
    $(botTyping).appendTo(".chats");
    $('.botTyping').show();
    scrollToBottomOfResults();
}

function hideBotTyping() {
    $('#botAvatar').remove();
    $('.botTyping').remove();
}
