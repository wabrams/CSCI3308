console.log("script loaded!");

function df_vis_sel(sel_vis)
{
  // console.log("clicked!");
  var df_vis_public =  document.getElementById("df_vis_pub");
  var df_vis_private =  document.getElementById("df_vis_pri");

  if(sel_vis == 0) //public
  {
    // console.log("public!");
    df_vis_public.style.display = 'block';   // show
    df_vis_private.style.display = 'none';// hide
  }
  else if(sel_vis == 1)
  {
     // console.log("private");
     df_vis_public.style.display = 'none';
     df_vis_private.style.display = 'block';
  }
}
