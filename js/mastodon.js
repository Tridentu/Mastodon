
window.show_message = function(text, type){
    if(0 === text.length)
        return;
    if(type == "error")
        text = `<span class="mastodon-error">${text}</span>`;
    
    $(".mastodon-messages").append(text);
    $("mastodon-messages").fadeIn(700);
    
};

window.show_prompt = function(text, type){
    let entry = $(".mastodon-input");
    entry.val("");
    entry.attr("type",type);
    entry.attr("placeholder", text.charAt(0).toUpperCase() + text.slice(1, -1));
};

window.handle_login = function(){
  let input_elem = $(".mastodon-input");
    input_elem.fadeOut(700, () => {
         lightdm.respond(input_elem.val()); 
    });  
};


window.autologin_timer_expired = function(){
    
};

let user_id = lightdm.users.indexOf(lightdm.select_user);
let session_id = lightdm.sessions.indexOf(lightdm.default_session);

window.authentication_complete = function(){
    if(lightdm.is_authenticated){
      $(".mastodon-login-sidebar-menu").addClass("mastodon-start");
      $(".mastodon-login-box").addClass("mastodon-start");
      $(".mastodon-wallpaper").on("transitionend", function(){
          lightdm.start_session_sync(lightdm.sessions[session_id]);
      });
      $(".mastodon-wallpaper").addClass("mastodon-start");
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
};

window.login_lang = "English (US)";

$(function(){
   let user_names = lightdm.users;
   login_lang = lightdm.language;
   $(".mastodon-layout-select").each((item) => {
      lightdm.layouts.forEach((item2,index) => {
        var opt = new Option(item2.description, item2.name);
        $(opt).html(item2.description);
        item.append(opt);
      });
   });
   $(".mastodon-session-select").each((item) => {
      lightdm.sessions.forEach((item2,index) => {
        var opt = new Option(item2.name, item2.name);
        $(opt).html(item2.name);
        $(opt).data("sessionId",item2.key); 
        item.append(opt);
      });
   });
   $(".mastodon-user-select").each((item) => {
      user_names.forEach((item2,index) => {
        var opt = new Option(item2.display_name, item2.username);
        $(opt).html(item2.display_name);
        item.append(opt);
      });

    });
    
   $("#restart").click(function(){
       if(lightdm.can_restart) 
           lightdm.shutdown();
   });
   $("#sleep").click(function(){
       if(lightdm.can_suspend) 
            lightdm.suspend();
   });
   $("#shutdown").click(function(){
        if(lightdm.can_shutdown) 
            lightdm.shutdown();
   });
   $("#hibernate").click(function(){
        if(lightdm.can_hibernate) 
            lightdm.hibernate();
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
    $($(".mastodon-user-select > option")[user_id]).prop("selected", true");
    $(".mastodon-user-select").on("select2:select", function(e){
            let id = e.params.data.id;
            user_id = id-1;
            authenticate(user_names[user_id]);
    });
    $($(".mastodon-session-select > option")[user_id]).prop("selected", true");
    $(".mastodon-session-select").on("select2:select", function(e){
            let id = e.params.data.id;
            session_id = id - 1;
    });
    authenticate(user_names[user_id]);
});
