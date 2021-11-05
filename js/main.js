

var siteName=document.getElementById("siteName")
var urlName=document.getElementById("urlName")

var btnCases=document.getElementById("btnCases")
var sites=[]; //3shan lw 3yza a3ml delete l 7aga mn list aw a3ml search msaln 3n mobile msh haro7 l object object
var inputs=document.getElementsByClassName("form-control") //classname htrg3ly list feha kol el wa5ed form control
var searchInput=document.getElementById("search")
var nameAlert=document.getElementById("nameAlert")
var urlAlert=document.getElementById("urlAlert")

siteName.onkeyup=function(){
       var nameRejex=/^[A-Z][a-z]{1,9}$/
       if(!nameRejex.test(siteName.value)){
              btnCases.disabled="true";
              siteName.classList.add("is-invalid");
              siteName.classList.remove("is-valid");
              nameAlert.classList.remove("d-none");

       }
       else{
        btnCases.removeAttribute("disabled");
         siteName.classList.add("is-valid");
         siteName.classList.remove("is-invalid")    
         nameAlert.classList.add("d-none");

       }
  
  }
  urlName.onkeyup=function(){
       var nameRejex=/^https:[/.a-z]{3,15}.com$/
       if(!nameRejex.test(urlName.value)){
              btnCases.disabled="true";
              urlName.classList.add("is-invalid");
              urlName.classList.remove("is-valid");
              urlAlert.classList.remove("d-none");

       }
       else{
         btnCases.removeAttribute("disabled");
         urlName.classList.add("is-valid");
         urlName.classList.remove("is-invalid")    
         urlAlert.classList.add("d-none");

       }
  
  }

btnCases.onclick=function(){
       if(btnCases.innerHTML=="submit")
       {
              addSite();
              displayData();
              formClear();


       }
       else{
              updateSite();

              displayData();
              formClear();


       }



}
if(JSON.parse(localStorage.getItem("siteList"))!=null)
{
       sites=JSON.parse(localStorage.getItem("siteList"));
       displayData();

}

function addSite(){
     
       var site={
              name:siteName.value,
              url:urlName.value,
          
       }
       if ((!siteName.value== "") && (!urlName.value == "") ) {
       
              sites.push(site); //array of object (json)
              localStorage.setItem("siteList",JSON.stringify(sites));
              formClear();
       
              }
              else {
                     btnCases.disabled = "true"
                     alert("fill all inputs..");
                  
       
              }

     
}

function displayData(){
       var trs='';
       for(var i=0; i<sites.length;i++)
       {
           trs+=`<tr><td class="name fs-2 pe-5 me-5">${sites[i].name}</td>
          
           <td>   <a class=" ancor bg-primary rounded p-2 ms-5 text-white" href="${sites[i].url}">visit </a>    </td>
           <td><buttom class="btn btn-danger ms-5" onclick="deleteSite(${i})"> delete</buttom></td>
           <td><buttom class="btn btn-warning ms-5 text-white" onclick="editSite(${i})"> update</buttom></td>


           </tr>`  ;
       }
       document.getElementById("tableBody").innerHTML=trs;
}

function formClear(){
       for(var i=0;i<inputs.length;i++){
              inputs[i].value="";
       }
       btnCases.disabled="true";
       siteName.classList.remove("is-invalid");
       urlName.classList.remove("is-invalid");



}
function deleteSite(index){
       sites.splice(index,1);
       displayData(); 
       localStorage.setItem("siteList",JSON.stringify(sites));


}
searchInput.onkeyup=function(){    
       var trs='';
       var val=searchInput.value;
       

       for(var i=0; i<sites.length;i++)
       {
              if(sites[i].name.toLowerCase().includes(val.toLowerCase()))
       {
           trs+=`<tr> <td class="fs-2 pe-5 me-5">${sites[i].name}</td>
          
           <td>   <a class=" ancor bg-primary rounded p-2 ms-5 text-white " target="blank" href="${sites[i].url}">visit </a>    </td>
           <td><buttom class="btn btn-danger" onclick="deleteSite(${i})"> delete</buttom></td>


           </tr>`  ;
       }
}
       document.getElementById("tableBody").innerHTML=trs;
}
var y;
function editSite(index){
y=index;
       siteName.value=sites[index].name;
       urlName.value=sites[index].url; 
       
       btnCases.innerHTML="update";
    }

    
    function updateSite(){
       sites[y]={
              name:siteName.value,
              url:urlName.value,
          
       }
  
       localStorage.setItem("siteList",JSON.stringify(sites));

    }