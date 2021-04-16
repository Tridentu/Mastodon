
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

window.login_lang = "English (US)";

$(function(){
   // let user_names = lightdm.users;
   /*$(".mastodon-layout-select").each((item) => {
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
   });*/
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
});
