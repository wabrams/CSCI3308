var rows = [{"fileID":1,"owner":1,"uploaded":"2019-12-17T02:36:29.000Z","name":"testA.txt","fileSize":0},{"fileID":2,"owner":1,"uploaded":"2019-12-17T02:36:29.000Z","name":"testB.txt","fileSize":0},{"fileID":3,"owner":1,"uploaded":"2019-12-17T02:36:29.000Z","name":"testC.txt","fileSize":0},{"fileID":4,"owner":1,"uploaded":"2019-12-17T02:36:29.000Z","name":"testD.txt","fileSize":0}];console.log("script loaded!");

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

      nuID.innerHTML = rows[i].id;
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
