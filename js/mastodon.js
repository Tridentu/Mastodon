
let $ = jQuery;
window.show_message = function(text, type){
    if(0 === text.length)
        return;
    if(type == "error")
        text = `<span class="mastodon-error">${text}</span>`;
    
    $(".mastodon-messages").append(text);
    $("mastodon-messages").fadeIn("slow");
    
};

window.show_prompt = function(text, type){
    $(".mastodon-input").val("");
    $(".mastodon-input").prop("type",type);
    $(".mastodon-input").prop("placeholder", text.charAt(0).toUpperCase() + text.slice(1, -1));
};

window.handle_login = function(){
  let input_elem = $(".mastodon-input").val();
    $(".mastodon-input").fadeOut("slow", () => {
         lightdm.respond(input_elem); 
    });  
};


window.autologin_timer_expired = function(){
    
};

let user_id = 0;
let session_id = 0;

function hideScreen(cb){
 $(".mastodon-root").addClass("mastodon-blurred");
        $(".mastodon-root").animate({
            opacity: 0,
        });
        $(".mastodon-root").fadeOut("slow", function(){
            if(cb != undefined){
             cb();   
            }
        });   
}

window.authentication_complete = function(){
    if(lightdm.is_authenticated){
      $(".mastodon-login-sidebar-menu").addClass("mastodon-start");
      $(".mastodon-login-box").addClass("mastodon-start");
      $(".mastodon-wallpaper").addClass("mastodon-start");
      hideScreen(function(){
         lightdm.start_session_sync(lightdm.sessions[session_id]); 
      });
    } else {
        show_message("Login failed.", "error");
        setTimeout(() => {
            authenticate(lightdm.authentication_user);
        }, 3000);
    }
};

window.authenticate = (user) => {
    if(lightdm.in_authentication && !(lightdm.authentication_user.length <= 0))
        lightdm.cancel_authentication();
    lightdm.authenticate(user);
    $(".mastodon-input").fadeIn("slow", () => {
        
    });  
};

window.login_lang = "English (US)";

function getTime(){
  var date = new Date();
  var h = updateTime(date.getHours());
  var m = updateTime(date.getMinutes());
  var midday = "AM";
  midday = (h >= 12) ? "PM" : "AM";
  h = (h == 0) ? 12 : ((h > 12) ? (h - 12): h);
  $(".mastodon-clock").text(`${h}:${m} ${midday}`);
  var t = setTimeout(function(){ getTime() }, 1000);
};

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

$(function(){
   let user_names = lightdm.users;
   login_lang = lightdm.language;
    lightdm.layouts.forEach((item2,index) => {
        $(".mastodon-layout-select").append(`<option value="${item2.name}">${item2.description}</option>`);
    });
    lightdm.sessions.forEach((item2,index) => {
        $(".mastodon-session-select").append(`<option data-session-id="${item2.key}" value="${item2.key}">${item2.name}</option>`);
    });
   user_names.forEach((item2,index) => {
        $(".mastodon-user-select").append(`<option value="${item2.username}">${item2.display_name}</option>`);
    });
    setTimeout(function(){
        $(".mastodon-root").addClass("mastodon-blurred");
        $(".mastodon-root").animate({
            opacity: 1,
        });
        $(".mastodon-lock").fadeIn("slow", function(){
        });
        $(".mastodon-root").fadeIn("slow", function(){
        });
    }, 2500);
    $(".mastodon-entry").click(function(){
        $(".mastodon-lock").fadeOut("slow", function(){
                    $(".mastodon-root").removeClass("mastodon-blurred");
        });
    });
   $("#reboot").click(function(){
       if(lightdm.can_restart)
            hideScreen(function(){ lightdm.restart(); });

        
       
   });
   $("#sleep").click(function(){
       if(lightdm.can_suspend) 
            hideScreen(function(){ lightdm.suspend(); });
   });
   $("#shutdown").click(function(){
        if(lightdm.can_shutdown)
            hideScreen(function(){ lightdm.shutdown(); });
   });
   $("#hibernate").click(function(){
        if(lightdm.can_hibernate) 
            hideScreen(function(){ lightdm.hibernate(); });
   });   
   $(".mastodon-language-ind").html(window.login_lang);
   $(".mastodon-messages").html("");
   $(".mastodon-session-select").select2({
            placeholder: $(".mastodon-session-select").data("mastodonPlaceholder")
   });
   $(".mastodon-layout-select").select2({
            placeholder: $(".mastodon-layout-select").data("mastodonPlaceholder")
   });
   $(".mastodon-user-select").select2({
            placeholder: $(".mastodon-user-select").data("mastodonPlaceholder")
   });
    $($(".mastodon-user-select > option")[user_id]).prop("selected", true);
    $(".mastodon-user-select").on("select2:select", function(e){
            let id = e.params.data.id;
            user_id = id-1;
            authenticate(user_names[user_id]);
    });
    $($(".mastodon-session-select > option")[user_id]).prop("selected", true);
    $(".mastodon-session-select").on("select2:select", function(e){
            let id = e.params.data.id;
            session_id = id - 1;
    });
    getTime();
    authenticate(lightdm.users[user_id].name);
});
