async function getstudents() {
    const res=await fetch("http://localhost:3000/getstudents");
    const data=await res.json();
    str=``;
    avg=0
    data.map((dt)=>{
        str+=`
        <div class="content">
            <table class="table1">
                <tr>
                    <th><label for="name">Name</label></th>
                    <td>:</td>
                    <td align="center"><input type="text" value=${dt.name} disabled="true" name="name" id="name-${dt._id}"></td>
                </tr>
                <tr>
                    <th><label for="rno">Roll No.</label></th>
                    <td>:</td>
                    <td align="center"><input type="text" value=${dt.rollno} disabled="true" name="rno" id="rno-${dt._id}"></td>
                </tr>
                <tr>
                    <th><label for="class">Class</label></th>
                    <td>:</td>
                    <td align="center"><input type="text" value=${dt.class} disabled="true" name="class" id="class-${dt._id}"></td>
                </tr>
                <tr>
                    <td colspan="3" align="center">
                        <table class="t2">
                            <tr>
                                <th><label for="maths-${dt._id}">Mathematics</label></th>
                                <th><label for="physics-${dt._id}">Physics</label></th>
                                <th><label for="chemistry-${dt._id}">Chemistry</label></th>
                            </tr>
                            <tr>
                                <td align="center"><input disabled="true" value=${dt.physics} type="text" name="maths" id="maths-${dt._id}"></td>
                                <td align="center"><input disabled="true" value=${dt.maths} type="text" name="physics" id="physics-${dt._id}"></td>
                                <td align="center"><input disabled="true" type="text" value=${dt.chemistry} name="chemistry" id="chemistry-${dt._id}"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center">   
                        <button id="edit" onclick="handleEdit('${dt._id}')" >EDIT</button>
                        <button id="save" onclick="handleSave('${dt._id}')">SAVE</button>
                        <button id="delete" onclick="handleDelete('${dt._id}')">DELETE</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center" >
                         <div class="eligibility" id="eligibility-${dt._id}">
                            
                        </div>
                    </td>
                </tr>
            </table>

        </div>   
        `
    });
 
    document.getElementById("main").innerHTML=str
    data.map((dt)=>{
        avg=(parseInt(dt.physics)+parseInt(dt.maths)+parseInt(dt.chemistry))/3;
        if(avg>=40){
            document.getElementById(`eligibility-${dt._id}`).innerHTML="<h3>Eligible for entrance</h3>";
            document.getElementById(`eligibility-${dt._id}`).style.backgroundColor="#198754";
            document.getElementById(`eligibility-${dt._id}`).style.color="white";
        }
        else{
            document.getElementById(`eligibility-${dt._id}`).innerHTML="<h3>Not eligible for entrance</h3>";
            document.getElementById(`eligibility-${dt._id}`).style.backgroundColor="#dc3545";
            document.getElementById(`eligibility-${dt._id}`).style.color="white";
        }
    });
}

getstudents();

async function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false;
    document.getElementById(`rno-${id}`).disabled=false;
    document.getElementById(`class-${id}`).disabled=false;
    document.getElementById(`maths-${id}`).disabled=false;
    document.getElementById(`physics-${id}`).disabled=false;
    document.getElementById(`chemistry-${id}`).disabled=false;
}

async function handleSave(id) {
    let name= document.getElementById(`name-${id}`).value;
    let rno=document.getElementById(`rno-${id}`).value;
    let clss=document.getElementById(`class-${id}`).value;
    let maths=document.getElementById(`maths-${id}`).value;
    let physics=document.getElementById(`physics-${id}`).value;
    let chemistry=document.getElementById(`chemistry-${id}`).value;
    let data={id,name,rno,clss,maths,physics,chemistry};
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3000/update",{
        "method":"PUT",
        "Content-Type":"text/json",
        "body":jsonData
    });
    const result=await res.text();
    if(result=="success"){
        alert("Updated Successfully!!!");
        getstudents();
    }
    else{
        alert("Updation Failed")
    }
}

async function handleDelete(id) {
    const res = await fetch("http://localhost:3000/delete",{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        "body":id
    })
    const data=await res.text();
    if(data=="success"){
        alert("Deleted Successfully!!!");
        getstudents();
    }
    else{
        alert("Deletion Failed")
    }
} 