
$(function(){
   // let user_names = lightdm.users;
   $(".mastodon-select > select").select2();
   
   $("#restart").click(lightdm.shutdown());
   $("#shutdown").click(lightdm.shutdown());
   $("#sleep").click(lightdm.suspend());
   $("#hibernate").click(lightdm.hibernate());
   

});
