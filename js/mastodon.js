
window.show_message = function(text, type){
    if(0 === text.length)
        return;
    if(type == "error")
        text = `<span class="mastodon-error">${text}</span>`;
    
    $(".mastodon-messages").append(text);
    $("mastodon-messages").fadeIn(700);
    
};

window.show_prompt = function(text, type){
    let entry = $(".mastodon-login");
    entry.val("");
    entry.attr("type",type);
    entry.attr("placeholder", text.charAt(0).toUpperCase() + text.slice(1, -1);
};

$(function(){
   // let user_names = lightdm.users;
   $(".mastodon-layout-select").forEach((item) => {
      lightdm.layouts.forEach((item2,index) => {
        var opt = new Option(item2.description, item2.name);
        $(opt).html(item2.description);
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
   $(".mastodon-messages").html("");
   $(".mastodon-select > select").select2();

});
