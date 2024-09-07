async function getstudents() {
    const res=await fetch("http://localhost:3000/getstudents");
    const data=await res.json();
    str=``;
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
                    <th>Subjects</th>
                    <td>:</td>
                    <td>
                        <table class="t2">
                            <tr>
                                <th><label for="maths">Mathematics</label></th>
                                <td>:</td>
                                <td align="center"><input disabled="true" value=${dt.physics} type="text" name="maths" id="maths-${dt._id}"></td>
                            </tr>
                            <tr>
                                <th><label for="physics">Physics</label></th>
                                <td>:</td>
                                <td align="center"><input disabled="true" value=${dt.maths} type="text" name="physics" id="physics-${dt._id}"></td>
                            </tr>
                            <tr>
                                <th><label for="chemistry">Chemistry</label></th>
                                <td>:</td>
                                <td align="center"><input disabled="true" type="text" value=${dt.chemistry} name="chemistry" id="chemistry-${dt._id}"></td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center">   
                        <button id="edit">EDIT</button>
                        <button id="save">SAVE</button>
                        <button id="delete">DELETE</button>
                    </td>
                </tr>
            </table>
        </div>   
        `
    });
 
    document.getElementById("main").innerHTML=str
}

getstudents();