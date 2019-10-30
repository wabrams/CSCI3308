var df_vis = document.getElementsByName("df_vis");
var df_vis_public =  document.getElementById("df_vis_pub");
var df_vis_private =  document.getElementById("df_vis_pri");

for(var i = 0; i < df_vis.length; i++)
{
  df_vis[i].onclick = function()
  {
    var val = this.value;
    if(val == 'df_vis_sel_pub')
    {
      df_vis_public.style.display = 'block';   // show
      df_vis_private.style.display = 'none';// hide
    }
    else if(val == 'df_vis_sel_pri')
    {
       df_vis_public.style.display = 'none';
       df_vis_private.style.display = 'block';
    }
  }
}
