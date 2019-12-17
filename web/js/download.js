var rows = [{"id":1,"name":"PS11a.png"},{"id":2,"name":"PS11d.png"},{"id":3,"name":"PS11c1.png"},{"id":4,"name":"Downloadpic.png"},{"id":5,"name":"9b1c.png"},{"id":6,"name":"9b1b.png"},{"id":7,"name":"9b1a.png"},{"id":8,"name":"10.2b.png"},{"id":9,"name":"9bc.png"},{"id":10,"name":"9.1a.png"},{"id":11,"name":"5a.1a.png"},{"id":12,"name":"5a.1c.png"},{"id":13,"name":"8PeakArr.png"},{"id":14,"name":"5.3.png"},{"id":15,"name":"9.4a.png"},{"id":16,"name":"10.2b.png"},{"id":17,"name":"9b1d.png"},{"id":18,"name":"9b1d.png"},{"id":19,"name":"PS11d.png"},{"id":20,"name":"PS11d.png"},{"id":21,"name":"10.2c.png"},{"id":22,"name":"10.2c.png"},{"id":23,"name":"O(1)DP.png"},{"id":24,"name":"O(1)DP.png"},{"id":25,"name":"O(1)DP.png"},{"id":26,"name":"O(1)DP.png"},{"id":27,"name":""},{"id":28,"name":""},{"id":29,"name":""},{"id":30,"name":""},{"id":31,"name":"9b1c.png"},{"id":32,"name":"9b1c.png"},{"id":33,"name":"10.2c.png"},{"id":34,"name":"10.2c.png"},{"id":35,"name":"9b1c.png"},{"id":36,"name":"9b1c.png"},{"id":37,"name":"9b1a.png"},{"id":38,"name":"9b1a.png"},{"id":39,"name":"9b1b.png"},{"id":40,"name":"9b1a.png"},{"id":41,"name":"9b1c.png"},{"id":42,"name":"9b1b.png"},{"id":43,"name":"PS11d.png"},{"id":44,"name":"PS11a.png"},{"id":45,"name":"9b1c.png"},{"id":46,"name":"PS11a.png"},{"id":47,"name":"PS11c1.png"},{"id":48,"name":"PS11a.png"},{"id":49,"name":"HerokuActivity.png"},{"id":50,"name":"PS11d.png"},{"id":51,"name":"PS11a.png"},{"id":52,"name":"10a.2b.png"},{"id":53,"name":"10.2b.png"},{"id":54,"name":"10.1d.png"},{"id":55,"name":"HerokuActivity.png"}];
console.log("script loaded!");

console.log(rows);

$(document).ready(function() {
  console.log('populating table');
  var table = document.getElementById("dtable-body");

  if (rows.length<1) {
    var message1 = document.createElement("tr");
    var message2 = document.createElement("td");
    message2.innerHTML= "No files found! Please upload some.";
    message1.appendChild(message2);
    table.appendChild(message1);
  }
  else{
    for (var i = 0; i<rows.length; i++) {
      var nuRow = document.createElement("tr");
      var nuID = document.createElement("td");
      var nuName = document.createElement("td");
      var nuLink = document.createElement("td");
      var nuA = document.createElement("a");

      nuID.innerHTML = rows[i].fileID;
      nuName.innerHTML = rows[i].name;
      nuA.href = "download?file="+rows[i].name;
      nuA.innerHTML = "Link";

      nuLink.appendChild(nuA);

      nuRow.appendChild(nuID);
      nuRow.appendChild(nuName);
      nuRow.appendChild(nuLink);

      table.appendChild(nuRow);

  }}
});
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
